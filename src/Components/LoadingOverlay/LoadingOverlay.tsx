import React, { useEffect, useState } from "react";
import loadingGif from "../../assets/images/army-loading.gif";

const LoadingOverlay: React.FC = () => {
  // Define the state type
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    // Set a timer to display loading state 2 seconds after page reload
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 1000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  if (!showLoading) return null; // Hide overlay until timer completes

  return (
    <div className="loading-overlay">
      <img src={loadingGif} alt="Loading..." className="loading-gif" />
    </div>
  );
};

export default LoadingOverlay;
