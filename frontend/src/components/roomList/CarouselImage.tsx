import React from 'react';
import { Carousel, Image } from 'antd';

type CarouselProps = {
  images?: string[]
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
        {images?.map(
          (image: string, index: number) => {
            return (
              <div>
                <img
                  width={"400vw"}
                  alt="logo"
                  src={image}
                  key={index}
                  className="rounded-lg"
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