import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

type ChildrenProps = {
  children: ReactNode | string;
};

const RightSlot = ({ children }: ChildrenProps) => {
  return <div className="ml-5 pl-5 text-gray-500">{children}</div>;
};

type ItemProps = ChildrenProps & {
  rightSlot?: ReactNode;
  onClick?: () => any;
};

const Item = ({ children, rightSlot, onClick }: ItemProps) => {
  return (
    <DropdownMenuPrimitive.Item
      onClick={onClick}
      className="text-sm leading-4 text-violet-400 rounded-sm flex items-center py-1 pl-2 relative select-none cursor-pointer focus:outline-none"
    >
      {children} {rightSlot && <RightSlot>{rightSlot}</RightSlot>}
    </DropdownMenuPrimitive.Item>
  );
};

export default Item;
