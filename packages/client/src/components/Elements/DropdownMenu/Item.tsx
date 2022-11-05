import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type ChildrenProps = {
  children: ReactNode | string;
};

const RightSlot = ({ children }: ChildrenProps) => {
  return <div className={styles.rightSlot}>{children}</div>;
};

type ItemProps = ChildrenProps & {
  rightSlot?: ReactNode;
  onClick?: () => any;
};

const Item = ({ children, rightSlot, onClick }: ItemProps) => {
  return (
    <DropdownMenuPrimitive.Item onClick={onClick} className={styles.item}>
      {children} {rightSlot && <RightSlot>{rightSlot}</RightSlot>}
    </DropdownMenuPrimitive.Item>
  );
};

export default Item;
