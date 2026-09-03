import { RouterHistory } from '@tanstack/history';

declare function createNativeScriptHistory(opts?: {
    initialPath?: string;
}): RouterHistory;

export { createNativeScriptHistory };
