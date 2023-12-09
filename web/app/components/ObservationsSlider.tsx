import Slider from "react-slick";
import { type Observation } from "../entities/Observation.ts";
import { ObservationItem } from "./ObservationItem";

interface ObservationsSliderProps {
  observations: Observation[];
}

const carouselConfig = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: false,
};

export function ObservationsSlider({ observations }: ObservationsSliderProps) {
  return (
    <Slider {...carouselConfig} className="h-[90%]">
      {observations.map((observation) => (
        <ObservationItem observation={observation} key={observation.id} />
      ))}
    </Slider>
  );
}
