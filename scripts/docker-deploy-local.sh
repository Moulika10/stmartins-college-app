# !/bin/bash

set -ex

docker-compose -f docker-compose.yaml -f docker-compose.local.yaml up -d