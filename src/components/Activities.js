"use client"; // Only if using this in Next.js 13+ with the App Router

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const ActivitiesSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const activities = [
    {
      title: "Coding Class",
      img: "/codingclass.jpg",
      alt: "Coding Class",
      text: "The coding class was successfully conducted and proved to be a productive session. Students explored key programming concepts, engaged in hands-on practice, and gained valuable skills to boost their coding journey.",
      aos: "zoom-in",
      delay: "100",
    },
    {
      title: "Women's Day Celebration",
      img: "/womensday.jpg",
      alt: "Women's Day",
      text: "The Women’s Day Celebration was held with great enthusiasm, honoring the strength, achievements, and contributions of women. The event featured inspiring speeches, performances, and interactive sessions that made the day both meaningful and memorable.",
      aos: "zoom-in",
      delay: "200",
    },
    {
      title: "Teacher's Day",
      img: "/teachersday.jpg",
      alt: "Teacher's Day",
      text: "A heartfelt celebration filled with gratitude and joy! These captured moments reflect the appreciation, fun, and admiration shared by students and teachers alike on this special day.",
      aos: "zoom-in",
      delay: "300",
    },
    {
      title: "Futsal Tournament",
      img: "/futsal.jpg",
      alt: "Futsal Tournament",
      text: "An exciting and energetic tournament that brought out the best of teamwork, sportsmanship, and skill. The event was a great success, leaving behind thrilling memories and strong team spirit!",
      aos: "fade-right",
    },
    {
      title: "Contemporary Speech",
      img: "/speech.jpg",
      alt: "Contemporary Speech",
      text: "A thought-provoking session where students shared modern perspectives on current issues. It was an inspiring platform that encouraged critical thinking, confidence, and impactful communication.",
      aos: "fade-left",
    },
    {
      title: "Monthly Cleaning Campaign",
      img: "/club4.jpg",
      alt: "Cleaning Campaign",
      text: "A successful monthly cleaning drive where students and staff joined hands to keep our campus clean and green. Promoting hygiene, teamwork, and responsibility with every sweep!",
      aos: "fade-left",
    },
  ];

  return (
    <section className="activities-section" id="activities-container">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
          Club Activities & Events
        </h2>
        <div className="row">
          {activities.slice(0, 3).map((activity, index) => (
            <div
              className="col-md-4 col-lg-4"
              key={index}
              data-aos={activity.aos}
              data-aos-delay={activity.delay}
            >
              <div className="activities-item">
                <Image
                  src={activity.img}
                  alt={activity.alt}
                  width={400}
                  height={250}
                  className="activities-img"
                />
                <div className="activities-overlay">
                  <h5 className="activities-title">{activity.title}</h5>
                  <p className="activities-text">{activity.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-4">
          {activities.slice(3).map((activity, index) => (
            <div
              className="col-md-4 col-lg-4"
              key={index + 3}
              data-aos={activity.aos}
            >
              <div className="activities-item">
                <Image
                  src={activity.img}
                  alt={activity.alt}
                  width={400}
                  height={250}
                  className="activities-img"
                />
                <div className="activities-overlay">
                  <h5 className="activities-title">{activity.title}</h5>
                  <p className="activities-text">{activity.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
