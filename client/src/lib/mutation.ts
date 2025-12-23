import axios from "axios";
import { BACKEND_BASEURL } from "./consts";

export const uploadResume = async (file: File, token: string) => {
  try {
    // Uploading the metadata to DB with Status as pending
    const response = await axios.post(
      `${BACKEND_BASEURL}/resume/pre-signed-url`,
      {
        filename: file.name,
        filetype: file.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status.toString().startsWith("4")) {
      console.log("Uploading the metadata to DB FAILED");
      return;
    }
    const { url, resumeId } = response.data;

    // Uploading to S3 from frontend using preSignedUrl
    const uploadToS3 = await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    const status = uploadToS3.status;

    if (status.toString().startsWith("4")) {
      console.log("Uploading to S3 FAILED");
      return;
    }

    // Updating the status in db
    const updateDb = await axios.put(
      `${BACKEND_BASEURL}/resume/upload`,
      {
        resumeId,
        status: status.toString(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (updateDb.status.toString().startsWith("4")) {
      console.log("Updating to DB FAILED");
      return;
    }

    return resumeId;
  } catch (error) {
    console.log(error);
  }
};
