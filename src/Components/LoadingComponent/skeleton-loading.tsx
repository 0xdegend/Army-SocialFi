import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col space-y-4 w-full mt-5">
      <div className="bg-green-200 h-8 w-full animate-pulse "></div>
      <div className="bg-green-200 h-8 w-full animate-pulse"></div>
      {/* <div className="bg-green-200 h-8 w-full animate-pulse"></div>
      <div className="bg-green-200 h-8 w-full animate-pulse"></div> */}
    </div>
  );
};

export default LoadingComponent;
