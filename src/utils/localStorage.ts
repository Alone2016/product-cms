export const getRecentKeyword = () => JSON.parse(window.localStorage.getItem("recentKeyword"));

export const setRecentKeyword = ({ value }: any) => window.localStorage.setItem("recentKeyword", JSON.stringify(value));

export const removeRecentKeyword = () => window.localStorage.removeItem("recentKeyword");

export const getKeyword = ({ key }) => JSON.parse(window.localStorage.getItem(key));

export const setKeyword = ({ value, key }: any) => window.localStorage.setItem(key, JSON.stringify(value));

export const removeKeyword = ({ key }) => window.localStorage.removeItem(key);

export const keyVillageCategory = "villageCategoryName"

export const getVillageCategory = ({ key }) => JSON.parse(window.localStorage.getItem(key));

export const setVillageCategory = ({ value, key }: any) => window.localStorage.setItem(key, JSON.stringify(value));

export const removeVillageCategory = ({ key }) => window.localStorage.removeItem(key);

export const getSearchBusiness = () => JSON.parse(window.localStorage.getItem("isSearchBusiness"));

export const setSearchBusiness = ({ value }: any) => window.localStorage.setItem("isSearchBusiness", JSON.stringify(value));