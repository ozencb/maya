import classnames from 'classnames';
import {
  Cross2Icon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import toast, { useToaster, ToastType } from 'react-hot-toast/headless';

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, updateHeight } = handlers;

  const statusIcons: {
    [name in ToastType]: JSX.Element | null;
  } = {
    success: <CheckCircledIcon className="text-green-500" />,
    error: <ExclamationTriangleIcon className="text-red-500" />,
    loading: null,
    blank: null,
    custom: null,
  };

  return (
    <div
      className="fixed bottom-4 right-4"
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
              'rounded-sm bg-white text-black p-2 w-60 m-0 transition-all ease-out duration-200 ',
              t.visible ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              transform: `translateY(${offset}px)`,
            }}
            {...t.ariaProps}
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2 overflow-ellipsis">
                {t.icon ? t.icon : statusIcons[t.type]}
                {t.message as string}
              </div>
              <Cross2Icon
                onClick={() => toast.dismiss(t.id)}
                className="ml-2"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
