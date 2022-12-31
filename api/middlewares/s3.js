const S3 = require("aws-sdk/clients/s3")
const dotenv = require('dotenv')
dotenv.config(); 


const uploadImageS3 = async ([file]) => {

    const s3 = new S3 ({
        region: process.env.AWS_BUCKET_REGION, 
        credentials: {
            accessKeyId: "AKIASVKYMP4Q6MFBSQVT", 
            secretAccessKey: "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"
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