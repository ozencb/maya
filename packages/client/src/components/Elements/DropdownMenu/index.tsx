import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';
import Content from './Content';
import Item from './Item';
import Separator from './Separator';

type Props = {
  children: ReactNode;
  trigger: ReactNode;
};

const Menu = ({ children, trigger }: Props) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <div>{trigger}</div>
      </DropdownMenuPrimitive.Trigger>
      <Content>{children}</Content>
    </DropdownMenuPrimitive.Root>
  );
};

export { Menu, Item, Separator };
