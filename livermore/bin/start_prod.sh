#!/bin/bash


export PACKAGE_ROOT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd $PACKAGE_ROOT_PATH

export ENV="prod"


node lib/collector.js
