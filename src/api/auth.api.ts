import { UserData } from "../models/auth.models";
import { host } from "./host.api";
export const fetchAuth = async (): Promise<UserData> => {
    const res = await fetch(`${host}/auth/login`, {
        headers: {
            Authorization: "Basic Kzg0ODM2NjUwMzc0OjEyMzQ1Ng==",
        },
    });
    if (!res.ok) {
        console.log(`Error happen: status ${res.status}`);
        throw new Error(`Error happen: status ${res.status}`);
    }
    const data = await res.json();
    return data;
};
