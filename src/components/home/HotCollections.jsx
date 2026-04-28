import React, { useEffect, useState } from "react";

import axios from "axios";

import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";

import "owl.carousel/dist/assets/owl.theme.default.css";

import HotCollection from "../UI/HotCollection";

import Skeleton from "../UI/Skeleton";

import Aos from "aos";

import "aos/dist/aos.css";

Aos.init();

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );

    setHotCollections(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-in" data-aos-duration="700">
                Hot Collections
              </h2>

              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <OwlCarousel
            className="owl-theme"
            loop
            data-aos="fade-up"
            data-aos-duration="700"
            nav
            key={loading}
            dots={false}
            margin={8}
            navText={["<", ">"]}
            responsive={{
              0: { items: 1 },

              572: { items: 2 },

              992: { items: 3 },

              1200: { items: 4 },
            }}
          >
            {loading ? (
              <>
                {new Array(5).fill(0).map((_, i) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ width: "100%", maxWidth: "100%", padding: "0" }}
                    key={i}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" />
                      </div>

                      <div className="nft_coll_pp">
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />

                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_coll_info">
                        <Skeleton width="100px" height="20px" />

                        <br />

                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {hotCollections.map((collection, i) => (
                  <HotCollection
                    nftImage={collection.nftImage}
                    authorImage={collection.authorImage}
                    title={collection.title}
                    code={collection.code}
                    nftId={collection.nftId}
                    authorId={collection.authorId}
                    key={collection.id}
                  />
                ))}
              </>
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
