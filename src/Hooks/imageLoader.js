import { useState, useEffect } from 'react';

const useImageLoader = (imageUrl) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            setImageLoaded(true);
        };

        return () => {
            // 清除事件处理程序，避免内存泄漏
            image.onload = null;
        };
    }, [imageUrl]);

    return imageLoaded;
};

export default useImageLoader;
