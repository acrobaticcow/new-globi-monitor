import { FC } from "react";
import {
    UserGroupIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

interface GeneralInfoProps {}

export const GeneralInfo: FC<GeneralInfoProps> = () => {
    return (
        <div className="flex h-full w-full flex-col justify-between rounded-md bg-neutral-500 px-4 py-3 inner-border inner-border-neutral-300">
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <p className="">
                        <UserGroupIcon className="mr-2 inline-block h-5 w-5 align-middle text-neutral-100/50" />
                        <span className="align-middle leading-none text-neutral-100/90">
                            Số bệnh nhân theo dõi :{" "}
                        </span>
                    </p>
                    <p className="text-base font-semibold leading-none">
                        230
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p>
                        <CheckCircleIcon className="mr-2 inline-block h-5 w-5 align-middle text-success-400/50" />
                        <span className="align-middle leading-none text-success-100">
                            Số bệnh nhân trực tuyến :
                        </span>
                    </p>
                    <p className="align-baseline text-base font-semibold leading-none text-success-400">
                        50 /{" "}
                        <span className="align-baseline text-sm leading-none text-success-400/75">
                            230
                        </span>
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p>
                        <ExclamationCircleIcon className="mr-2 inline-block h-5 w-5 align-middle text-danger-400/50" />
                        <span className="align-middle leading-none text-danger-100">
                            Số bệnh nhân cảnh báo :
                        </span>
                    </p>
                    <p className="align-baseline text-base font-semibold leading-none text-danger-400">
                        4 /{" "}
                        <span className="align-baseline text-sm leading-none text-danger-400/75">
                            230
                        </span>
                    </p>
                </div>
            </div>
            <div>
                <div className="border-b border-neutral-100/95 pb-3">
                    <h4 className="mb-1 font-bold leading-none">
                        Thông tin bệnh viện
                    </h4>
                    <p className="text-sm text-neutral-100/75">
                        Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Facilis, doloribus. Lorem
                        ipsum dolor sit amet consectetur, adipisicing
                        elit. Facilis, doloribus.
                    </p>
                </div>
                <div className="mt-2 flex items-center gap-x-2 text-sm">
                    <div className="basis-9/12">
                        <a
                            className="group block"
                            href="mailto:prm@vijases.com"
                        >
                            <span className="mr-0.5 text-neutral-100/75">
                                Email
                            </span>{" "}
                            <span className="font-medium text-neutral-100 underline-offset-1 group-hover:underline">
                                prm@vijases.com
                            </span>
                        </a>
                        <a
                            className="group block"
                            href="tel:+84942798468"
                        >
                            <span className="mr-0.5 text-neutral-100/75">
                                Hotline
                            </span>{" "}
                            <span className="font-medium text-neutral-100 underline-offset-1 group-hover:underline">
                                +84 942 798 468
                            </span>
                        </a>
                        <p>
                            Một sản phẩm của công ty TNHH thiết bị
                            Khoa học và Dịch vụ Việt Nhật
                        </p>
                    </div>
                    <div className="basis-4/12 pl-12">
                        <img
                            className="h-full w-full object-cover object-center"
                            src="/img/logo-Globicare-goc-doc-trang.svg"
                            alt="logo Globicare"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
