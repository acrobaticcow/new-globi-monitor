export type Variant = "ecg" | "spo2" | "nibp" | "temp";
export const varTxtLight = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "text-biloba-flower-300/80";
    case "nibp":
      return "text-pale-prim-400/80";
    case "spo2":
      return "text-spray-200/80";
    case "temp":
      return "text-pale-prim-100/90";
    default:
      return "text-neutral-100";
  }
};
export const varTxtBase = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "text-biloba-flower";
    case "nibp":
      return "text-pale-prim-200";
    case "spo2":
      return "text-spray";
    case "temp":
      return "text-pale-prim";
    default:
      return "text-neutral-100";
  }
};
export const varFillBase = (variant: Variant | undefined) => {
  switch (variant) {
    case "ecg":
      return "fill-biloba-flower";
    case "nibp":
      return "fill-pale-prim-600";
    case "spo2":
      return "fill-spray";
    case "temp":
      return "fill-pale-prim";
    default:
      return "fill-neutral-100";
  }
};
