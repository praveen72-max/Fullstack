#!/bin/bash
set -e
apt-get update -y
apt-get install -y docker.io docker-compose git
systemctl start docker
systemctl enable docker

cd /root
rm -rf app || true
git clone "${repo}" app || exit 0
cd app

if [ -f docker-compose.yml ]; then
  docker-compose up -d --build
fi
