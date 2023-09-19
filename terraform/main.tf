terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.17.0"
    }
  }

  backend "s3" {
    bucket = "terraform-state.fanglin.me"
    key    = "algorythm/terraform.tfstate"
    region = "ap-northeast-1"
  }

  required_version = "1.5.7"
}

provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "website_bucket" {
  bucket        = "${var.sub_domain}.${var.primary-domain}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "website_bucket_public_access" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "error/index.html"
  }
}

resource "aws_s3_object" "website_bucket_objects" {
  for_each     = fileset(path.module, "../build/**/*.*")
  bucket       = aws_s3_bucket.website_bucket.bucket
  key          = trimprefix(each.value, "../build/")
  etag         = filemd5(each.value)
  content_type = lookup(local.mime_types, element(reverse(split(".", each.value)), 0))
  source       = each.value
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.website_bucket.id
  depends_on = [
    aws_s3_bucket_public_access_block.website_bucket_public_access
  ]
  policy = data.aws_iam_policy_document.allow_access_from_public_read.json
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

    viewer_protocol_policy = "redirect-to-https"
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

data "aws_iam_policy_document" "allow_access_from_public_read" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "${aws_s3_bucket.website_bucket.arn}/*"
    ]
  }
}

resource "aws_route53_record" "website_cname" {
  zone_id = data.aws_route53_zone.primary_zone.zone_id
  name    = aws_s3_bucket.website_bucket.bucket
  type    = "CNAME"
  ttl     = "300"
  records = [aws_cloudfront_distribution.website_bucket_distribution.domain_name]
}
