import React from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Property Pulse | Home",
  keywords: "Real estate, rentals, houses"
};

const layout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
