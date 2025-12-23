import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: process.env.AWS_REGION,
});

export const putObject = async (key: string, filetype: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: filetype,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 120 });

  return uploadUrl;
};
