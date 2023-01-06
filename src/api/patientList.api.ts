import type { Followers } from "../models/followers.models";

export const fetchFollowers = async (
  token: string = ""
): Promise<Followers> => {
  const res = await fetch(
      "https://globicare-prod-djgdyxgtha-el.a.run.app/followers/request_details?accepted=true&type=FOLLOW_REQUEST",
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
  const data = res.json();
  return data;
};
