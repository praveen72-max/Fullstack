provider "aws" {
  region = var.aws_region
}

resource "aws_security_group" "allow_http_ssh" {
  name = "allow_http_ssh"
  ingress = [
    { from_port=22, to_port=22, protocol="tcp", cidr_blocks=["0.0.0.0/0"] },
    { from_port=80, to_port=80, protocol="tcp", cidr_blocks=["0.0.0.0/0"] }
  ]
  egress = [{ from_port=0, to_port=0, protocol="-1", cidr_blocks=["0.0.0.0/0"] }]
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners = ["099720109477"]
  filter {
    name = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  key_name      = var.ssh_key_name
  vpc_security_group_ids = [aws_security_group.allow_http_ssh.id]

  user_data = templatefile("user_data.sh.tpl", { repo = "https://github.com/praveen72-max/Fullstack.git" })
  tags = { Name = "fullstack-demo" }
}
