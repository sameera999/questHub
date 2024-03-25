export const server = 'https://localhost:7160';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-qqff7iofsebhfvpq.us.auth0.com',
  clientId: '68X0UCzHdTyXSskKjTN1CX9tkR7gMcNA',
  rediredirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile email',
  audience: 'https://questhub',
};
