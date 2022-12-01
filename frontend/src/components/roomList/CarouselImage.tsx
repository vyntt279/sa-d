import React from 'react';
import { Carousel } from 'antd';

type CarouselProps = {
  images: string[]
}

const styleCarousel = {
  width: "400px",
}

const CarouselImage = ({ images }: CarouselProps) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <div style={styleCarousel}>
      <Carousel autoplay variableWidth>
        {images.map(
          (image: string, index: number) => {
            return (
              <div>
                <img
                  width={"400px"}
                  alt="logo"
                  src={image}
                  key={index}
                />
              </div>
            )
          }
        )}
      </Carousel>
    </div>
  );
};

export default CarouselImage;