import React from "react";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

const SavedPage = async () => {
  const { userId } = await getSessionUser();

  const user = await User.findById(userId).populate("bookmarks");
  const { bookmarks } = user;

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length == 0 ? (
          <p>No Saved Properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((bookmark, index) => (
              <PropertyCard key={index} property={bookmark} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPage;
