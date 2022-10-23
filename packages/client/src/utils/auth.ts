import { AuthorityEnum } from '@Common/types';

export const checkAuthority = (
  userAuthorities: AuthorityEnum[],
  requiredAuthorities: AuthorityEnum | AuthorityEnum[]
) => {
  if (!userAuthorities) return false;
  if (userAuthorities.includes(AuthorityEnum['Elevated Privileges']))
    return true;

  if (typeof requiredAuthorities === 'string') {
    return userAuthorities.includes(requiredAuthorities);
  }
  return requiredAuthorities.every((authority: AuthorityEnum) =>
    userAuthorities.includes(authority)
  );
};
