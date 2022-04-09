#!/bin/sh
docker run \
  --rm \
  -v /$(pwd):/src \
  -u $(id -u):$(id -g) \
  emscripten/emsdk \
  emcc src/main.cpp -o out/main.js

mv ./out ../app/src/gen