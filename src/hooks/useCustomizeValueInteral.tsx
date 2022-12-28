import { useState, useEffect, useDebugValue } from "react";
import { produce, current as currentImmer } from "immer";

const calMaxLengthOfObjArr = (objArr: { [key: string]: any[] }) => {
    return Object.values<number[]>(objArr).reduce((accu, current) => {
        if (current.length > accu) {
            return current.length;
        } else return accu;
    }, 0);
};

type ObjArr<T> = { [K in keyof T]: number[] };

export const useCustomizeValueInterval = <
    inputType,
    paramType = ObjArr<inputType>
>(
    param: paramType | undefined,
    duration = 5000
) => {
    const [index, setIndex] = useState(0);
    const [dataPool, setDataPool] = useState<
        { [key: string]: number[] }[]
    >([]);
    useDebugValue(index);
    useDebugValue(dataPool);
    /**
     * transform param and put it into dataPool
     */
    useEffect(() => {
        if (!param) return;
        const filteredParam = Object.fromEntries(
            Object.entries<number[]>(param).map(([key, values]) => [
                key,
                values.filter(
                    (value, index, arr) => value !== arr[index - 1]
                ),
            ])
        );
        const maxLength = calMaxLengthOfObjArr(filteredParam);
        /**
         * * refill
         * after param has been filtered, we will have array of different length
         * all array need to have match length so we have to refill
         * array need to have match length so they can share common index
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
        setDataPool(
            produce((draft) => {
                draft.push(filteredParam);
            })
        );
    }, [param]);

    /**
     * start interval when dataPool changes
     */
    useEffect(() => {
        if (!dataPool.length) return;
        /**
         * all array of currentData have common length
         */
        // console.log("rerender");
        const currentData = dataPool[0];
        const anyKey = Object.keys(currentData)[0];
        const commonLength = currentData[anyKey].length;

        const intervalId = setInterval(() => {
            setIndex((prev) => {
                const current = prev + 1;
                console.log(current);
                console.log(commonLength);
                if (current >= commonLength) {
                    setDataPool(
                        produce((draft) => {
                            draft.shift();
                        })
                    );
                    clearInterval(intervalId);
                    return 0;
                }
                return current;
            });
        }, duration / commonLength);

        return () => {
            clearInterval(intervalId);
        };
    }, [dataPool, duration]);
    // console.log(index);
    // console.log(dataPool);
    return { currentData: dataPool[0] as paramType, index };
};
