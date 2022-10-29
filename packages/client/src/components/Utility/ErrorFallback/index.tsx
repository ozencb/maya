import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <pre>{error.message}</pre>
      <button
        onClick={() => {
          resetErrorBoundary();
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorFallback;
