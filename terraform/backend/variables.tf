variable "aws_region" {
  type        = string
  description = "The AWS region to put the bucket into"
  default     = "ap-northeast-1"
}

variable "bucket_name" {
  type        = string
  description = "The primary domain name to use for the static site"
  default     = "terraform-state.fanglin.me"
}