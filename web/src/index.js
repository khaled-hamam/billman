import { authenticate } from './auth.service';

const facebookLogin = () => {
  authenticate('facebook');
};

const googleLogin = () => {
  authenticate('google');
};

window.facebookLogin = facebookLogin;
window.googleLogin = googleLogin;
