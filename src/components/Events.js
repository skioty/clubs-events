"use client";

import React from "react";
import Image from "next/image";

const events = [
  {
    id: 1,
    title: "Best of CST",
    img: "/BestofCST.jpg",
    alt: "Music Festival",
    date: "Apr 29, 2025",
    desc: "Experience the magic of live performances from student of each departments at our once in a year festive night.",
    modalId: "eventModal1",
  },
  {
    id: 2,
    title: "Contemporary Art Exhibition",
    img: "/ArtExhibition.jpg",
    alt: "Art Exhibition",
    date: "Apr 27, 2025",
    desc: "Explore stunning artwork created by our talented architecture students showcasing various arts and their perspectives.",
    modalId: "eventModal2",
  },
  {
    id: 3,
    title: "Tech Hackathon Challenge",
    img: "/Hackathon.jpg",
    alt: "Hackathon",
    date: "May 8, 2025",
    desc: "Join our 48-hour coding marathon where teams compete to create innovative solutions to real-world problems.",
    modalId: "eventModal3",
  },
];

const FeaturedEvents = () => {
  return (
    <section className="featured-section" id="events-container">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
          Upcoming Events
        </h2>
        <div className="row">
          {events.map((event, index) => (
            <div
              className="col-md-4"
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
              key={event.id}
            >
              <div className="featured-card h-100">
                <Image
                  src={event.img}
                  alt={event.alt}
                  className="featured-img"
                  width={400}
                  height={250}
                />
                <div className="featured-content">
                  <div className="featured-date">{event.date}</div>
                  <h5 className="featured-title">{event.title}</h5>
                  <p className="featured-text">{event.desc}</p>
                  <button
                    className="btn view-more-btn"
                    data-bs-toggle="modal"
                    data-bs-target={`#${event.modalId}`}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5" data-aos="fade-up">
          <button
            className="btn view-more-btn"
            data-bs-toggle="modal"
            data-bs-target="#allEventsModal"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
