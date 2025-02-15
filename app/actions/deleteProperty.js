'use server';
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId) =>{
    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }

    const {userId} = sessionUser;

    const property = await Property.findById(propertyId);

    if(!property){
        throw new Error('Property not found');
    }

    //Verify the ownership (owner id needs to match with session user ID)
    if(property.owner.toString() !== userId){
        throw new Error('Unauthorized');
    }


    //Delete images from Cloudinary
    //Get the ID of each image, at the end of the Cloudinary URL
    const imgIds = property.images.map((img) =>{
        const urlArr = img.split('/');
        return urlArr.at(-1).split('.').at(0);
    })

    if(imgIds.length > 0){
        for(const id of imgIds){
            await cloudinary.uploader.destroy('PropertyPulseNext/' + id );
        }
    }

    //Finally, delete the property from MongoDB
    await property.deleteOne();

    revalidatePath('/', 'layout');
}

export default deleteProperty;