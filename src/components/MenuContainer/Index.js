import React, { useEffect, useState } from "react";
//GQL
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { GETall, GETmenu } from "../../GraphQL/query";
import MenuCard from "../Card/MenuCard";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
//swiper css
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

//module swiper
import { Pagination } from "swiper";

function MenuContainer() {
  const { data } = useQuery(GETall);
  const [getRes, { data: respond, loading }] = useLazyQuery(GETmenu);
  const [list, setList] = useState([]);
  const [uid, setUID] = useState();

  useEffect(() => {
    setList(data?.menu);
  }, [data?.menu]);

  useEffect(() => {
    setList(respond?.menu);
  }, [respond?.menu]);

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <button onClick={() => getRes({ variables: { _eq: 1 } })}>satu</button>
      <button onClick={() => getRes({ variables: { _eq: 2 } })}>satu</button>
      <button>dua</button>
      <button>tiga</button>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          600: {
            slidesPerView: 5,
          },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="swiper-container"
      >
        {list?.map((i) => {
          return (
            <SwiperSlide>
              <MenuCard
                key={i.id}
                id={i.id}
                title={i.title}
                price={i.price}
                star={i.star}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {loading && <h1>fetching..</h1>}
    </div>
  );
}

export default MenuContainer;
