#!/bin/bash


export PACKAGE_ROOT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd $PACKAGE_ROOT_PATH


ENV_NAME="$1"

./bin/start_$ENV_NAME.sh
