import classnames from 'classnames';
import {
  Cross2Icon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';
import toast, { useToaster, ToastType } from 'react-hot-toast/headless';

import styles from './styles.module.scss';

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, updateHeight } = handlers;

  const statusIcons: {
    [name in ToastType]: JSX.Element | null;
  } = {
    success: <CheckCircledIcon className={styles.success} />,
    error: <ExclamationTriangleIcon className={styles.error} />,
    loading: null,
    blank: null,
    custom: null,
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((t, index) => {
        const offset = index * 12;

        const ref = (el: any) => {
          if (el && typeof t.height !== 'number') {
            const height = el.getBoundingClientRect().height;
            updateHeight(t.id, height);
          }
        };

        return (
          <div
            key={t.id}
            ref={ref}
            className={classnames(
              styles.notification,
              t.visible && styles.visible
            )}
            style={{
              transform: `translateY(${offset}px)`,
            }}
            {...t.ariaProps}
          >
            <div className={styles.messageContainer}>
              <div className={styles.message}>
                {t.icon ? t.icon : statusIcons[t.type]}
                {t.message as string}
              </div>
              <Cross2Icon
                onClick={() => toast.dismiss(t.id)}
                className={styles.crossIcon}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
