import { QueryFile, IQueryFileOptions } from 'pg-promise';

const { join: joinPath } = require('path');

export const users = {
  add: sql('users/add.sql'),
};

export const logs = {
  add: sql('logs/add.sql'),
};

function sql(file: string): QueryFile {
  const fullPath: string = joinPath(__dirname, file); // generating full path;

  const options: IQueryFileOptions = {
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}
