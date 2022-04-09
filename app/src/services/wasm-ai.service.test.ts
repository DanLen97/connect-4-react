import { WasmAiService } from './wasm-ai.service';
import { readFile } from 'fs/promises';

test('add', async () => {
  const wasmAi = new WasmAiService();

  await wasmAi.init({ wasmSource: (await readFile('./public/api.wasm'))});

  expect(wasmAi).toBeDefined();
});
