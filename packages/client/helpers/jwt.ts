const jwtManager = () => {
  let token: string | null = null;

  const getToken = () => {
    return token;
  };
  const setToken = (newToken: string) => {
    token = newToken;
  };
  const eraseToken = async () => {
    token = null;
  };

  return { getToken, setToken, eraseToken };
};

// Scope-out token to prevent direct access
export default (() => jwtManager())();
