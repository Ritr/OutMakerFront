import React from 'react';

const options = () => {
    return (
        <div>
             <div className="block md:flex items-center my-10">
          {/* Materials */}
          <div className="">
            <h3 className="text-xl font-normal">Accessories</h3>
            <div className="flex gap-4 pt-2">
              <div className="text-center">
                <img
                  src={color1}
                  alt=""
                  className={`h-9 w-9 mx-auto p-1 cursor-pointer ${
                    selectedImage === "brown"
                      ? "border-2 border-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedImage("brown")}
                />
                <p className="text-xs text-[#666666] font-normal">
                  Brown <br /> Wicker
                </p>
              </div>
              <div className="text-center">
                <img
                  src={color2}
                  alt=""
                  className={`h-9 w-9 mx-auto p-1 cursor-pointer ${
                    selectedImage === "black"
                      ? "border-2 border-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedImage("black")}
                />
                <p className="text-xs text-[#666666] font-normal">
                  Black <br /> Wicker
                </p>
              </div>
              <div className="text-center">
                <img
                  src={color3}
                  alt=""
                  className={`h-9 w-9 mx-auto p-1 cursor-pointer ${
                    selectedImage === "white"
                      ? "border-2 border-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedImage("white")}
                />
                <p className="text-xs text-[#666666] font-normal">
                  White <br />
                  Aluminum
                </p>
              </div>
            </div>
          </div>
          <div className="w-0 md:w-[1px] h-11 bg-black mx-0 md:mx-8"></div>
          {/* Accessories */}
          <div className="">
            <h3 className="text-xl font-normal">Accessories</h3>
            <div className="flex gap-4 pt-2">
              <div className="text-center">
                <img
                  src={color5}
                  alt=""
                  className={`h-9 w-9 mx-auto p-1 cursor-pointer ${
                    selectedImage === "brown"
                      ? "border-2 border-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedImage("brown")}
                />
                <p className="text-xs text-[#666666] font-normal">
                  Brown <br /> Wicker
                </p>
              </div>
              <div className="text-center">
                <img
                  src={color6}
                  alt=""
                  className={`h-9 w-9 mx-auto p-1 cursor-pointer ${
                    selectedImage === "black"
                      ? "border-2 border-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedImage("black")}
                />
                <p className="text-xs text-[#666666] font-normal">
                  Black <br /> Wicker
                </p>
              </div>
              <div className="text-center">
                <img
                  src={color7}
                  alt=""
                  className={`h-9 w-9 mx-auto p-1 cursor-pointer ${
                    selectedImage === "white"
                      ? "border-2 border-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedImage("white")}
                />
                <p className="text-xs text-[#666666] font-normal">
                  White <br />
                  Aluminum
                </p>
              </div>
              <div className="text-center">
                <img
                  src={color8}
                  alt=""
                  className={`h-9 w-9 mx-auto p-1 cursor-pointer ${
                    selectedImage === "charcoal"
                      ? "border-2 border-black rounded-full"
                      : ""
                  }`}
                  onClick={() => setSelectedImage("charcoal")}
                />
                <p className="text-xs text-[#666666] font-normal">
                  Charcoal <br />
                  Aluminum
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
};

export default options;