"use client";

import { useEffect, useState } from "react";
import styles from "./singleSpace.module.css";
import { getOneSpace } from "@/fetchData/spaces";
import Image from "next/image";
import { GalleryModal } from "../galleryModal/galleryModal";
import { Avatar, Rating } from "@mui/material";
import Location from "./location";
import Loading from "../loading/loading";
import { ImageModal } from "../galleryModal/imageModal";
import { ServicesModal } from "../servicesModal/servicesModal";
import { AmenityModal } from "../amenityModal/amenityModal";
import { getRatingsBySapce } from "@/fetchData/rating";
import { RulesModal } from "../rulesModal/rulesModal";
import { RateModal } from "../rateModal/rateModal";
import DoneModal from "../doneModal/doneModal";
import useAlertStore from "@/zustand/alertStore";
import { AllRatingsModal } from "../allRatings/allRatings";

export default function SingleSpace({ id }) {
  const { alertData } = useAlertStore();

  const [loading, setLoading] = useState(true);
  const [openGallery, setOpenGallery] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [showMoreRules, setShowMoreRules] = useState(false);
  const [showMoreRatings, setShowMoreRatings] = useState(false);
  const [groupedAmenities, setGroupedAmenities] = useState([]);
  const [openAddRating, setOpenAddRating] = useState(false);
  const [success, setSuccess] = useState({});
  const [openImage, setOpenImage] = useState({
    open: false,
    src: "",
  });
  const [openNote, setOpenNote] = useState(false);
  const [space, setSpace] = useState({});
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getOneSpace({ id });
      setSpace(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRatings = async () => {
      const res = await getRatingsBySapce({ id });
      setRatings(res.data);
    };

    fetchRatings();
  }, [success]);

  const images = [
    { src: "/ownerSection.jpg" },
    { src: "/workHero.jpg" },
    { src: "/userSection.jpg" },
    { src: "/hero2.jpg" },
    { src: "/teamHero.jpg" },
  ];

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateObj = new Date(date);
    const localDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    ); // Adjust for timezone offset
    return localDate.toLocaleDateString("en-GB", options);
  };

  // Group amenities by category
  useEffect(() => {
    if (
      space !== null &&
      space !== undefined &&
      space.amenities !== null &&
      space.amenities !== undefined
    ) {
      const groupedAmenitie = space.amenities.reduce((acc, amenity) => {
        if (!acc[amenity.category]) {
          acc[amenity.category] = [];
        }
        acc[amenity.category].push(amenity);
        return acc;
      }, {});

      setGroupedAmenities(groupedAmenitie);
    }
  }, [space]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading width={"90vw"} height={"50vh"} />
      ) : (
        <>
          <div className={styles.grid_Gallery}>
            {images &&
              images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.grid_Item} ${
                      styles[`grid_Item${index + 1}`]
                    }`}
                  >
                    <Image
                      src={image.src}
                      width={200}
                      height={200}
                      alt={`image-${index}`}
                      className={`${styles.img}  ${styles[`img${index + 1}`]}`}
                      onClick={() =>
                        setOpenImage({
                          open: true,
                          src: image.src,
                        })
                      }
                    />
                    <button
                      className={`${styles.openModal} ${
                        styles[`openModal${index + 1}`]
                      }`}
                      onClick={() => setOpenGallery(true)}
                    >
                      view more
                    </button>
                  </div>
                );
              })}
          </div>
          <div className={styles.info_container}>
            <div className={styles.info_holder}>
              <div className={styles.title}>
                <h1 className={styles.h1}>{space && space.name}</h1>
                <p className={styles.rate}>
                  ⭐{parseFloat(space.averageRating).toFixed(2) + " "}
                  <span>{` (${space && space.ratings.length} reviews)`}</span>
                </p>
              </div>
              <div className={styles.descritpion}>
                <p className={styles.desc_P}>{space && space.description}</p>
              </div>
              <div className={styles.user}>
                <Avatar
                  src={space.user.image}
                  alt={space.user.fullName}
                  className={styles.user_Avatar}
                />
                <div className={styles.user_section}>
                  <p className={styles.user_Name}>
                    Owned By : {space.user.fullName}
                  </p>
                  <p className={styles.joinDate}>
                    Joined since : {formatDate(space.user.createdAt)}
                  </p>
                </div>
              </div>

              <div className={styles.amenities}>
                <p className={styles.div_Title}>What this place offer</p>
                <ul className={styles.amenity_Holder}>
                  {space &&
                    space.amenities.slice(0, 9).map((amenity, index) => {
                      return (
                        <li key={index} className={styles.amenity_Li}>
                          <Image
                            className={styles.amenity_Image}
                            width={200}
                            height={200}
                            alt={amenity.name}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}images/${amenity.image}`}
                          />
                          <p className={styles.amenity_Name}>{amenity.name}</p>
                        </li>
                      );
                    })}
                </ul>
                {/* {space && space.amenities.length > 9 && ( */}
                <span className={styles.showMore}>
                  <button
                    className={styles.showMoreButton}
                    onClick={() => setShowMoreAmenities(true)}
                  >
                    Show more
                  </button>
                </span>
                {/* )} */}
              </div>
              <div className={styles.amenities}>
                <p className={styles.div_Title}>Space Rules</p>
                <ul className={styles.amenity_Holder}>
                  {space &&
                    space.rules.slice(0, 9).map((rule, index) => {
                      return (
                        <li key={index} className={styles.amenity_Li}>
                          <Image
                            className={styles.amenity_Image}
                            width={200}
                            height={200}
                            alt={rule.name}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}images/${rule.image}`}
                          />
                          <p className={styles.amenity_Name}>{rule.name}</p>
                        </li>
                      );
                    })}
                </ul>
                {/* {space && space.amenities.length > 9 && ( */}
                <span className={styles.showMore}>
                  <button
                    className={styles.showMoreButton}
                    onClick={() => setShowMoreRules(true)}
                  >
                    Show more
                  </button>
                </span>
                {/* )} */}
              </div>
              <div className={styles.location}>
                <p className={styles.div_Title}>Location</p>
                <p className={styles.desc_P}>{space.city.city}</p>
                <Location
                  longitude={space && space.longitude}
                  latitude={space && space.latitude}
                />
              </div>
              <div className={styles.services}>
                <p className={styles.div_Title}>Services</p>
                <ul className={styles.service_Ul}>
                  {space &&
                    space.allServices.slice(0, 3).map((service, index) => {
                      return (
                        <li key={index} className={styles.service_Li}>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_PATH}/images/${service.image}`}
                            className={styles.service_Image}
                            width={100}
                            height={100}
                            alt={service.name}
                          />
                          <p className={styles.service_Name}>{service.name}</p>
                          <p className={styles.service_Description}>
                            {service.description}
                          </p>
                          <ul className={styles.service_Price}>
                            <li className={styles.service_Price_Li}>
                              Daily :
                              {service.dailyPrice
                                ? `${" " + service.dailyPrice}$`
                                : " On Contact"}
                            </li>
                            <li className={styles.service_Price_Li}>
                              Monthly :
                              {service.monthlyPrice
                                ? `${" " + service.monthlyPrice}$`
                                : " On Contact"}
                            </li>
                            <li className={styles.service_Price_Li}>
                              Annually :
                              {service.AnnuallyPrice
                                ? `${" " + service.AnnuallyPrice}$`
                                : " On Contact"}
                            </li>
                          </ul>
                        </li>
                      );
                    })}
                </ul>
                {/* {space.allServices && space.allServices.length > 3 ? ( */}
                <span className={styles.showMore}>
                  <button
                    className={styles.showMoreButton}
                    onClick={() => setShowMoreServices(true)}
                  >
                    Show more
                  </button>
                </span>
                {/* ) : (
                  ""
                )} */}
              </div>
              <div className={styles.comments}>
                <p className={styles.div_Title}>Reviews</p>
                <button
                  className={styles.review_btn}
                  onClick={() => setOpenAddRating(true)}
                >
                  Post Review
                </button>
                <ul className={styles.comments_Holder}>
                  {ratings &&
                    ratings.slice(0, 3).map((rating, index) => {
                      return (
                        <li key={index} className={styles.rating_Li}>
                          <div className={styles.rating_Title}>
                            <Avatar
                              src={rating.userId.image}
                              alt={rating.userId.fullName}
                              className={styles.rating_Image}
                            />
                            <p className={styles.rating_Name}>
                              {rating.userId.fullName}
                            </p>
                          </div>
                          <p className={styles.rating_Star}>
                            <Rating
                              value={rating.rate}
                              readOnly
                              precision={0.25}
                            />
                            {rating.rate}
                          </p>
                          <p className={styles.rating_Message}>
                            {rating.message}
                          </p>
                          <p className={styles.rating_Date}>
                            {formatDate(rating.createdAt)}
                            {}
                          </p>
                        </li>
                      );
                    })}
                </ul>
                {ratings && ratings.length > 3 ? (
                  <span className={styles.showMore}>
                    <button
                      className={styles.showMoreButton}
                      onClick={() => setShowMoreRatings(true)}
                    >
                      Show more
                    </button>
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.checkout}></div>
          </div>
          <GalleryModal
            openGallery={openGallery}
            handleClose={() => setOpenGallery(false)}
          />
          <ImageModal
            openImage={openImage.open}
            image={openImage.src}
            handleClose={() =>
              setOpenImage({
                open: false,
                src: "",
              })
            }
          />
          <ServicesModal
            openServices={showMoreServices}
            handleClose={() => setShowMoreServices(false)}
            services={space && space.allServices}
          />
          <AmenityModal
            openAmenities={showMoreAmenities}
            handleClose={() => setShowMoreAmenities(false)}
            amenities={groupedAmenities}
          />
          <RulesModal
            rules={space && space.rules}
            openRules={showMoreRules}
            handleClose={() => setShowMoreRules(false)}
          />
          <RateModal
            openRate={openAddRating}
            setOpenNote={setOpenNote}
            handleClose={() => setOpenAddRating(false)}
            spaceID={id}
            setSuccess={setSuccess}
          />
          <DoneModal
            open={openNote}
            message={alertData.message}
            handleClose={() => setOpenNote(false)}
            type={alertData.type}
          />
          <AllRatingsModal
            openRatings={showMoreRatings}
            ratings={ratings}
            handleClose={() => setShowMoreRatings(false)}
          />
        </>
      )}
    </div>
  );
}
