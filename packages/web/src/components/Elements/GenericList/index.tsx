import { ElementBaseProps } from '@Types';

type Props<T> = ElementBaseProps<HTMLDivElement> & {
  data: T[] | undefined;
  renderItem: (item: T) => JSX.Element;
  extractor: (item: T) => string | number;
};

const GenericList = <T,>({
  data,
  renderItem,
  extractor,
  style,
  className,
}: Props<T>) =>
  data ? (
    <div className={className?.toString()} style={style}>
      {data.map((item) => (
        <div key={extractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  ) : (
    <div>No Data</div>
  );

export default GenericList;
