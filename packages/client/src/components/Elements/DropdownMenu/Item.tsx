import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

type RightSlotProps = {
  children: ReactNode | string;
};

const RightSlot = ({ children }: RightSlotProps) => {
  return <div className="ml-5 pl-5 text-gray-500">{children}</div>;
};

type ItemProps = {
  children: ReactNode;
  rightSlot?: ReactNode;
};

const Item = ({ children, rightSlot }: ItemProps) => {
  return (
    <DropdownMenuPrimitive.Item className="text-sm leading-4 text-violet-400 rounded-sm flex items-center h-6 px-1 pl-6 relative select-none">
      {children} {rightSlot && <RightSlot>{rightSlot}</RightSlot>}
    </DropdownMenuPrimitive.Item>
  );
};

export default Item;
