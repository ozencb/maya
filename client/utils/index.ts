export const spreadClasses = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};
