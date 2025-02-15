// Must be called this naming convention
"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingPage = () => {
  const override = {
    display: "block",
    margin: "100px auto",
  };

  return <ClipLoader color="#3b82f6" cssOverride={override} size={150} />;
};

export default LoadingPage;
