import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
};

export default Loader;