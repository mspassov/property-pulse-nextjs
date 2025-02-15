'use server';
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const getUnreadCount = async () =>{
    await connectDB();

    const sessionUser = await getSessionUser();
    const {userId} = sessionUser;

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User Id is required')
    }

    const count = await Message.countDocuments({
        recipient: userId,
        read: false
    });

    return count;
}

export default getUnreadCount;