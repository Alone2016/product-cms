import toLower from "lodash/toLower";

// import Config from '@/Config';

// export const mainClassName = toLower(Config.PROJECT_NAME);

export const FORMAT_DATE = "DD/MM/YYYY";

export const STATUS_ORDER = [
  {
    value: "completed",
    label: "Đơn hàng giao thành công",
  },
  {
    value: "paid",
    label: "Đơn hàng đã thanh toán",
  },
  {
    value: "payment_pending",
    label: "Đơn hàng đang đợi thanh toán",
  },
  {
    value: "cancelled",
    label: "Đơn hàng đã bị huỷ",
  },
];

export const EMPLOYEES_OPTIONS = [
  { label: "< 50", value: "under_fifty" },
  { label: "< 100", value: "under_one_hundred" },
  { label: "< 200", value: "under_two_hundred" },
  { label: "< 500", value: "under_five_hundred" },
  { label: "< 1.000", value: "under_one_thousand" },
  { label: "< 2.000", value: "under_two_thousand" },
  { label: "< 5.000", value: "under_five_thousand" },
  { label: "> 5.000", value: "over_five_thousand" },
  { label: "< 10.000", value: "under_ten_thousand" },
  { label: "< 20.000", value: "under_twenty_thousand" },
  { label: "< 50.000", value: "under_fifty_thousand" },
  { label: "< 100.000", value: "under_one_hundred_thousand" },
  { label: "< 500.000", value: "under_five_hundred_thousand" },
  { label: "< 1.000.000", value: "under_one_million" },
  { label: "< 10.000.000", value: "under_ten_million" },
  { label: "> 10.000.000", value: "over_ten_million" }
];

export const REVENUE_OPTIONS = [
  { label: "< 200.000 USD", value: "under_two_hundred_thousand" },
  { label: "200.000 - 500.000 USD", value: "two_hundred_thousand_to_five_hundred_thousand" },
  { label: "500.000 - 1.000.000 USD", value: "five_hundred_thousand_to_one_million" },
  { label: "1.000.000 - 2.000.000 USD", value: "one_million_to_two_million" },
  { label: "2.000.000 - 5.000.000 USD", value: "two_million_to_five_million" },
  { label: "5.000.000 - 10.000.000 USD", value: "five_million_to_ten_million" },
  { label: "10.000.000 - 20.000.000 USD", value: "ten_million_to_twenty_million" },
  { label: "20.000.000 - 50.000.000 USD", value: "twenty_million_to_fifty_million" },
  { label: "50.000.000 - 100.000.000 USD", value: "fifty_million_to_one_hundred_million" },
  { label: "> 100.000.000 USD", value: "over_one_hundred_million" },
];

export const ACTIVE_STATUS_OPTIONS = [
  { label: "Đang hoạt động", value: "1" },
  { label: "Ngưng hoạt động", value: "0" },
]

export const DETAILED_BUSINESS_TYPE_OPTIONS = [
  { label: "Sản xuất", value: "1" },
  { label: "Thương mại", value: "2" },
  { label: "Thương mại", value: "3" },
  { label: "Bán buôn", value: "4" },
  { label: "Bán lẻ", value: "5" },
  { label: "Dịch vụ", value: "6" },
  { label: "Người có ảnh hưởng | KOL", value: "7" },
  { label: "Nhà môi giới", value: "8" },
  { label: "Dropshipping", value: "9" },
  { label: "Affiliates", value: "10" },
  { label: "Khác | Other", value: "11" },
]

export const BUSINESS_TERMS = [
  { label: "EXW", value: "EXW" },
  { label: "FCA", value: "FCA" },
  { label: "CPT", value: "CPT" },
  { label: "CIP", value: "CIP" },
  { label: "DAP", value: "DAP" },
  { label: "DPU", value: "DPU" },
  { label: "DDP", value: "DDP" },
  { label: "FAS", value: "FAS" },
  { label: "FOB", value: "FOB" },
  { label: "CFR", value: "CFR" },
  { label: "CIF", value: "CIF" },
]

