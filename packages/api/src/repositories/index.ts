import { LogRepository } from './log';
import { UserRepository } from './user';
import { RoleRepository } from './role';
import { AuthorityRepository } from './authority';

// Database Interface Extensions:
interface IExtensions {
  user: UserRepository;
  log: LogRepository;
  role: RoleRepository;
  authority: AuthorityRepository;
}

export {
  IExtensions,
  UserRepository,
  LogRepository,
  RoleRepository,
  AuthorityRepository,
};
