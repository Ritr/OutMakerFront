import React from "react";

const Post = ({ id, title, description }) => {
  const createMarkup = () => {
    return { __html: description };
  };

  return (
    <div className="py-4 md:py-10">
      <h2 className="text-2xl md:text-4xl font-medium text-black pb-2 md:pb-6">
        {title}
      </h2>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
};

export default Post;
