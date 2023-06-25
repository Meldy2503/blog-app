import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SuccessToast = (message: string) => {
  toast.success(message);
};

export const ErrorToast = (message: string) => {
  toast.error(message);
};

export const InfoToast = (message: string) => {
  toast.info(message);
};

export const WarningToast = (message: string) => {
  toast.warning(message);
};
