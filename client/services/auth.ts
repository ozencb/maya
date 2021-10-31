import http from '../helpers/http';

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

const refreshToken = async () => {
  return await http({
    method: 'POST',
    url: 'auth/refresh-token',
  });
};

export { register, logIn, logOut, refreshToken };
