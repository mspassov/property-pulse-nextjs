'use server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const addProperty = async (formData) =>{

    await connectDB();
    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }

    const {user, userId} = sessionUser;

    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images')
        .filter((image) => image.name != '' )

    const propertyData = {
        owner: userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location:{
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates:{
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
        },
        seller_info:{
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
    }

    //Upload images to Cloudinary
    const imageUrls = [];

    for (const file of images){
        const imgBuffer = await file.arrayBuffer();
        const imgArray = Array.from(new Uint8Array(imgBuffer));
        const imgData = Buffer.from(imgArray);

        //convert to base64
        const imgBase64 = imgData.toString('base64');

        //make request to Cloudinary
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imgBase64}`, {folder: 'PropertyPulseNext'})

        imageUrls.push(result.secure_url);
    }

    propertyData.images = imageUrls;

    const newProperty = new Property(propertyData);
    console.log(newProperty);
    await newProperty.save();

    revalidatePath('/', 'layout');

    redirect(`/properties/${newProperty._id}`)

}

export default addProperty;