import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Lazy } from 'swiper';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/lazy/lazy.min.css';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';
import { MHidden } from './@material-extend';

Masonry.propTypes = {
  hostel: PropTypes.array
};

export default function Masonry({ hostel }) {
  const imagesLightbox = hostel?.images.map((url, index) => ({
    image: url,
    alt: index
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleView = () => {
    setLightboxOpen({ open: true });
  };

  return (
    <ContainerStyle maxWidth="lg">
      {/* Image lightbox modal */}
      {lightboxOpen ? (
        <Lightbox
          mainSrc={imagesLightbox[photoIndex]?.image}
          nextSrc={imagesLightbox[(photoIndex + 1) % imagesLightbox.length]?.image}
          prevSrc={
            imagesLightbox[(photoIndex + imagesLightbox.length - 1) % imagesLightbox.length].image
          }
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(photoIndex + imagesLightbox.length - (1 % imagesLightbox.length))
          }
          onMoveNextRequest={() => setPhotoIndex(photoIndex + (1 % imagesLightbox.length))}
        />
      ) : (
        ''
      )}

      {/* Desktop image grid view */}
      <MHidden width="smDown">
        <WrapperTwo>
          <div className="spaceDetail__wrap">
            <div className="spaceDetail__image-wrap">
              {imagesLightbox?.map((photo, index) => (
                <div
                  className="spaceDetail__image"
                  style={{
                    backgroundImage: `url(${photo?.image})`
                  }}
                  key={index}
                  data-photo="photo"
                  role="button"
                  onClick={() => setLightboxOpen(true)}
                  onKeyDown={() => setLightboxOpen(true)}
                  tabIndex={0}
                >
                  <div className="spaceDetail__image-overlay" />
                </div>
              ))}

              <button
                type="button"
                className="spaceDetail__image-btn"
                onClick={() => handleView(0)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="spaceDetail__image-btn-icon svg-icon svg-fill"
                >
                  <path
                    d="M6.00016 14.6668H10.0002C13.3335 14.6668 14.6668 13.3335 14.6668 10.0002V6.00016C14.6668 2.66683 13.3335 1.3335 10.0002 1.3335H6.00016C2.66683 1.3335 1.3335 2.66683 1.3335 6.00016V10.0002C1.3335 13.3335 2.66683 14.6668 6.00016 14.6668Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{' '}
                  <path
                    d="M5.99984 6.66667C6.73622 6.66667 7.33317 6.06971 7.33317 5.33333C7.33317 4.59695 6.73622 4 5.99984 4C5.26346 4 4.6665 4.59695 4.6665 5.33333C4.6665 6.06971 5.26346 6.66667 5.99984 6.66667Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{' '}
                  <path
                    d="M1.77979 12.6335L5.06645 10.4269C5.59312 10.0735 6.35312 10.1135 6.82645 10.5202L7.04645 10.7135C7.56645 11.1602 8.40645 11.1602 8.92645 10.7135L11.6998 8.33354C12.2198 7.88687 13.0598 7.88687 13.5798 8.33354L14.6665 9.26687"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View all images
              </button>
            </div>
          </div>
        </WrapperTwo>
      </MHidden>

      {/* Mobile image slider view */}
      <MHidden width="smUp">
        <div className="md_img">
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff'
            }}
            pagination={{
              type: 'progressbar'
            }}
            lazy
            navigation
            modules={[Pagination, Navigation, Lazy]}
            className="mySwiper"
          >
            {' '}
            {imagesLightbox?.map((photo, index) => (
              <>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <div>
                  <SwiperSlide key={index} onClick={() => setLightboxOpen(true)} role="dialog">
                    <img src={photo.image} className="swiper-lazy" alt="hostel_image" />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white" />
                  </SwiperSlide>
                </div>
              </>
            ))}{' '}
          </Swiper>
        </div>
      </MHidden>
    </ContainerStyle>
  );
}

const WrapperTwo = styled.div`
  @media screen and (max-width: 1024px) {
    .spaceDetail__wrap {
      padding: 15px 3px 14px;
    }
  }
  .mobile__carousel {
    position: relative !important;
    padding-top: 1.7rem;
    .slider__img {
      border-radius: 15px;
    }
  }

  .spaceDetail__wrap {
    height: 100%;
    width: 100%;
    margin: auto;
    position: relative;
    .spaceDetail__image-btn {
      position: absolute;
      right: 20px;
      bottom: 24px;
      background: rgba(68, 73, 81, 0.9);
      border-radius: 10px;
      font-weight: 500;
      font-size: 14px;
      line-height: normal;
      color: #fff;
      border: none;
      width: 158px;
      height: 40px;
      cursor: pointer;
      .spaceDetail__image-btn-icon {
        fill: none;
        stroke: #fff;
        width: 15px;
        height: 15px;
        margin-right: 8px;
        margin-bottom: 1px;
      }
    }
    .spaceDetail__image-wrap {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(4, [col] minmax(23%, 1fr));
      grid-template-rows: repeat(2, [row] minmax(auto, 205px));
      position: relative;
      .spaceDetail__image:first-child {
        grid-column: col/span 2;
        grid-row: row/span 2;
        border-radius: 15px;
      }
      .spaceDetail__image:nth-child(3),
      .spaceDetail__image-overlay {
        border-radius: 15px !important;
      }

      .spaceDetail__image:nth-child(4) {
        grid-column: col 3 / span 2;
        grid-row: row 2 / span 1;
        border-radius: 15px;
      }
      .spaceDetail__image:nth-child(2) {
        border-radius: 15px !important;
      }
      @media screen and (max-width: 768px) {
        .spaceDetail__image:nth-child(3) {
          display: none;
        }
        .spaceDetail__image:nth-child(2) {
          grid-column: col 3 / span 2;
          border-radius: 15px !important;
        }
      }
      .spaceDetail__image {
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        .spaceDetail__image-overlay {
          width: 100%;
          height: 100%;
          background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(rgba(0, 0, 0, 0.53)),
            to(rgba(0, 0, 0, 0.03))
          );
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.04));
          opacity: 0.8;
          border-radius: 15px;
          -webkit-transform: rotate(-180deg);
          transform: rotate(-180deg);
        }
      }
    }
  }
`;
const ContainerStyle = styled(Container)`
  margin-top: 0;
  @media (max-width: 640px) {
    margin-top: 2rem;
    padding: 0 !important;
  }
  .swiper-slide {
    overflow: hidden;
    height: 350px;
  }
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// const Wrapper = styled.div`
//   position: relative;
//   img {
//     border-radius: 15px;
//     object-fit: cover;
//     width: 100%;
//   }
//   .big__img {
//     /* min-height: 200px !important; */
//     height: 340px !important;
//   }
//   .small__img {
//     height: 340px;
//   }
// `;
