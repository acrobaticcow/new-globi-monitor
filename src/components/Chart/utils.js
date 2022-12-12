import { LayoutUtil, IndicatorRenderer } from "./engine";

const indicators = {};

// export const initIndicators = (container_div, list) => {
//   const div_id = container_div.getAttribute("id");
//   //   if (!container_div) {
//   //     throw "Error, cannot find outer div";
//   //   }
//   // create div
//   let div = document.createElement("div"); // * tạo phần tử con r đẩy nó vào đấy, có thể xóa đoạn code này r tự tạo thẻ div ở ngoài
//   div.setAttribute("id", div_id + "-sub-" + i);
//   div.style.width = "450px";
//   div.style.height = "200px";
//   div.style.position = "relative";
//   container_div.appendChild(div); // * xóa đến đây
//   // LayoutUtil.createGLContainer(div_id + "-sub-" + i); // * hàm này là để enable audio và maximize
//   let render = new IndicatorRenderer(container_div, spec.param); // * nhét parent vào tham số thứ nhất để biến nó thành container cho webgl
//   // render.dataSrc = spec.src; // * đẩy data vào đây
//   // render.registerZoomFn(zoom);
//   // indicators[div_id + "-sub-" + i] = render; // * hàm này vô tác dụng nếu mình tách mỗi cái chart thành một component,
// };
