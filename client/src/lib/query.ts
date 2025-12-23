import axios from "axios";
import { BACKEND_BASEURL } from "./consts";

export const getResume = async (token: string) => {
  try {
    const response = await axios.get(`${BACKEND_BASEURL}/resume`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
