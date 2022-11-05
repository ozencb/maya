import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import styles from './styles.module.scss';

type Props = {
  children: any;
  props?: any;
};

const Content = ({ children, ...props }: Props) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content {...props} className={styles.content}>
        {children}
        <DropdownMenuPrimitive.Arrow className={styles.arrow} />
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export default Content;
