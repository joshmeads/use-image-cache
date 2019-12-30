import React, { useState, useEffect } from 'react';

export const useImageCache = (config) => {
  const [ images, setImages ] = useState({});
  const clearCache = () => setImages({});

  const setCache = (x) => {
    const isArray = Array.isArray(x);

    if (!isArray && typeof x !== 'string') {
      return console.error('[use-image-cache] Invalid src type');
    }

    const baseSet = new Set([...Object.keys(images), ...(isArray ? x : [x])]);
    baseSet.forEach((src) => {
      if (images[src]) return null;
      const img = new Image();
      img.onload = () => setImages(
        {
          ...images,
          [src]: {
            src,
            width: img.width,
            height: img.height,
          },
        }
      );
      return img.src = src;
    });
  }

  useEffect(() => setCache(config), [config]);
  return [images, setCache, clearCache];
};

export default useImageCache;
