import { useReducer, useEffect } from "react";

type valuesAndParams = {
  param: ReadonlyArray<number>;
  param2?: ReadonlyArray<number>;
  value: number;
  value2: number | undefined;
};
interface ValueIntervalState {
  warning?: string;
  warnings?: string[];
  valuesAndParams: valuesAndParams[];
}

enum ValueIntervalActionKind {
  UPDATE = "update",
  PING = "ping",
}
type ValueIntervalActionPayload = {
  index: number;
};
interface ValueIntervalAction {
  type: ValueIntervalActionKind;
  payload?: ValueIntervalActionPayload;
}

const valueIntervalReducer = (
  state: ValueIntervalState,
  { type, payload }: ValueIntervalAction
): ValueIntervalState => {
  const { warnings, valuesAndParams } = state;
  switch (type) {
    case ValueIntervalActionKind.UPDATE:
      if (!payload) return state;
      return {
        ...state,
        warning: warnings ? warnings[payload.index] : undefined,
        valuesAndParams: valuesAndParams.map((el) => ({
          ...el,
          value: el.param[payload.index],
          value2: el.param2 ? el.param2[payload.index] : undefined,
        })),
      };
    default:
      return state;
  }
};

interface useValueIntervalProps {
  valuesAndParams: valuesAndParams[];
  warnings?: string[];
  times: number[];
}

export const useValueInterval = ({
  valuesAndParams,
  times,
  warnings,
}: useValueIntervalProps) => {
  const [{ warning, valuesAndParams: currentValueAndParams }, dispatch] =
    useReducer(valueIntervalReducer, {
      warnings,
      valuesAndParams,
    });

  useEffect(() => {
    const timeoutIdArr: number[] = [];
    /**
     * thời gian mà thẻ sẽ thay đổi thông số
     * @example time = [2,2,1] thì sau 2s sẽ cập nhật thông số mới
     * và 2s sau nữa cập nhật thông số mới và cuối cùng là 1s sau cập nhật thông số
     */
    const beats = times.map((el, i, arr) => {
      if (i === 0) return 0;
      return el - arr[i - 1];
    });
    for (let i = 0; i < beats.length; i++) {
      const beat = beats[i];
      let timeoutId = setTimeout(() => {
        dispatch({
          type: ValueIntervalActionKind.UPDATE,
          payload: { index: i },
        });
        /**
         * trích xuất warning, nếu không có thì là undefined
         */
      }, 1000 * i * beat);
      timeoutIdArr.push(timeoutId);
    }
    return () => timeoutIdArr.forEach((el) => clearTimeout(el));
  }, [times]);

  return { warning, currentValueAndParams };
};
