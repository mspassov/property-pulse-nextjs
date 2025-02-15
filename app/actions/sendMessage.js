'use server';
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const sendMessage = async (prevState, formData) =>{

    await connectDB();
    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId){
        throw new Error('User ID is required');
    }

    const {user, userId} = sessionUser;

    const recipient = formData.get('recipient');
    const message = new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('message'),
    })

    await message.save();

    return {
        submitted: true
    }
}

export default sendMessage;