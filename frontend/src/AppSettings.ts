export const server = 'https://localhost:7160';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'your-tenantid.auth0.com',
  client_id: 'your-clientid',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://questhub',
};
