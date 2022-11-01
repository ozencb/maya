import { QueryFile, IQueryFileOptions } from 'pg-promise';
import { join as joinPath } from 'path';
import callsite from 'callsite';

// had to utilize somewhat hacky stuff to get callers path
// so we can resolve sql files in their respective repositories without passing base dirnames
export const sqlFileResolver = (file: string): QueryFile => {
  const firstCallerOfMethod = callsite()[1];

  const callerFilePath = firstCallerOfMethod
    .getFileName()
    .replace('index.ts', '');

  if (!file.endsWith('.sql')) file += '.sql'; // add extension if missing

  const RELATIVE_BASE_FOLDER = 'sql';
  const fullPath: string = joinPath(callerFilePath, RELATIVE_BASE_FOLDER, file); // generating full path;

  const options: IQueryFileOptions = {
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
};
