#!/usr/bin/env node
/* Compatibility entry point. Stage 0 keeps this filename because the generated
 * glossary records its generator and the live Stage-0 portal embed must remain
 * byte-for-byte stable. New stages use generate-stage-glossary.mjs --stage N. */

import { runGlossaryGenerator } from "./generate-stage-glossary.mjs";

try {
  runGlossaryGenerator(0);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
