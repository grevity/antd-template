import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200:'The server successfully returned the requested data. ',
  201:'Create or modify data successfully. ',
  202:'A request has entered the background queue (asynchronous task). ',
  204:'Delete data successfully. ',
  400:'There was an error in the request sent, and the server did not create or modify data. ',
  401:'The user does not have permission (the token, username, password are wrong). ',
  403:'The user is authorized, but access is forbidden. ',
  404:'The request is for a record that does not exist, and the server is not operating. ',
  406:'The requested format is not available. ',
  409:'Already Exists',
  410:'The requested resource has been permanently deleted and will no longer be available. ',
  422:'When creating an object, a validation error occurred. ',
  500:'An error occurred in the server, please check the server. ',
  502:'Gateway error. ',
  503:'The service is unavailable, the server is temporarily overloaded or maintained. ',
  504:'The gateway has timed out. ',
};

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = error.data.message || codeMessage[response.status];
    const { status } = response;
    notification.error({
      message: `Request status ${status}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and you cannot connect to the server',
      message: 'Network Anomaly',
    });
  }

  return response;
};

const request = extend({
  errorHandler,
  credentials: 'include',
});
export default request;
