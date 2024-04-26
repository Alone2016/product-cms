import qs from "qs";

import isEmpty from "lodash/isEmpty";

export const getRememberMe = () => {
  const value: any = localStorage.getItem("rememberMe");
  if (isEmpty(value)) return null;

  return qs.parse(value);
};

export const setRememberMe = ({ value }: any) => localStorage.setItem("rememberMe", qs.stringify(value));

export const deleteRememberMe = () => localStorage.removeItem("rememberMe");

export const deletePromotionState= () => localStorage.removeItem("promotion");
export const setPromotionState = (value: any) => localStorage.setItem("promotion", JSON.stringify(value));
export const getPromotionState = () => {
  const state = localStorage.getItem("promotion");
  const value: any = JSON.parse( state || "{}");

  if (value?.id) {
    value.valid_from = new Date(value.valid_from);
    value.valid_to = new Date(value.valid_to);
  } else {
    return null
  }
  

  setTimeout(() => {
    deletePromotionState();
  }, 1000)

  return value;
}

export const getUsernameStorage = () => localStorage?.getItem("username");

export const deleteUsernameStorage= () => localStorage?.removeItem("username");

export const saveUsernameStorage= (v: string) => localStorage?.setItem("username", v);

export const saveLatestPath = (path: string) => localStorage?.setItem("path", path);

export const getQuotation = () => localStorage?.getItem("quotation");

export const saveQuotationStorage = (v: any) => localStorage?.setItem("quotation", v);

export const deleteQuotationStorage = () => localStorage?.removeItem("quotation");

export const getbackUrlStorage = () => localStorage?.getItem("back_url");

export const saveBackUrlStorage = (path: string) => localStorage?.setItem("back_url", path);

export const deleteBackUrlStorage = () => localStorage?.removeItem("back_url");

export const saveProductSelect = (data: string) => localStorage?.setItem("productSelect", data);

export const getProductSelect = () => localStorage?.getItem("productSelect");

export const deleteProductSelect = () => localStorage?.removeItem("productSelect");







