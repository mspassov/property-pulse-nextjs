"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageRead from "@/app/actions/markMessageRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MsgCard = ({ msg }) => {
  const [isRead, setIsRead] = useState(msg.read);
  const [isDelete, setDelete] = useState(false);

  const { unreadCount, setUnread } = useGlobalContext();

  const handleRead = async () => {
    const read = await markMessageRead(msg._id);

    setIsRead(read);
    setUnread((prevState) => (read ? prevState - 1 : prevState + 1));
    toast.success(`Marked as ${read ? "read" : "new"}`);
  };

  const handleDelete = async () => {
    await deleteMessage(msg._id);
    setDelete(true);
    setUnread((prevState) => prevState - 1);
    toast.success("Message Deleted");
  };

  if (isDelete) {
    return <p>Message Deleted</p>;
  }

  return (
    <div className="relative bg-white rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl m-4">
        <span className="font-bold">Property Inquiry: </span>{" "}
        {msg.property.name}
      </h2>
      <p className="text-gray-700 ml-4">{msg.body}</p>
      <ul className="mt-4 ml-4">
        <li>
          <strong>Reply Email: </strong>{" "}
          <a href={`mailto:${msg.email}`} className="text-blue-500">
            {msg.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>{" "}
          <a href={`tel:${msg.phone}`} className="text-blue-500">
            {msg.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>{" "}
          {new Date(msg.createdAt).toLocaleDateString()}
        </li>
      </ul>
      <button
        onClick={handleRead}
        className="mt-4 mr-3 ml-4 mb-4 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as Unread" : "Mark as Read"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 mb-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MsgCard;
