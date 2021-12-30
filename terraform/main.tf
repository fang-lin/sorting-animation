terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.70.0"
    }
  }

  backend "s3" {
    bucket         = "terraform-state.fanglin.me"
    key            = "sorting-animation/terraform.tfstate"
    region         = "ap-northeast-1"
  }

  required_version = "1.1.2"
}

provider "aws" {
  region  = var.aws_region
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = "${var.sub_domain}.${var.primary-domain}"
  acl    = "public-read"
  force_destroy               = true

  website {
    index_document = "index.html"
    error_document = "error/index.html"
  }
}

resource "aws_s3_bucket_object" "website_bucket_objects" {
  for_each     = fileset(path.module, "../dist/**/*.*")
  bucket       = aws_s3_bucket.website_bucket.bucket
  key          = trimprefix(each.value, "../dist/")
  etag         = filemd5(each.value)
  content_type = lookup(local.mime_types, element(reverse(split(".", each.value)), 0))
  source       = each.value
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
      },
    ]
  })
}

locals {
  mime_types = {
    "css"  = "text/css"
    "html" = "text/html"
    "ico"  = "image/vnd.microsoft.icon"
    "js"   = "application/javascript"
    "json" = "application/json"
    "map"  = "application/json"
    "png"  = "image/png"
    "svg"  = "image/svg+xml"
    "txt"  = "text/plain"
  }
}

resource "aws_cloudfront_distribution" "website_bucket_distribution" {
  origin {
    domain_name = aws_s3_bucket.website_bucket.bucket_regional_domain_name
    origin_id   = "${var.sub_domain}.${var.primary-domain}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["${var.sub_domain}.${var.primary-domain}"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.sub_domain}.${var.primary-domain}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["DE", "US", "CN"]
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

data "aws_route53_zone" "primary_zone" {
  name = var.primary-domain
}

resource "aws_route53_record" "website_cname" {
  zone_id = data.aws_route53_zone.primary_zone.zone_id
  name    = "${var.sub_domain}.${var.primary-domain}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_cloudfront_distribution.website_bucket_distribution.domain_name]
}