import { LogsRepository } from './logs';
import { UsersRepository } from './users';

// Database Interface Extensions:
interface IExtensions {
  users: UsersRepository;
  logs: LogsRepository;
}

export { IExtensions, UsersRepository, LogsRepository };
