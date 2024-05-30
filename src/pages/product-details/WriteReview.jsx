import { Rating } from "@smastrom/react-rating";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

const WriteReview = ({ isReviw, id }) => {
  const [rating, setRating] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const fileInputLabelRef = useRef(null);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...files]);

    // 更新文件选择标签的文本
    const fileLabelText = files.length
      ? `${files.length} file(s) selected`
      : "Choose files";
    fileInputLabelRef.current.textContent = fileLabelText;
  };

  const clearSelectedFiles = () => {
    setSelectedFiles([]);
    fileInputRef.current.value = ""; // 清空文件输入字段
    fileInputLabelRef.current.textContent = "Choose files"; // 重置标签文本
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  // form submit functionalities
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("product_id", id);
    formData.append("rating", rating);
    formData.delete("comment_images[]");
    selectedFiles.forEach((file) => {
      formData.append("comment_images[]", file);
    });

    uploadReview(formData, e);
  };

  const uploadReview = (data, e) => {
    setIsLoading(true);
    let url = `https://api.theoutmaker.com/api/product/single/comment/store`;

    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Successfully Submitted!");
        e.target.reset();
        setRating(0);
        clearSelectedFiles();
      })
      .catch((error) => {
        toast.error("There was a problem submitting your review.");
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // form submit functionalities
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const question = form.question.value;
  };

  return (
    <>
      {isReviw ? (
        <div className="p-5">
          <div className="mb-2">
            <p className="text-lg mb-2">
              <span className="text-red-500">*</span>
              <span>Rating:</span>
            </p>
            <Rating
              style={{ maxWidth: 120 }}
              value={rating}
              onChange={setRating}
              isRequired
            />
          </div>
          <form onSubmit={handleReviewSubmit}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 w-full lg:w-4/6">
              <div className="flex-1 mb-2">
                <p className="text-lg mb-2">
                  <span className="text-red-500">*</span>
                  <span>Name:</span>
                </p>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered border-primary rounded-full w-full"
                />
              </div>
              <div className="flex-1 mb-2">
                <p className="text-lg mb-2">
                  <span className="text-red-500">*</span>
                  <span>Email:</span>
                </p>
                <input
                  required
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered border-primary rounded-full w-full"
                />
              </div>
            </div>
            <div className="mb-2">
              <p className="text-lg mb-2">
                <span className="text-red-500">*</span>
                <span>Title:</span>
              </p>
              <input
                required
                type="text"
                name="title"
                placeholder="Title"
                className="input input-bordered border-primary rounded-full w-full lg:w-4/6"
              />
            </div>
            <div className="mb-2">
              <p className="text-lg mb-2">
                <span className="text-red-500">*</span>
                <span>Review:</span>
              </p>
              <textarea
                required
                name="comment"
                className="textarea textarea-bordered border-primary w-full lg:w-4/6"
                placeholder="Review"
              ></textarea>
            </div>
            <div className="mb-2">
              <p className="text-lg mb-2">
                <span className="text-red-500">*</span>
                <span>Picture:</span>
              </p>
              <label
                ref={fileInputLabelRef}
                htmlFor="file-input"
                className="btn btn-outline btn-primary cursor-pointer"
              >
                Choose files
              </label>
              <input
                id="file-input"
                ref={fileInputRef}
                type="file"
                name="comment_images[]"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />

              {selectedFiles.length > 0 && (
                <button
                  type="button"
                  onClick={clearSelectedFiles}
                  className="btn btn-outline btn-error ml-2"
                >
                  Clear Images
                </button>
              )}
            </div>

            <button
              className="btn btn-primary text-white"
              disabled={!rating || isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <div className="p-5">
          <form onSubmit={handleQuestionSubmit}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 w-full lg:w-4/6">
              <div className="flex-1 mb-2">
                <p className="text-lg mb-2">
                  <span className="text-red-500">*</span>
                  <span>Name:</span>
                </p>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered border-primary rounded-full w-full"
                />
              </div>
              <div className="flex-1 mb-2">
                <p className="text-lg mb-2">
                  <span className="text-red-500">*</span>
                  <span>Email:</span>
                </p>
                <input
                  required
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered border-primary rounded-full w-full"
                />
              </div>
            </div>
            <div className="mb-2">
              <p className="text-lg mb-2">
                <span className="text-red-500">*</span>
                <span>Review:</span>
              </p>
              <textarea
                required
                name="question"
                className="textarea textarea-bordered border-primary   w-full lg:w-4/6"
                placeholder="Question"
              ></textarea>
            </div>
            <button className="btn btn-primary text-white">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default WriteReview;
