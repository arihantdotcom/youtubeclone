import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadoncloudinary =async (localfile)=>{
    try {
        if(!localfile) return mull;
        //upload file on coludnary
    const response = await cloudinary .uploader.upload(localfile,{
            resource_type:"auto"
        })
        return response;
    } catch (error) {
        fs.unlinkSync(localfile) //remove file from local storage
        return null;
    }
}




cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });


  export {uploadoncloudinary}

  