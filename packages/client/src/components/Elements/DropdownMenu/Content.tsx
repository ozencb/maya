import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type Props = {
  children: any;
  props?: any;
};

const Content = ({ children, ...props }: Props) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        {...props}
        className="flex flex-col gap-1 w-60 rounded-md p-1 bg-zinc-700"
      >
        {children}
        <DropdownMenuPrimitive.Arrow className="fill-zinc-700" />
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export default Content;
