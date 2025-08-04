import { toast, ToastOptions, TypeOptions } from 'react-toastify';

export const showToast = (
  message: string,
  type: TypeOptions = 'default',
  options?: ToastOptions,
) => {
  toast(message, { type, ...options });
};
