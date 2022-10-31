type Props<T> = {
  data: T[] | undefined;
  renderItem: (item: T) => JSX.Element;
  extractor: (item: T) => string | number;
};

const GenericList = <T extends unknown>({
  data,
  renderItem,
  extractor,
}: Props<T>) =>
  data ? (
    <div>
      {data.map((item) => (
        <div key={extractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  ) : (
    <div>No Data</div>
  );

export default GenericList;
