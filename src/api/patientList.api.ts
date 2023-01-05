import type { Followers } from "../models/followers.models";
import { host } from "./host.api";

interface Options {
    size: number;
    index: number;
}
export const fetchFollowers = async (
    token: string = "",
    { index, size }: Options = { index: 1, size: 20 }
): Promise<Followers> => {
    const res = await fetch(
        `${host}/users?page_size=${size}&page_id=${index}'`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        console.log(`Error happen: status ${res.status}`);
        throw new Error(`Error happen: status ${res.status}`);
    }
    const data = await res.json();
    return data;
};
