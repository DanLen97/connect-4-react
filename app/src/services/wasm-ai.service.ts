import { instantiate, __AdaptedExports } from '@danlen97/as-engine';
import { Board } from '../models/board.model';

export class WasmAiService {
  private exports: typeof __AdaptedExports | null = null;

  public async init(config?: { wasmSource: ArrayBuffer }) {
    const wasmArrayBuffer = config
      ? config.wasmSource
      : await fetch(`${process.env.PUBLIC_URL}/api.wasm`).then((res) =>
        res.arrayBuffer()
      );

    if (!wasmArrayBuffer) {
      throw new Error('Wasm source is empty');
    }

    const module = await WebAssembly.compile(wasmArrayBuffer);
    const wasm = await instantiate(module, {
      env: { memory: new WebAssembly.Memory({ initial: 256 }) },
    });
    this.exports = wasm;
  }

  public calculateBestMove({ width, height, boardState }: Board): number {
    if (!this.exports) {
      throw new Error('WasmAiService not initialized');
    }
    const board: number[] = boardState.map(e => e.playerId ?? 0);
    const res = this.exports.calculateBestMove(board, width, height);
    return res;
  }
}
