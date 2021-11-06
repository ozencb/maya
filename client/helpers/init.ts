import { AuthServices } from '../services';
import jwtManager from './jwt';
import store from '../store';
import { setAuthenticated } from '../store/reducers/session';

const initApplication = async () => {
  const res = await AuthServices.refreshToken();
  jwtManager.setToken(res.accessToken);
  store.dispatch(setAuthenticated(true));
};

export default initApplication;
