import numeral from "numeral";

interface IFormatNumber {
  value: number;
  language?: string;
}

export const formatNumber = ({ value, language }: IFormatNumber) => {
  return numeral(value).format("0,0");
};

export const kFormatter = (num: number) => {
  return Math.abs(num) > 999 ? Math.sign(num)*(Math.round(Math.abs(num)/100)/10) + 'k' : Math.sign(num)*Math.abs(num)
};