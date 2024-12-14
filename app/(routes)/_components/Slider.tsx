"use client";
import { getSliders } from "@/actions/getSliders";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import SliderSkeleton from "./Skeleton/SliderSkeleton";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const sliders = await getSliders();
        setSliders(sliders);
      } catch (error) {
        console.error("Failed to fetch sliders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  return (
    <div>
      {loading ? (
       <SliderSkeleton/>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {sliders.map((slider) => (
              <CarouselItem key={slider.id}>
                {" "}
                <Link href={slider.url}>
                  <Image
                    alt="slider"
                    unoptimized={true}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${
                      slider?.media?.formats?.large?.url ||
                      slider?.media?.formats?.medium?.url
                    }`}
                    width={1000}
                    height={571}
                    className="w-full h-[200px] md:h-[450px] object-cover"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      )}
    </div>
  );
};

export default Slider;