export const UNIT_QUANTITY = [
  { label: "Tấn", value: "1" },
  { label: "Tạ", value: "2" },
  { label: "Yến", value: "3" },
  { label: "Kg", value: "4" },
  { label: "Gram", value: "5" },
  { label: "Cái", value: "6" },
  { label: "Hộp", value: "7" },
  { label: "Chiếc", value: "8" },
  { label: "Lon", value: "9" },
  { label: "Cuộn", value: "10" },
  { label: "Cây", value: "11" },
  { label: "Chậu", value: "12" },
  { label: "Thùng", value: "13" },
  { label: "Bộ", value: "14" },
  { label: "Cuốn", value: "15" },
  { label: "Tờ", value: "16" },
  { label: "Lóc", value: "17" },
  { label: "Tuýp", value: "18" },
  { label: "Thanh", value: "19" },
  { label: "Gói", value: "20" },
  { label: "Quyển", value: "21" },
  { label: "Bao", value: "22" },
  { label: "Hủ", value: "23" },
  { label: "Cuốn", value: "24" },
  { label: "Chai", value: "25" },
  { label: "Lít", value: "26" },
  { label: "Mililit", value: "27" },
  { label: "Mét", value: "28" },
  { label: "Centimet", value: "29" },
  { label: "Khác", value: "30" },
]

export const PAYMENT_METHOD_OPTIONS = [
  { label: "T/T", value: "1" },
  { label: "L/C", value: "2" },
  { label: "Ví điện tử", value: "3" },
  { label: "Thẻ ghi nợ/ Thẻ tín dụng", value: "4" },
  { label: "Chuyển khoản", value: "5" },
  { label: "Séc", value: "6" },
  { label: "Nhờ thu (nội địa)", value: "7" },
  { label: "COD", value: "8" },
]

export const YES_NO_OTIONS = [
  { label: "Có", value: "yes" },
  { label: "Không", value: "no" },
];

export const NUMBER_OF_PRODUCTION_LINE_OPTIONS = [
  { label: "No/ Không có", value: "no_production" },
  { label: "1", value: "one_production" },
  { label: "2", value: "two_productions" },
  { label: "3", value: "three_productions" },
  { label: "4", value: "four_productions" },
  { label: "5", value: "five_productions" },
  { label: "6", value: "six_productions" },
  { label: "> 6", value: "over_six_productions" },
];

export const NUMBER_0F_EQUIPMENT_OPTIONS = [
  { label: "No/ Không có", value: "no_equipment" },
  { label: "1", value: "one_equipment" },
  { label: "2", value: "two_equipments" },
  { label: "3", value: "three_equipments" },
  { label: "4", value: "four_equipments" },
  { label: "5", value: "five_equipments" },
  { label: "6", value: "six_equipments" },
  { label: "> 6", value: "over_six_equipments" },
];

export const FACTORIES_OPTIONS = [
  { label: "No/ Không có", value: "no_manufactures" },
  { label: "1", value: "one_manufacturer" },
  { label: "2", value: "two_manufacturers" },
  { label: "3", value: "three_manufacturers" },
  { label: "4", value: "four_manufacturers" },
  { label: "5", value: "five_manufacturers" },
  { label: "6", value: "six_manufacturers" },
  { label: "> 6", value: "over_six_manufacturers" },
];
export const OFFICES_OPTIONS = [
  { label: "No/ Không có", value: "offices" },
  { label: "1", value: "one_office" },
  { label: "2", value: "two_offices" },
  { label: "3", value: "three_offices" },
  { label: "4", value: "four_offices" },
  { label: "5", value: "five_offices" },
  { label: "6", value: "six_offices" },
  { label: "> 6", value: "over_six_offices" },
];
export const FOUNDED_YEAR_OPTIONS = [
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
];
export const BUSINESS_TYPE_OPTIONS = [
  { label: "Doanh nghiệp Tư nhân", value: "private_company" },
  { label: "Công ty Hợp danh", value: "partnership_company" },
  { label: "Công ty TNHH MTV", value: "one_member_limited_liability_company" },
  { label: "Công ty TNHH 2 thành viên trở lên", value: "two_or_more_members_limited_liability_company" },
  { label: "Công ty Cổ phần", value: "joint_stock_company" },
  { label: "Doanh nghiệp Nhà nước", value: "state_owned_company" },
  { label: "Doanh nghiệp có vốn Nhà nước", value: "state_owned_company" },
  { label: "Doanh nghiệp có vốn đầu tư nước ngoài / FDI", value: "foreign_direct_investment" },
  { label: "Tổ chức Phi chính phủ/ NGO", value: "non_governmental_organization" },
  { label: "Tổ chức phi lợi nhuận", value: "non_profit" },
  { label: "Hiệp hội/ Association", value: "association" },
  { label: "Khác / Other", value: "other" },
];

export const FEE_PAYMENT_TERM = [
  { label: "Nhà bán", value: "seller" },
  { label: "Nhà mua", value: "buyer" },
]

export const DELIVERY_FEE_TYPE = [
  { value: "negotiable", label: "Thương lượng" },
  { value: "free", label: "Miễn phí" },
]

