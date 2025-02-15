"use client";
import React from "react";
import { FaBook, FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import loadBookmarkStatus from "@/app/actions/loadBookmarkStatus";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const BookmarkBtn = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleBookmarkLoad = async () => {
    try {
      const res = await loadBookmarkStatus(property._id);
      if (res.isBookmarked) {
        setBookmarked(true);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const res = handleBookmarkLoad();
    setLoading(false);
  }, [property._id, userId, loadBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please log in to bookmark a property");
      return;
    }

    try {
      const res = await bookmarkProperty(property._id);
      setBookmarked(res.isBookmarked);
      toast.success(res.message);
    } catch (error) {
      toast.error(res.message);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkBtn;
