import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './ImageSlider.module.scss';

interface GalleryProps {
  images: { src: string; alt: string }[];
  interval: number;
}

const ImageGallerySlider: React.FC<GalleryProps> = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true);
    }, 500);
  };

  const prevImage = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 500);
  };

  const startAutoSlide = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      nextImage();
    }, interval);
  }, [interval]);

  useEffect(() => {
    // const timer = setInterval(() => {
    //   nextImage();
    // }, interval);
    // return () => clearInterval(timer);
    startAutoSlide();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startAutoSlide]);

  useEffect(() => {
    startAutoSlide();
  }, [currentIndex, startAutoSlide]);

  //   const sliderClass = fade ? classes.fadeIn : classes.fadeOut + classes.slider;
  return (
    <div className={classes.galleryContainer}>
      <div
        className={`${classes.slider} ${
          fade ? classes.fadeIn : classes.fadeOut
        }`}
      >
        <Image
          className={classes.sliderImage}
          width={1100}
          height={825}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
      </div>

      {/* Navigation buttons */}
      <button onClick={prevImage} className={classes.prevButton}>
        &#10094; {/* Left arrow */}
      </button>
      <button onClick={nextImage} className={classes.nextButton}>
        &#10095; {/* Right arrow */}
      </button>

      {/* Optional: Image indicator */}
      <div className={classes.imageIndicator}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageGallerySlider;
