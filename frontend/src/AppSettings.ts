export const server = 'https://localhost:7160';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-qqff7iofsebhfvpq.us.auth0.com',
  clientId: '68X0UCzHdTyXSskKjTN1CX9tkR7gMcNA',
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://questhub',
    scope: 'read:current_user update:current_user_metadata',
  },
};
