variable "aws_region" { default = "us-east-1" }
variable "instance_type" { default = "t3.micro" }
variable "ssh_key_name" { description = "Existing AWS keypair name to use for EC2" }
variable "repo_url" { description = "Git repo URL where this project lives" }
