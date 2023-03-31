import { Button } from '@Elements';
import { FallbackProps } from 'react-error-boundary';

import styles from './styles.module.scss';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert" className={styles.container}>
      <div className={styles.errorContainer}>
        <h1>Ooops, something went wrong :( </h1>
        <pre className={styles.message}>{error.message}</pre>
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
