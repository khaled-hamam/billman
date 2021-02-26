import Cookies from 'js-cookie';
import { config } from './config';

/**
 *
 * @param {('google' | 'facebook')} service
 */
export const authenticate = service => {
  _showAuthWindow({
    path: `${config.authUrl}/${service}`,
    callback: async code => {
      const { access_token } = await fetch(`${config.authUrl}/${service}/callback?${new URLSearchParams({ code }).toString()}`, {
        credentials: 'include',
      }).then(res => res.json());

      Cookies.set('access_token', access_token, { expires: 365 });
      window.location.href = config.appUrl;
    },
  });
};

const _showAuthWindow = options => {
  const width = 500;
  const height = 700;
  const xPosition = (window.innerWidth - width) / 2;
  const yPosition = (window.innerHeight - height) / 2;

  options.windowName = options.windowName || "ConnectWithOAuth";
  options.windowOptions = options.windowOptions || `location=0,status=0,width=${width},height=${height},left=${xPosition},top=${yPosition}`;
  options.callback = options.callback || (() => window.location.reload());

  window.addEventListener('message', event => {
    const urlParams = new URLSearchParams(event.data);
    const code = urlParams.get('code');

    if (code) {
      options.callback(code);
    }
  }, {
    once: true,
  });

  window.open(
    options.path,
    options.windowName,
    options.windowOptions
  );
};
