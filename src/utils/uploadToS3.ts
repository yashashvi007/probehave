import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'AKIA4U2PSNBQCEVIT7WQ',
  secretAccessKey: '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',
  region: 'ap-south-1'
});


export const uploadToS3 =async (file : any) => {
    const filename = file.name;
    const uploadParams = {
      Bucket: 'probehave',
      Key: `${Math.random()*100000}/${filename}`,
      Body: file
    };
    try {
      const response = await s3.upload(uploadParams).promise();
      return response.Location
    } catch (error) {
      console.log("error" , error);
    }
}

import { S3 } from "@aws-sdk/client-s3";

export async function deleteObjectFromS3(objectUrl : any) {
  // Extract object key from URL
  const objectKey = objectUrl.split("/").pop();

  // Create S3 client and delete object
  const s3 = new S3({ region: "ap-south-1" });
  const params = { Bucket: "probehave", Key: objectKey };
  const response = await s3.deleteObject(params)
  console.log("Response:", response);
  
  return response;
}