import assert from "assert";
import { instantiate } from "../build/release.js";
import { readFile } from "fs/promises";

(async () => {
  const wasmArrayBuffer = await readFile("./build/release.wasm");
  const module = await WebAssembly.compile(wasmArrayBuffer);
  const wasm = await instantiate(module, { env: { memory: new WebAssembly.Memory({ initial: 256 }) } });

  assert.strictEqual(wasm.checkWinner(
    [0, 0, 0, 0,
     0, 0, 0, 0,
     1, 1, 1, 0,
     2, 2, 2, 0],
    4, 4), 0);
})();
