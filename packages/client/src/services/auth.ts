import http from '@Helpers/http';

const me = async ({ username }: { username: string; password: string }) => {
  return await http({
    method: 'POST',
    url: 'auth/me',
    data: {
      username,
    },
  });
};

const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await http({
    method: 'POST',
    url: 'auth/register',
    data: {
      username,
      password,
    },
  });
};

const logIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await http({
    method: 'POST',
    url: 'auth/login',
    data: {
      username,
      password,
    },
  });
};

const logOut = async () => {
  await http({
    method: 'POST',
    url: 'auth/logout',
  });
};

export { me, register, logIn, logOut };
