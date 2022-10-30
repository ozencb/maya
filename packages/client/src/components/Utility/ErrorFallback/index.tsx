import { Button } from '@Elements';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      role="alert"
      className="flex justify-center items-center h-screen w-screen"
    >
      <div className="flex flex-col justify-center gap-6 h-fit w-auto p-6 bg-zinc-800 rounded-md">
        <h1>Ooops, something went wrong :( </h1>
        <pre className="text-xs text-red-200">{error.message}</pre>
        <Button
          onClick={() => {
            resetErrorBoundary();
          }}
          type="secondary"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
