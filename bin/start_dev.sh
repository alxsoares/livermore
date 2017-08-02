#!/bin/bash


export PACKAGE_ROOT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd $PACKAGE_ROOT_PATH


# TODO execute all of there in different machines
node lib/collector.js
