import { host } from "./host.api";

type MutateSignUp = {
    userName: string;
    password: string;
    phone: string;
};
type SignUpRes = {
    code: 0 | 1; // 1 === success and opposite
    user_api_key: string; // token dùng để gọi đến api khác
    user_id: string;
    user_name: string;
};

/**
 * Cho phép người dùng đăng kí qua số điện thoại
 * */
export const mutateSignUp = async (info: MutateSignUp) => {
    const res = await fetch(`${host}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });
    if (!res.ok) {
        console.log(`Error happen: status ${res.status}`);
        throw new Error(`Error happen: status ${res.status}`);
    }
    return (await res.json()) as SignUpRes;
};
