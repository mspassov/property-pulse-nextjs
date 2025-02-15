import React from "react";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MsgCard from "@/components/MsgCard";

const MessagePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const msgArray = [...unreadMessages, ...readMessages].map((msg) => {
    const message = convertToSerializableObject(msg);
    message.sender = convertToSerializableObject(msg.sender);
    message.property = convertToSerializableObject(msg.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {msgArray.length == 0 ? (
              <p>You have no messages</p>
            ) : (
              msgArray.map((msg) => <MsgCard msg={msg} key={msg._id} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
