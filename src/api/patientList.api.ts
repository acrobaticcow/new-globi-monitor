import type { Followers } from "../models/followers.models";

export const fetchFollowers = async (): Promise<Followers> => {
  const res = await fetch(
    "https://covi-life-djgdyxgtha-el.a.run.app/followers/request_details?accepted=true&type=FOLLOW_REQUEST'",
    {
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NzI4OTM0NjQ3OTQuMzU5LCJpYXQiOjE2NzAzMDE0NTk3OTQuMzcyLCJzdWIiOiI2MzVlMzg5Ni02ZWM2LTExZWQtOTMwNy02ZmZlYWViNGQ3ZTEiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImZjbV90b2tlbiI6ImRIZHp2eW9xUm5XSm1MMDZoLTJGSmY6QVBBOTFiR25aeE8tY00xaFkxcU0zSDF0R0NXYnVETmlKTlhIWGJCN1dvVWpjM2pVNmpnOVh6VTEydmNUazRrVWxESEhYdUV4OTVQSEYzOFBEUkZyTHEtQzR2TWRPNV9YLUhYTjhYUC1ac2hLaXA5VmxNNTRPQmhiMFlQbHZVai1OT1NaUnF0eTdFbWEifQ.T-7KCoWFsH2yNmAf4zTNRlBEEdYfF3bc0eQuntVZTd8",
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
