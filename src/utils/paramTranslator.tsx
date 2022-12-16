import {
  HealthiconsBaby0203AltOutline,
  MaterialSymbolsChildCare,
  MdiHumanHandsdown,
} from "../components/Icons";
import { Variant } from "./textColorClass";

interface generalTranslatorProps {
  status: number;
  type: Variant;
}

export const stTranslatorForSpo2 = (status: number) => {
  switch (status) {
    case 0:
      return "";
    case 1:
      return "Chưa gắn cảm biến SPO2";
    case 2:
      return "Chưa kẹp vào ngón tay";
    case 3:
      return "Đang tìm kiếm tín hiệu";
    case 4:
      return "Hết thời gian tìm kiếm tín hiệu";
    default:
      return "--";
  }
};
export const stTranslatorForTemp = (status: number) => {
  switch (status) {
    case 0:
      return "";
    case 1:
      return "Chưa gắn cảm biến nhiệt độ";
    default:
      return "--";
  }
};
export const stTranslatorForNibp = (status: number) => {
  switch (status) {
    case 0:
      return "";
    case 1:
      return "Trong quá trình kiểm tra";
    case 2:
      return "Đã dừng kiểm tra";
    case 3:
      return "Bảo vệ quá áp";
    case 4:
      return "Vòng bít quá lỏng hoặc chưa gắn";
    case 5:
      return "Hết thời gian kiểm tra";
    case 6:
      return "Đã xảy ra lỗi trong quá trình kiểm tra";
    case 7:
      return "Phát hiện nhiễu trong quá trình kiểm tra";
    case 8:
      return "Kết quả kiểm tra nằm ngoài phạm vi";
    case 9:
      return "Mô-đun đang khởi tạo";
    case 10:
      return "Mô-đun đã khởi tạo";
    default:
      return "--";
  }
};

export const modeIconTranslatorForNibp = (mode: number) => {
  switch (mode) {
    case 0:
      return <MdiHumanHandsdown className="h-5 w-5" />;
    case 1:
      return <MaterialSymbolsChildCare />;
    case 2:
      return <HealthiconsBaby0203AltOutline />;
  }
};

export const generalStTranslator = ({
  status,
  type,
}: generalTranslatorProps) => {
  switch (type) {
    case "spo2":
      return stTranslatorForSpo2(status);
    case "nibp":
      return stTranslatorForNibp(status);
    case "temp":
      return stTranslatorForTemp(status);
    default:
      return stTranslatorForSpo2(status);
  }
};
