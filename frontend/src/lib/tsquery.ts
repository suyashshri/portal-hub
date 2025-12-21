import axios from "axios";
import { BACKEND_BASEURL } from "./consts";

export const getResume = async (userId: string, token: string) => {
  try {
    const data = await axios.get(`${BACKEND_BASEURL}/resume/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
