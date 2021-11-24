
import { environment } from '../../../environments/environment';
export const HOST_CONFIG = {
  MAIN_URL: {
    HOST_URL: environment.apiURL,
    BASE_URL: window.location.origin,
    VERSION_URL: '',
  },
};

