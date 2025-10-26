import {
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  ACCESS_TOKEN_COOKIE_NAME,
} from './consts';

export const getAccessTokenCookieString = (
  accessToken: string,
  makeSecured: boolean = false
) => {
  const baseCookie = `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}; Max-Age=${ACCESS_TOKEN_COOKIE_MAX_AGE}; Path=/; SameSite=Strict`;
  return makeSecured ? `${baseCookie}; HttpOnly; Secure` : baseCookie;
};

export const getLogoutTokenCookieString = (makeSecured: boolean = false) => {
  const baseCookie = `${ACCESS_TOKEN_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Strict`;
  return makeSecured ? `${baseCookie}; HttpOnly; Secure` : baseCookie;
};
