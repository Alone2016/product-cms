import { ReactElement } from "react";
import { ToastPosition, toast } from "react-toastify";

import { ErrorIcon, CloseIcon, InfoIcon, SuccessIcon, WarningIcon } from "@/icons/alert";

interface IConfig {
  pauseOnHover?: boolean;
  closeOnClick?: boolean;
  autoClose?: number;
  position?: ToastPosition | undefined;
  hideProgressBar?: boolean;
  className?: string;
  icon?: ReactElement;
  bodyClassName?: string;
  closeButton?: any;
}
interface IToast {
  content: string;
  config?: IConfig;
}

const defaultConfig: IConfig = {
  pauseOnHover: false,
  closeOnClick: true,
  autoClose: 2000,
  hideProgressBar: true,
  className: "toast-override-css",
  bodyClassName: "text-[16px] font-[700]",
  position: "bottom-right",
  closeButton: (
    <div className="px-[16px] flex justify-center items-center">
      <CloseIcon />
    </div>
  ),
};

const successConfig = {
  closeButton: (
    <div className="px-[16px] flex justify-center items-center">
      <CloseIcon />
    </div>
  ),
  icon: <SuccessIcon />,
};

const errorConfig = {
  closeButton: (
    <div className="px-[16px] flex justify-center items-center">
      <CloseIcon fill="#D93843" />
    </div>
  ),
  icon: <ErrorIcon />,
};

const warningConfig = {
  closeButton: (
    <div className="px-[16px] flex justify-center items-center">
      <CloseIcon fill="#E59900" />
    </div>
  ),
  icon: <WarningIcon />,
};

const infoConfig = {
  closeButton: (
    <div className="px-[16px] flex justify-center items-center">
      <CloseIcon fill="#0B74E5" />
    </div>
  ),
  icon: <InfoIcon />,
};

export const showMessageSuccess = ({ content, config }: IToast) => toast.success(content, { ...config, ...defaultConfig, ...successConfig });

export const showMessageError = ({ content, config }: IToast) => toast.error(content, { ...defaultConfig, ...config, ...errorConfig });

export const showMessageWarning = ({ content, config }: IToast) => toast.warning(content, { ...defaultConfig, ...config, ...warningConfig });

export const showMessageInfo = ({ content, config }: IToast) => toast.info(content, { ...defaultConfig, ...config, ...infoConfig });
