export const firstNameValidate = {
  required: {
    value: true,
    message: "Please enter your first name",
  },
  minLength: {
    value: 3,
    message: "first name must be at least 3 characters long",
  },
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: "first name must not be alphanumeric",
  },
};
export const lastNameValidate = {
  required: {
    value: true,
    message: "Please enter your last name",
  },
  minLength: {
    value: 3,
    message: "last name must be at least 3 characters long",
  },
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: "last name must not be alphanumeric",
  },
};
export const emailValidate = {
  required: {
    value: true,
    message: "Please enter an email address",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email address is not valid",
  },
};
export const passwordValidate = {
  required: {
    value: true,
    message: "Please enter password",
  },
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters long",
  },
};
