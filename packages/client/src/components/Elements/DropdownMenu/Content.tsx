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
        className="w-60 bg-white rounded-md p-1"
      >
        {children}
        <DropdownMenuPrimitive.Arrow className="fill-white" />
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

export default Content;
