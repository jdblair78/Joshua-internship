import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const HotCollections = () => {
  const [collection, setCollection] = useState([]);
  const swiperRef = useRef(null);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    setCollection(data);
    console.log(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <div className="carousel__header">
                <h2>Hot Collections</h2>
                <div className="carousel__arrows">
                  <button onClick={() => swiperRef.current.slidePrev()}>
                    <FontAwesomeIcon
                      className="font__arrows"
                      icon={faChevronLeft}
                    />
                  </button>
                  <button onClick={() => swiperRef.current.slideNext()}>
                    <FontAwesomeIcon
                      className="font__arrows"
                      icon={faChevronRight}
                    />
                  </button>
                </div>
              </div>

              <Swiper
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={20}
                slidesPerView={4}
                navigation={false}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  576: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {collection.slice(0, 6).map((item) => (
                  <SwiperSlide>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to="/author">
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">5h 30m 32s</div>
                      <div className="nft__item_wrap">
                        <Link to="/item-details">
                          <img
                            src={item.nftImage}
                            className="nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>{" "}
          {/* col-lg-12 */}
        </div>{" "}
        {/* row */}
      </div>{" "}
      {/* container */}
    </section>
  );
};

export default HotCollections;
