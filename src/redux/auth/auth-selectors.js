export const getIsAuthenticated = state => state.auth.isAuthorized;
export const getIsSignup = state => state.auth.isSignup;

export const getUserName = state => state.auth.user.name;

export const getLoadingUser = state => state.auth.loading;

export const getErrorSignup = state => state.auth.errorSignup;
export const getErrorLogin = state => state.auth.errorLogin;

export const getError = state => state.auth.error;
