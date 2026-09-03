// src/history.ts
import { createMemoryHistory } from "@tanstack/history";
function createNativeScriptHistory(opts) {
  return createMemoryHistory({
    initialEntries: [(opts == null ? void 0 : opts.initialPath) || "/"]
  });
}
export {
  createNativeScriptHistory
};
//# sourceMappingURL=index.mjs.map