import { instantiate, __AdaptedExports } from '@danlen97/as-engine';

export class WasmAiService {
  private exports: typeof __AdaptedExports | null = null;

  public async init(config?: { wasmSource: ArrayBuffer }) {
    const wasmArrayBuffer =
      config ? config.wasmSource :
      (await fetch('./public/api.wasm').then((res) => res.arrayBuffer()));

    if (!wasmArrayBuffer) {
      throw new Error('Wasm source is empty');
    }

    const module = await WebAssembly.compile(wasmArrayBuffer);
    const wasm = await instantiate(module, {
      env: { memory: new WebAssembly.Memory({ initial: 256 }) },
    });
    this.exports = wasm;
  }

  public test(a: number, b: number): number {
    if (!this.exports) {
      throw new Error('WasmAiService not initialized');
    }
    const res = this.exports.calculateBestMove([1,2,3], 1, 1);
    return res;
  }
}
