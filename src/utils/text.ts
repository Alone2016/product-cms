export const removeAccents = (str: string) => {
  const AccentsMap: any = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (let i = 0; i < AccentsMap.length; i++) {
    const re = new RegExp(`[${AccentsMap[i].substr(1)}]`, "g");
    const char = AccentsMap[i][0];
    str = str?.replace(re, char);
  }
  return str;
};

export const removeAccentsAndSymbols = (str: string) => {
  str = str.toLowerCase();     
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');
	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
 
	// return
	return str;
}

export const generateRandomCode = (shopName: string) => {
    const formattedShopName = removeAccents(shopName).replace(/\s+/g, '').toUpperCase();

    const shopCodePart = formattedShopName.substring(0, 4);

    const paddingLength = Math.max(0, 4 - shopCodePart.length);

    const randomChars = Array.from({ length: (4 + paddingLength) }, () =>
        Math.random().toString(36).charAt(2)
    ).join('');

    const randomCode = shopCodePart + randomChars.toUpperCase();

    return randomCode;
}

export const validateNull = (value: string) => { 
  return value === null || "" === value.trim();
}