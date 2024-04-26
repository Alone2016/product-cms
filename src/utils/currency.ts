import numeral from 'numeral';

export const formatCurrency = (number: number, language = 'vi') => {
  let result = '';

  switch (language) {
    case 'en':
      result = `$ ${numeral(number).format('0.0,[00]')}`;
      break;
    case 'vi':
      result = `${numeral(number).format('0,0')} đ`;
      break;
    default:
      result = `${numeral(number).format('0.0,[00]')} đ`;
      break;
  }
  return result;
};

export const localeString = (number: number, language = 'vi') => {
  let result = '0'
  switch (language) {
    case 'en':
      result = numeral(number).format();
      break;
    default:
      result = numeral(number).format();
      break;
  }
  return result;
};
export const formatCurrencyVN = (number: number, language = 'vnd', withSymbol = true) => {
  let result = '0'
  switch (language) {
    case 'en':
      result = `$ ${numeral(number).format('0.0,[00]')}`;
      break;
    case 'vnd':
    case 'vn':
      const format = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
      result = `${withSymbol? 'đ ': ''}${format.format(number).replace('₫', '')}`;
      break;
    default:
      result = `${numeral(number).format('0,')} đ`;
      break;
  }
  return result;
};

export const formatAmount = (currency: number, language = 'vn') => {
  let value = currency;
  if (!Number.isInteger(currency)) {
    if (currency % 1 > 0.5) {
      value = Math.ceil(currency);
    } else {
      value = Math.floor(currency);
    }
  }
  const optionDefault = {
    notation: "compact",
    maximumFractionDigits: 3,
  };

  const extendOption: any = { ...optionDefault };
  if (language === "en") {
    return `$${Intl.NumberFormat("en-US", extendOption).format(value)}`;
  }
  return `đ${Intl.NumberFormat("en-US", extendOption).format(value)}`;

};


export const formatCurrencyVND = (number: number, language = 'vnd', withSymbol = true) => {
  let result = '0'
  switch (language) {
    case 'en':
      result = `$ ${numeral(number).format('0.0,[00]')}`;
      break;
      case 'vnd':
      const format = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
      result = `${withSymbol? '': ''}${format.format(number).replace('₫', '').replace("-", "")}`;
      break;
    default:
      result = `${numeral(number).format('0,')}`;
      break;
  }
  return result;
};


export const formatCurrencyAmount = (currency: number, language = 'vn') => {
  let value = currency;
  if (!Number.isInteger(currency)) {
    if (currency % 1 > 0.5) {
      value = Math.ceil(currency);
    } else {
      value = Math.floor(currency);
    }
  }
  const optionDefault = {
    notation: "compact",
    maximumFractionDigits: 3,
  };

  const extendOption: any = { ...optionDefault };
  if (language === "en") {
    return `$${Intl.NumberFormat("en-US", extendOption).format(value)}`;
  }
  return `${Intl.NumberFormat("en-US", extendOption).format(value)}`;

};