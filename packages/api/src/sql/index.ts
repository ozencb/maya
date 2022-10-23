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
  all: sql('user/all.sql'),
  add: sql('user/add.sql'),
  deleteById: sql('user/deleteById.sql'),
  findById: sql('user/findById.sql'),
  findByUsername: sql('user/findByUsername.sql'),
  findDetailByUsername: sql('user/findDetailByUsername.sql'),
  findExistsByUsername: sql('user/findExistsByUsername.sql'),
};
export const log = {
  add: sql('log/add.sql'),
};
export const role = {
  all: sql('role/all.sql'),
};
export const authority = {
  all: sql('authority/all.sql'),
};
