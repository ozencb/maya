import { QueryFile, IQueryFileOptions } from 'pg-promise';
import { join as joinPath } from 'path';

const sql = (file: string): QueryFile => {
  const fullPath: string = joinPath(__dirname, file); // generating full path;

  const options: IQueryFileOptions = {
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
};

export const user = {
  add: sql('user/add.sql'),
};
export const log = {
  add: sql('log/add.sql'),
};
