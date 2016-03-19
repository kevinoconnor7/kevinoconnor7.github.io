#!/bin/bash

if [ "$TRAVIS_BRANCH" != "master" ]; then
  echo "We're not on the master branch."
  exit 0
fi

pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
aws s3 sync _site s3://kevo.io --delete
