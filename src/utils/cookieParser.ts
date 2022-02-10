const generateCookieObject = () => {
  const allCookies = document.cookie;
  const arrayOfCookieBits = allCookies.split(";");

  const CookieObject: any = {};

  arrayOfCookieBits.forEach(function (oneCookieBit) {
    const splitCookieBit = oneCookieBit.split("=");

    const cookieKey = splitCookieBit[0].trim();
    const cookieValue = splitCookieBit[1].trim();

    CookieObject[cookieKey] = cookieValue;
  });

  return CookieObject;
};

const setCookieObject = () =>
  ((window as any).cookieObject = generateCookieObject());

export const getCookieObject = () =>
  (window as any).cookieObject
    ? (window as any).cookieObject
    : setCookieObject();
