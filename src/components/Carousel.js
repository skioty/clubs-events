"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

const carouselItems = [
  {
    src: "/event1.jpg",
    alt: "Event 1",
    title: "Tech Week",
    desc: "Explore innovation through workshops, competitions, and guest speakers.",
    date: "March 20, 2025",
    location: "Team Work Hall",
  },
  {
    src: "/event2.jpg",
    alt: "Event 2",
    title: "Cultural Night",
    desc: "Experience diverse traditions, music, and performances from around the world.",
    date: "March 30, 2025",
    location: "Convention Hall",
  },
];

const EventCarousel = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js"); // ✅ Load only in browser
  }, []);

  return (
    <div
      id="eventCarousel"
      className="carousel slide mt-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <Image
              src={item.src}
              className="d-block w-100 event-slide"
              alt={item.alt}
              width={1200}
              height={600}
              data-title={item.title}
              data-desc={item.desc}
              data-date={item.date}
              data-location={item.location}
              data-bs-toggle="modal"
              data-bs-target="#eventDetailModal"
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
              <h5>{item.title}</h5>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#eventCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#eventCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default EventCarousel;
