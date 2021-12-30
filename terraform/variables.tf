variable "aws_region" {
  type        = string
  description = "The AWS region to put the bucket into"
  default     = "ap-northeast-1"
}

variable "primary-domain" {
  type        = string
  description = "The primary domain name to use for the static site"
  default     = "fanglin.me"
}

variable "sub_domain" {
  type        = string
  description = "The sub domain name to use for the static site"
  default     = "sorting-animation-dev"
}

variable "acm_certificate_arn" {
  type        = string
  description = "The certificate to use for the static site"
  default     = "arn:aws:acm:us-east-1:234939717553:certificate/2b1b9a35-af32-4169-a525-27df6323505c"
}