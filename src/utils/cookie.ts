import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const getToken = () => getCookie("token");

export const setToken = (value: any) => setCookie("token", value);

export const deleteToken = () => deleteCookie("token");

export const getRefreshToken = () => getCookie("refreshToken");

export const setRefreshToken = (value: any) => setCookie("refreshToken", value);

export const deleteRefreshToken = () => deleteCookie("refreshToken");
