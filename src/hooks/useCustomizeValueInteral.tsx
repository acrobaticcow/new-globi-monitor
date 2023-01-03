import { useState, useEffect, useRef } from "react";
import { produce, current as currentImmer } from "immer";
import type { WritableDraft } from "immer/dist/internal";

const calMaxLengthOfObjArr = (objArr: {
    [key: string]: number[];
}) => {
    return Object.values<number[]>(objArr).reduce(
        (a, b) => Math.max(a, b.length),
        -Infinity
    );
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
    const [isReady, setIsReady] = useState(true);
    const intervalIdRef = useRef(0);
    const currentDataRef =
        useRef<WritableDraft<{ [key: string]: number[] }>>();
    const currentIndexRef = useRef<number>(0);
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
        return () => {};
    }, [param, duration]);

    /**
     * start interval when dataPool changes
     */
    useEffect(() => {
        if (dataPool.length === 0 || isReady === false) {
            return;
        } else {
            /**
             * all array of currentData have common length
             */
            const currentData = dataPool[0];
            const anyKey = Object.keys(currentData)[0];
            const commonLength = currentData[anyKey].length;
            const intervalFn = (commonLength: number) => {
                setIndex((prev) => {
                    const current = prev + 1;
                    if (current >= commonLength) {
                        clearTimeout(intervalIdRef.current);
                        setDataPool(
                            produce((draft) => {
                                /**
                                 * take a snapshot when dataPool have 1 el left, to use as a fallback when dataPool is empty
                                 */
                                if (draft.length === 1) {
                                    currentDataRef.current =
                                        currentImmer(draft[0]);
                                    currentIndexRef.current = prev;
                                }
                                draft.shift();
                                setIsReady(true);
                            })
                        );
                        return 0;
                    } else {
                        intervalIdRef.current = setTimeout(
                            intervalFn,
                            duration / commonLength,
                            commonLength
                        );
                        return current;
                    }
                });
            };

            intervalIdRef.current = setTimeout(
                intervalFn,
                duration / commonLength,
                commonLength
            );
            setIsReady(false);
        }
        return () => {};
    }, [dataPool, duration, isReady]);

    useEffect(
        () => () => {
            clearInterval(intervalIdRef.current);
        },
        []
    );

    return {
        currentData: (dataPool[0] ?? currentDataRef.current) as
            | paramType
            | undefined,
        index: dataPool[0] ? index : currentIndexRef.current,
    };
};
