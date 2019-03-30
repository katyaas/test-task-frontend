import config from '../config';

function trimLeft(str, replacement) {
  while (str.charAt(0) === replacement) {
    str = str.substr(1);
  }
  return str;
}

export default async (url, requestOptions = {}) => {
  const requestURL = `//${config.backend}/${trimLeft(url, '/')}`;
  if (!requestOptions.headers) {
    requestOptions.headers = {};
  }

  const {headers, body} = requestOptions;
  if (body && !(body instanceof FormData)) {
    requestOptions.body = JSON.stringify(body);
    Object.assign(headers, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  if (process.env.DEV) {
    console.info('requestURL:', requestURL);
  }

  const resp = await fetch(requestURL, requestOptions);
  const contentType = resp.headers && resp.headers.get('Content-Type');
  const isJSON = contentType && contentType.includes('json');
  return resp[isJSON ? 'json' : 'text']();
};
