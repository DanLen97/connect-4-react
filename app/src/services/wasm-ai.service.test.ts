import { WasmAiService } from './wasm-ai.service';
import { readFile } from 'fs/promises';

test('add', async () => {
  const wasmAi = new WasmAiService();

  await wasmAi.init({ wasmSource: (await readFile('./public/as-api.wasm'))});

  expect(wasmAi.add(1, 2)).toBe(3);
});
