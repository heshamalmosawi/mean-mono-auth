// get cookie
export const getCookie = (cname: string) : string => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// set cookie
export const setCookie = (name_and_value: string = "loggedIn=true", expired: boolean = false) => {
  const expirationDate = new Date();
  if (expired) {
    expirationDate.setHours(expirationDate.getHours() - 1);
  } else {
    expirationDate.setHours(expirationDate.getHours() + 8);
  }
  document.cookie = `${name_and_value}; expires=${expirationDate.toUTCString()}; path=/`;
}