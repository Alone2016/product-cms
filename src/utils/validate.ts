export const validateEmail = (data: string) => {
  return String(data)
    .toLowerCase()
    .match(
      validateEmailReg,
    );
};

const validateEmailString = `(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(\.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\\.)+[a-zA-Z]{2,}))`;
const validatePhoneString = `^([\s\(\)\-]*\\d[\s\(\)\-]*){10,}$`;;
export const validateEmailReg = new RegExp(validateEmailString, "g");
export const validatePhoneReg = new RegExp(validatePhoneString, "g");
export const validateEmailOrPhoneReg = new RegExp(`${validateEmailString}|${validatePhoneString}`, "g");

export const validatePhone = (phoneString: string) => {
  return String(phoneString)
    .toLowerCase()
    .match(
      validatePhoneReg,
    );
}

export const validateOnlyNumber = (data: string) => !!data?.match(/^[0-9]+$/g);
