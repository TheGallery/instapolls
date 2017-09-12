export function isAuthenticated () {
  if (~document.cookie.indexOf('uid=')) {
    return true;
  }

  return false;
}