export const MANUFACTURING_BUSSINESS = [
  { label: "Thời Trang", value: "1" },
  { label: "May mặc, sản xuất, bán buôn nguyên phụ liệu, vật tư ngành dệt may", value: "2" },
  { label: "Nhuộm & hóa chất", value: "3" },
  { label: "Mỹ phẩm ,sản phẩm làm đẹp, chăm sóc cá nhân", value: "4" },
  { label: "Ô tô", value: "5" },
  { label: "Xe máy", value: "6" },
  { label: "Xe điện & Các phương tiện vận chuyển thân thiện môi trường", value: "7" },
];

export const RFQ_STATUS = [
  { text: "Chờ", status: "pending" }
];

export const PLACEHOLDER_IMAGE_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEXq6upqamrV1dXu7u5iYmLk5ORcXFxfX1+2trbKyspmZma5ubnW1tbx8fFlZWXl5eXc3Nx3d3e/v7+kpKRubm6ysrLGxsaPj4+bm5uVlZWCgoJ8fHyhoaFYWFhTU1OKior/FHn9AAAEUUlEQVR4nO2dCZOqOhBGwQAZGUJwX9/z///LC5GdoIiQNPd+p6ampkZZjmmSTkfUcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/KswC8f0jWJB0PkvMMj/Ngxj1yCeDcPQdWNuAi99Lbkdw3i3NsIuttWG3q9gBhC/nj1DI304g+Fc6AzZHMp0DJmQq8gRkx+IjKE4bgLOg5M/dTtSMRR3rsbmmK8nViRiyA68yD+CZNoDETGUQZlhhY9pr0UahuzgVUlkMO1MgIahuISVIT9OeiUSMTzVDL3tGMPesZSI4bk2meKrEYYs+um5fGkYOkdeGcZjdifdoGeYIWIo9lWQ7sb0pen2XqJVJGLIoqIR482YGL2p61jqNiVi6LDVnqdnGQaPEfsSD3UZh9oXh4ph2hduH5vbeT0iRMUlH01jXbJAxjCbXKSMCFGxK9MF79xVJGQ4EnGo9cP80FFcvKHYVimtNiFauiFbNwTTrLadLyzckEWe2yJszaGXbcj8jqAb7pvrMIs2ZHIfdgzd+NrobZZtuNEIpmPGpa5I0nBgVVFce5Z3eD21pWgodoPmT+LUvQiLDrU2xSRoyFZBrJ8mNBDnXsHGHJOiYToTeq8odrxfMFUsd0DPUNzV1fWmMix+Xwq67r54JjnDNEafp6id7JXPOr4RdMNbvj09w3y2H+5l/8bly/CC+PTsUKkZ1mpSm95tWfKikynJyyHEDOuJdDpl7wlUf4BfSqDKb8QMnX3tDOOrvrTEdLmaVjErv9EyFJdGlqJXzMtOQ8jKb6QM2brVQ3qawktvrqYjlIyUodNthFNbsSw7DTPckDJsxehT8dJUFPdPBFX5jY5hJ0afio3yWaPsNAjvvrX4jiHW/pcOfq8UW2WnYYo3a+9raxnqYvSpWM72hLaVh1haEOzWvPubpyiCVosbizSUr2Z7SpElo9+xScEwX1zpIfgV2RLhaAgYsu3rAAy2wtGXnZZi+CpGFfz4SSpDz1A83rZPPL4FCRi+i9GvsW7ozyxo3VBcZxa0bch+5m5Cy4a69aO/y1Bcv+klF2Ao5o9Ry4aJAUGrhmJ4WWmZhp/P2RdmyIzEqE1DsTEiaPHOrsP8Q6Fdw0ELLEs23N4MCVq7h9TQRWjR0BwwhCEM7RtauVudewYJbBj+mORgw9DErfgVNgwBAAAAAAAAAAAAAAAAAAAANcq1o9Za0oIXlbKTlurD8JOKqEvt0fS5UkrHzhcEDEG1hJRKKYpW36DEM99itxTIxGpaXxrW/sxULbtJP/nOZ5Bz4ks70evPL1fTNN+YyfPAZvTU74k/f/kdJtuv0IyMGvrGDVcr04GaGPYzHKQKmZiyTBJLvWlGfSyMJut6ql2mY6IttQL12soJspmGoRrtZbl/IuSueTqaZZ4fGOVpqk/Qqw0rfgpkhvZbqtQjL7YEAAAAAAAAAAAAAAAAAAAAAIBp+QOn81PHqLV3GQAAAABJRU5ErkJggg=="

export const enum PROMOTION_TYPE {
  ORDER_DISCOUNT = 'order_discount',
  NEW_CUSTOMER = 'new_customer',
  BUY_ONE_GET_ONE = 'bundle_bonus',
}