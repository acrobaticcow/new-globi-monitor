import produce, { current as currentImmer } from "immer";
import { useEffect, useRef, useState } from "react";
import { isObjEmpty } from "../utils/function";

type ObjNumbArr = {
    [key: string]: number[];
};
type ObjArr<T> = { [K in keyof T]: number[] | undefined };
type TransformedParam = {
    data: ObjNumbArr;
    duration: number;
    index: number;
    lastIndex: number;
    isReady: boolean; // nếu đúng thì data này an toàn để vứt đi
};
const calMaxLengthOfObjArr = (objArr: ObjNumbArr) => {
    return Object.values<number[]>(objArr).reduce(
        (a, b) => Math.max(a, b.length),
        -Infinity
    );
};

/** CÁCH HOẠT ĐỘNG
 * Có 2 phần chính, format lại param (tham khảo type 'transformedParam') và setTimeout
 * * Transformed param (useEffect, [props]) (bước 1)
 * 1. Trong các mảng của obj, xóa các phần tử liền kề nhau mà giống nhau để có một mảng nhỏ nhất và vẫn giữ được thông tin chính của mảng
 * 2. Sau khi lọc, sẽ có các mảng có độ dài khác nhau và cần phải đồng bộ độ dài của các mảng (refill) bởi vì index được dùng chung, nên để tránh việc index trỏ tới undefined, index cần được chỉ đến giá trị gì đó
 * 3. Khi state hiện tại có props isReady === false, data mới được nhét vào dataPool (ref) *end;
 * 4. Khi isReady === true, Nhét data mới vào state (khi dataPool trống) hoặc lấy data (cũ) ở đầu bể chứa dataPool và nhét data mới vào đuôi *end
 * * setTimeout (useEffect, [state]) (bước 2)
 * tăng dần index, index này được dùng chung cho tất cả các mảng của obj
 * khi đến index cuối cùng, nếu trong dataPool có , thì dùng cái đấy ghi đè vào state không thì end;
 */
export const useCustomizeValueInterval = <
    inputType,
    paramType = ObjArr<inputType>
>(
    param: paramType | undefined,
    duration = 5000
) => {
    const [transformedParam, setTransformedParam] =
        useState<TransformedParam>({
            data: {},
            duration: 0,
            index: 0,
            isReady: true,
            lastIndex: 0,
        });
    const dataPoolRef = useRef<TransformedParam[]>([]);
    const intervalIdRef = useRef(0);

    useEffect(() => {
        if (!param) return;
        const filteredParam = Object.fromEntries(
            Object.entries<number[] | undefined>(param).map(
                ([key, value]) => {
                    const transformedValue =
                        value?.filter(
                            (value, index, arr) =>
                                value !== arr[index - 1]
                        ) ?? [];
                    return [key, transformedValue];
                }
            )
        );
        const maxLength = calMaxLengthOfObjArr(filteredParam);
        /**
         * * refill
         */
        for (const k in filteredParam) {
            const currentParam = filteredParam[k];
            const lengthDeficit = maxLength - currentParam.length;

            if (lengthDeficit > 0) {
                currentParam.push(
                    ...Array(lengthDeficit).fill(
                        currentParam[currentParam.length - 1]
                    )
                );
            }
        }
        setTransformedParam(
            produce((draft) => {
                const current = {
                    data: filteredParam,
                    duration,
                    isReady: false,
                    index: 0,
                    lastIndex: maxLength - 1,
                };
                if (draft.isReady === true) {
                    const queueData = dataPoolRef.current.shift();
                    dataPoolRef.current.push(current);
                    return queueData ?? current;
                } else {
                    dataPoolRef.current.push(current);
                }
            })
        );
    }, [param, duration]);

    useEffect(() => {
        if (!isObjEmpty(transformedParam.data)) {
            const intervalFn = () => {
                setTransformedParam(
                    produce((draft) => {
                        if (draft.index >= draft.lastIndex) {
                            draft.isReady = true;
                            const queueData =
                                dataPoolRef.current.shift();
                            clearTimeout(intervalIdRef.current);
                            draft = queueData ?? draft;
                        } else {
                            draft.index++;
                        }
                    })
                );
            };
            intervalIdRef.current = setTimeout(
                intervalFn,
                transformedParam.duration /
                    transformedParam.lastIndex +
                    1
            );
        }
        return () => {
            clearTimeout(intervalIdRef.current);
        };
    }, [transformedParam]);

    return {
        currentData: (!isObjEmpty(transformedParam.data)
            ? transformedParam.data
            : undefined) as paramType | undefined,
        index: transformedParam.index,
    };
};
