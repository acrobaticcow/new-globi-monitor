import { Transition } from "@headlessui/react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export type scrollVisibilityApiType = React.ContextType<
    typeof VisibilityContext
>;
export function LeftArrow() {
    const { isFirstItemVisible, scrollToItem, getPrevElement } =
        useContext(VisibilityContext);
    const handleClick = () => {
        scrollToItem(getPrevElement(), "smooth", "start");
    };

    return (
        <Transition
            unmount={false}
            show={!isFirstItemVisible}
            enter="transition-opacity ease-in duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-y-0 left-0.5 z-30 flex items-center"
        >
            <button
                className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-neutral-300 bg-neutral-300/5 bg-noise shadow-neutral-600 backdrop-blur-sm shadow-md"
                onClick={() => handleClick()}
            >
                <ArrowLeftIcon className="h-6 w-6 stroke-neutral-100/80" />
            </button>
        </Transition>
    );
}
export function RightArrow() {
    const { isLastItemVisible, scrollToItem, getNextElement } =
        useContext(VisibilityContext);
    const handleClick = () => {
        scrollToItem(getNextElement(), "smooth", "end");
    };
    return (
        <Transition
            unmount={false}
            as="div"
            show={!isLastItemVisible}
            enter="transition-opacity ease-in duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-y-0 right-0.5 z-30 flex items-center"
        >
            <button
                className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-neutral-300 bg-neutral-300/5 bg-noise shadow-neutral-600 backdrop-blur-sm shadow-md"
                onClick={() => handleClick()}
            >
                <ArrowRightIcon className="h-6 w-6 stroke-neutral-100/80" />
            </button>
        </Transition>
    );
}

export function onWheel(
    apiObj: scrollVisibilityApiType,
    ev: React.WheelEvent
): void {
    const { scrollToItem, getNextElement, getPrevElement } = apiObj;
    const isThouchpad =
        Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    const scrollNext1Item = () => {
        scrollToItem(getNextElement(), "smooth", "end");
    };
    const scrollPrev1Item = () => {
        scrollToItem(getPrevElement(), "smooth", "start");
    };

    if (isThouchpad) {
        ev.stopPropagation();
        return;
    }

    if (ev.deltaY < 0) {
        scrollNext1Item();
    } else if (ev.deltaY > 0) {
        scrollPrev1Item();
    }
}
