import assert from "assert";
import { instantiate } from "../build/release.js";
import { readFile } from 'fs/promises';

(async () => {
  const wasmArrayBuffer = await readFile('./build/release.wasm');
  const module = await WebAssembly.compile(wasmArrayBuffer);
  const wasm = await instantiate(module, {});


  assert.strictEqual(wasm.add(1, 2), 3);
})();

