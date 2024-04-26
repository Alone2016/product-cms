import moment, { unitOfTime } from "moment";
import 'moment/locale/vi';
import toLower from "lodash/toLower";

export const FORMAT_DATE = "DD/MM/YYYY";

export const FORMAT_DATE_FULL = "DD/MM/YYYY HH:MM:SS";

export const EMPTY_SYMBOL = "--";

export const formatDateToString = (date: Date | string, type?: string) => {
  let result = moment(new Date(date)).format(type ?? FORMAT_DATE);

  if (toLower(result) === "invalid date") return EMPTY_SYMBOL;
  return result;
};

export const formatDateToLocalTime = (date: Object , type?: string) => {
  if (!date) return undefined;
  return moment(date).local().format(type || FORMAT_DATE);
};

export const formatDateForReview = (date: any) => {
  if (!moment(date).isValid()) return undefined;
  return moment(date).locale("vi").format('DMMM,YYYY')
};

export const dateDiff = (startDate: string, endDate: string, formatDate?: string, unitOfTime?: unitOfTime.Diff) => {
  var start = moment(startDate, formatDate ?? FORMAT_DATE);
  var end = moment(endDate, formatDate ?? FORMAT_DATE);

  //Difference in number of days
  return start.diff(end, unitOfTime);
}

export const getTotalMinutes = (value: any): number => {
  return (parseInt(value?.day || 0) * 24 * 60) + ((value?.hour || 0) * 60) + parseInt(value?.minutes || 0);
} 