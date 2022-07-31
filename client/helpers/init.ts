import { AuthServices } from '@Services';
import jwtManager from './jwt';
import store from '@Store';
import { setAuthenticated } from '@Reducers/session';

const initApplication = async () => {
  const res = await AuthServices.refreshToken();
  if (res) {
    console.log(res);

    jwtManager.setToken(res.accessToken);
    store.dispatch(setAuthenticated(true));
  }
};

export default initApplication;
