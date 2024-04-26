import dayjs from "dayjs";

const urgencyLabelList = [
  { value: "urgent", label: "Gấp" },
  { value: "normal", label: " Bình thường" },
  { value: "not_urgent", label: "Không gấp" },
];

export default {
  urgencyLabel(key: string) {
    return urgencyLabelList.find((i) => i.value == key)?.label ?? "";
  },
  validToText(valid_to?: string) {
    let result = "";
    let available = false;

    if (valid_to) {
      const d = dayjs(new Date(valid_to)).diff(dayjs(), "days");
      if (d === 0) {
        result = "hôm nay";
        available = true;
      } else if (d < 0) {
        result = "hết hạn";
      } else {
        result = `${d} ngày`;
        available = true;
      }
    }

    return {
      text: result,
      available,
    };
  },
};
