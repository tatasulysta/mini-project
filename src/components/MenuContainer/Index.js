import React from "react";
import MenuCard from "../Card/MenuCard";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
//swiper css
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

//module swiper
import { Pagination } from "swiper";

function MenuContainer(props) {
  return (
    <div className="menu-container">
      <Swiper
        breakpoints={{
          350: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 3,
          },
          1023: {
            slidesPerView: 3,
          },
          1279: {
            slidesPerView: 5,
          },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="swiper-container"
      >
        {props.data?.map((i) => {
          return (
            <SwiperSlide key={i.id}>
              <MenuCard
                key={i.id}
                id={i.id}
                title={i.title}
                price={i.price}
                star={i.star}
                show={props.show}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default MenuContainer;
