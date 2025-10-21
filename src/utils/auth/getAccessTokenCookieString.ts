import { ACCESS_TOKEN_COOKIE_MAX_AGE, ACCESS_TOKEN_COOKIE_NAME } from "./consts";

export const getAccessTokenCookieString = (accessToken: string, makeSecured: boolean = false) => {
  return `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}; Max-Age=${ACCESS_TOKEN_COOKIE_MAX_AGE}; Path=/; ${makeSecured ? '; HttpOnly; Secure;' : ''}`;
};
