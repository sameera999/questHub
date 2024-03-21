export const server = 'https://localhost:7160';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-qqff7iofsebhfvpq.us.auth0.com',
  client_id: '68X0UCzHdTyXSskKjTN1CX9tkR7gMcNA',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://questhub',
};
