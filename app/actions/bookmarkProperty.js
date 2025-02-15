'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const bookmarkProperty = async (propertyId) =>{
    await connectDB();
    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required')
    }

    const {userId} = sessionUser;

    const user = await User.findById(userId);
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if(isBookmarked){
        //If bookmarked, we need to remove it
        user.bookmarks.pull(propertyId)
        message = "Bookmark removed";
        isBookmarked = false;
    }
    else{
        //Add it to the bookmarks
        user.bookmarks.push(propertyId)
        message = "Bookmark added";
        isBookmarked = true;
    }

    await user.save();
    revalidatePath('/properties/saved', 'page')

    return {
        message,
        isBookmarked
    }
}

export default bookmarkProperty;