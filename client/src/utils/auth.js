/*
*  This function is mainly used for the initial render
*  because the app renders different views depending on
*  the user status. The actual user data is pulled from
*  the server when the app is initializing.
*/
export function isAuthenticated () {
  if (~document.cookie.indexOf('uid=')) {
    return true;
  }

  return false;
}
