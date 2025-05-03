variable "aws_region" {
  description = "AWS region to launch resources in"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID for Ubuntu EC2"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "The name of the key pair already created in AWS"
  type        = string
}
