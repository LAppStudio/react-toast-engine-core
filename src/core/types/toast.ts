export enum ToastInfoType {
  info = "info",
  error = "error",
  success = "success",
}

export type Toast = {
  id: string;
  title: string;
  description: string;
  durationInMs: number;
  infoType: `${ToastInfoType}`;
};

export type NewToast = Omit<Toast, "id">;

export type ToastAction = (toast: Toast) => void;

export type ToastActions = {
  onDismiss?: ToastAction;
  onPress?: ToastAction;
};
