import React from "react";

const SkeletonPlaceholder = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-full w-full rounded-lg"></div>{" "}
      {/* 高度和宽度设置为满屏 */}
      <div className="mt-2 h-4 bg-gray-300 rounded"></div>
      <div className="mt-1 h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

export default SkeletonPlaceholder;
