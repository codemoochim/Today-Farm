export const checkEmailForm = (email) => {
  const emailFormPattern = /\S+@\S+.\S+/;
  return emailFormPattern.test(email);
};

export const checkPhoneForm = (phone) => {
  const phoneFormPattern = /^\d{3}-\d{3,4}-\d{4}$/;
  return phoneFormPattern.test(phone);
};

export const checkPwdForm = (password) => {
  const pwdFormPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]$/;
  return pwdFormPattern.test(password);
};
