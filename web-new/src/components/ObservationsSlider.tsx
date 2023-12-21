"use client";

import Slider from "react-slick";
import { ObservationItem } from "./ObservationItem";
import { Observation } from "@/entities/Observation";

const carouselConfig = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: false,
};

interface ObservationsSliderProps {
  observations: Observation[];
}

export function ObservationsSlider({ observations }: ObservationsSliderProps) {
  if (!observations.length) {
    return null;
  }

  return (
    <Slider {...carouselConfig} className="h-[90%]">
      {observations.map((observation) => (
        <ObservationItem observation={observation} key={observation.id} />
      ))}
    </Slider>
  );
}
