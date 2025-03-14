'use server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const Bucket = process.env.AWS_BUCKET_NAME as string;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadProfileImgToS3(img: File) {
  try {
    if (!img) {
      throw Error('이미지가 없습니다.');
    }

    const Body = Buffer.from(await img.arrayBuffer());
    const path = `profile-img/${img.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket,
        Key: path,
        Body,
        ContentType: 'image/jpeg, image/png',
      }),
    );

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${path}`;
    // console.log(url)
    return url;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);

    throw Error('이미지 업로드를 실패했습니다.');
  }
}
