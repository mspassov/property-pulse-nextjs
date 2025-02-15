'use server';
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId) =>{
    await connectDB();

    const sessionUser = await getSessionUser();
    const {userId} = sessionUser;

    if(!sessionUser || !sessionUser.userId){
        throw new Error('User Id is required')
    }

    const message = await Message.findById(messageId);

    if(!message){
        throw new Error('Message not found');
    }

    //Verify ownership of message
    if(message.recipient.toString() !== userId){
        throw new Error('Unauthorized');
    }

    await message.deleteOne();
}

export default deleteMessage;