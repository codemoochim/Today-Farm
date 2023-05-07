export const checkEmailForm = (email) => {
  const emailFormPattern = /\S+@\S+.\S+/;
  return emailFormPattern.test(email);
};

export const checkPhoneForm = (phone) => {
  const phonFormPattern = /^\d{3}-\d{3,4}-\d{4}$/;
  return phonFormPattern.test(phone);
};
