"use client";

import Slider from "react-slick";
import { ObservationItem } from "./ObservationItem";
import { useHospitalProcedure } from "@/contexts/HospitalProcedure.context";

const carouselConfig = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: false,
};

export function ObservationsSlider() {
  const { hospitalProcedure } = useHospitalProcedure();

  if (!hospitalProcedure) {
    return null;
  }

  return (
    <Slider {...carouselConfig} className="h-[90%]">
      {hospitalProcedure.observations.map((observation) => (
        <ObservationItem observation={observation} key={observation.id} />
      ))}
    </Slider>
  );
}
