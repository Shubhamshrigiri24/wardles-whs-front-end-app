export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};

export const isSpace = (value) => {
  const spaceValidator = /^\s*$/;
  return spaceValidator.test(value);
};

export const isEmail = (email) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};

export const isMatchemail = (email, confirm_email) => {
  if (email === confirm_email) return true;
  return false;
};

export const isChecked = (checked) => {
  if (checked === true) return true;
  return false;
};

export const isPasswordValid = (password) => {
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

export const isPhone = (value) => {
  const phn =
    /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
  return phn.test(value);
};

export const isPostCode = (value) => {
  const postCode =
    /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
  return postCode.test(value);
};
