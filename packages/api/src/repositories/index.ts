import { LogRepository } from './log';
import { UserRepository } from './user';

// Database Interface Extensions:
interface IExtensions {
  user: UserRepository;
  log: LogRepository;
}

export { IExtensions, UserRepository, LogRepository };
