import { UserData } from "../models/auth.models";
export const fetchAuth = async (): Promise<UserData> => {
  const res = await fetch(
    "https://covi-life-djgdyxgtha-el.a.run.app/auth/web/login",
    {
      headers: {
        fcm_token: "test4",
        Authorization: "Basic Kzg0OTczOTgxMjA0OjEyMzQ1Ng==",
      },
    }
  );
  if (!res.ok) {
    console.log(`Error happen: status ${res.status}`);
    throw new Error(`Error happen: status ${res.status}`);
  }
  const data = res.json();
  return data;
};
