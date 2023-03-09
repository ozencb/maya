import { TRPCError } from '@trpc/server';
import { TRPC_ERROR_CODE_KEY } from '@trpc/server/dist/rpc';

export class APIError extends TRPCError {
  public readonly notifyClient;

  constructor(opts: {
    message?: string;
    code: TRPC_ERROR_CODE_KEY;
    cause?: unknown;
    notifyClient?: boolean;
  }) {
    super({ ...opts });
    this.notifyClient = opts.notifyClient;
  }
}
