const S3 = require("aws-sdk/clients/s3")
const dotenv = require('dotenv')
dotenv.config(); 


const uploadImageS3 = async ([file]) => {

    const s3 = new S3 ({
        region: process.env.AWS_BUCKET_REGION, 
        credentials: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY, 
            secretAccessKey: process.env.AWS_S3_SECRET_KEY
        }
    })
    

    const params = {
        Bucket: "communiti-bucket", 
        Key: file.originalname, 
        Body: Buffer.from(file.buffer), 
        ContentType: file.mimetype,
        ACL: 'public-read'
    }
   
    return await s3.upload(params).promise(); 

   
}

module.exports = {
    uploadImageS3
}