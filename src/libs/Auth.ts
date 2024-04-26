// import { initReactQueryAuth } from "../contexts/Auth";

// import { signIn, getUserInfo, singUp, deleteUser, updateUser } from "@/services/UserService";

// import { getToken, setToken, setRefreshToken, deleteRefreshToken, deleteToken } from "../utils/cookie";

// export type LoginCredentials = {
//   email: string;
//   password: string;
// };

// export type RegisterCredentials = {
//   email: string;
//   name: string;
//   password: string;
// };

// export type UpdateCredentials = {
//   email: string;
//   name: string;
//   phone: number;
//   company?: string;
//   title?: string;
//   line_1?: string;
//   province_id?: number;
//   district_id?: number;
//   ward_id?: number;
//   zip_code?: number;
// }

// async function loadUser() {
//   let user = null;

//   if (getToken()) {
//     const responseUser = await getUserInfo();
//     return responseUser?.data?.data;
//   }
//   return user;
// }

// async function loginFn(data: LoginCredentials) {
//   const responseSignIn = await signIn(data);

//   const response = responseSignIn?.data?.data;

//   setToken(response?.access_token);
//   setRefreshToken(response?.refresh_token);

//   const responseUser = await getUserInfo();

//   return responseUser?.data?.data;
// }

// async function registerFn(data: RegisterCredentials) {
//   const response = await singUp(data);
//   return response;
// }

// async function updateFn(data: UpdateCredentials) {
//   const response = await updateUser(data);
//   return response;
// }

// async function logoutFn() {
//   await deleteToken();
//   await deleteRefreshToken();

//   window.location.href = "/authentication/sign-in";
// }

// async function deleteUserFn() {
//   await deleteUser();
// }

// const authConfig = {
//   loadUser,
//   loginFn,
//   registerFn,
//   updateFn,
//   logoutFn,
//   deleteUserFn,
// };

// export const { AuthProvider, AuthConsumer, useAuth } = initReactQueryAuth(authConfig);
