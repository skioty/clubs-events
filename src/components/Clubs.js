"use client";

import React, { useState } from "react";
import Image from "next/image";

const clubs = [
  {
    id: 'cmavwsr9q000gl1ohs3mp8og',
    title: "Culture Club",
    img: "/culture.jpg",
    alt: "Culture Club",
    desc: "Showcase your talent, celebrate traditions, and be part of something vibrant. Let your culture shine—join us today!",
    tags: ["Dance", "Performance"],
    modalId: "clubModalcmavwsr9q000gl1ohs3mp8og",
  },
  {
    id: 'cmavwsr9q0001gl1ol52mix8q',
    title: "ACM Club",
    img: "/ACM.jpg",
    alt: "ACM Club",
    desc: "Dive into the world of coding, robotics, AI, and tech innovations. Be part of a community that's shaping the future. Join now!",
    tags: ["Technology", "Coding"],
    modalId: "clubModalcmavwsr9q0001gl1ol52mix8q",
  },
  {
    id: 'cmavwsr9q0002gl1o09lkba6n',
    title: "Y-pheer Club",
    img: "/club13.jpg",
    alt: "Y-pheer Club",
    desc: "Empower yourself and others through personal development, leadership, and community engagement. Be part of a vibrant club that makes a difference. Join today!",
    tags: ["Supportive", "Interacting"],
    modalId: "clubModalcmavwsr9q0002gl1o09lkba6n",
  },
  {
    id: 'cmavx2zpv000elk0s9pmsh304',
    title: "Literary Club",
    img: "/club6.jpg",
    alt: "Literary Club",
    desc: "Explore the world of literature, express your creativity, and share your love for reading and writing. Join us to be part of engaging discussions, writing workshops, and more!",
    tags: ["Debate", "Speaking"],
    modalId: "clubModalcmavx2zpv000elk0s9pmsh304",
  },
  {
    id: 'cmavx4ddo000flk0sdqzj9rv3',
    title: "Sports Club",
    img: "/sports.jpg",
    alt: "Sports Club",
    desc: "Get active, stay fit, and compete with fellow sports enthusiasts! Whether you're into team sports or individual challenges, there's a place for you here. Come and be part of the action!",
    tags: ["Sports", "Fitness"],
    modalId: "clubModalcmavx4ddo000flk0sdqzj9rv3",
  },
  {
    id: 'cmavx5a65000glk0seuv83b3v',
    title: "Radio Club",
    img: "/club10.jpg",
    alt: "Radio Club",
    desc: "If you're passionate about broadcasting, music, or voice acting, the Radio Club is the place for you! Explore the world of radio and media, create exciting content, and connect with listeners. Get involved today!",
    tags: ["Communication", "Hearing"],
    modalId: "clubModalcmavx5a65000glk0seuv83b3v",
  },
  {
    id: 'cmavx5j99000hlk0su4p72jiz',
    title: "GNH Club",
    img: "/club5.jpg",
    alt: "GNH Club",
    desc: "Promote Gross National Happiness values, mindfulness, and well-being through activities and discussions. Join us to foster happiness and positive change.",
    tags: ["Happiness", "Well-being"],
    modalId: "clubModalcmavx5j99000hlk0su4p72jiz",
  },
  {
    id: 'cmavx5vaq000ilk0sozu7lmq',
    title: "Multimedia Club",
    img: "/club8.jpg",
    alt: "Multimedia Club",
    desc: "Explore the world of digital media, video production, and creative storytelling. Join us to create, edit, and share multimedia projects.",
    tags: ["Media", "Creativity"],
    modalId: "clubModalcmavx5vaq000ilk0sozu7lmq",
  },
  {
    id: 'cmavx64nb000jlk0s3yu1per1',
    title: "Spiritual Club",
    img: "/club12.jpg",
    alt: "Spiritual Club",
    desc: "Engage in spiritual growth, meditation, and cultural rituals. Join us for a journey of self-discovery and inner peace.",
    tags: ["Spirituality", "Meditation"],
    modalId: "clubModalcmavx64nb000jlk0s3yu1per1",
  },
  {
    id: 'cmavx6hcb000klk0suhy8jeqw',
    title: "Kuenphen Tshogpa Club",
    img: "/club4.jpg",
    alt: "Kuenphen Tshogpa Club",
    desc: "Dedicated to community service, sustainability, and social responsibility. Join us to make a positive impact in society.",
    tags: ["Community", "Service"],
    modalId: "clubModalcmavx6hcb000klk0suhy8jeqw",
  },
  {
    id: 'cmavx6p46000llk0s9rnfkfxw',
    title: "Nature Club",
    img: "/club9.jpg",
    alt: "Nature Club",
    desc: "Connect with nature, participate in environmental activities, and promote sustainability. Join us to protect and enjoy the environment.",
    tags: ["Nature", "Environment"],
    modalId: "clubModalcmavx6p46000llk0s9rnfkfxw",
  },
  {
    id: 'cmavx6ws1000mlk0s2f3sz5z5',
    title: "Rovers Club",
    img: "/club11.jpg",
    alt: "Rovers Club",
    desc: "Adventure, exploration, and outdoor activities await! Join the Rovers Club for hiking, camping, and team-building experiences.",
    tags: ["Adventure", "Outdoors"],
    modalId: "clubModalcmavx6ws1000mlk0s2f3sz5z5",
  },
];

const ClubCards = () => {
  const [showModal, setShowModal] = useState(false);
  const clubsToShow = clubs.slice(0, 6);
  return (
    <section className="clubs-section bg-light" id="clubs-container">
      <div className="container">
        <h2 className="section-heading" data-aos="fade-up">
          Our Clubs
        </h2>
        <div className="row">
          {clubsToShow.map((club, index) => (
            <div
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              key={club.id}
            >
              <div className="club-card">
                <Image
                  src={club.img || "/default-club.jpg"}
                  alt={club.alt}
                  className="club-img"
                  width={400}
                  height={250}
                  style={{ objectFit: 'cover', width: '100%', height: '180px' }}
                />
                <div className="club-content">
                  <h5 className="club-title">{club.title}</h5>
                  <p className="club-text">{club.desc}</p>
                  <div className="mb-3">
                    {club.tags.map((tag, i) => (
                      <span key={i} className="club-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn view-more-btn"
                    data-bs-toggle="modal"
                    data-bs-target={`#${club.modalId}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5" data-aos="fade-up">
          <button
            className="btn view-more-btn"
            id="loadMoreBtn"
            data-bs-toggle="modal"
            data-bs-target="#allClubsModal"
            onClick={() => setShowModal(true)}
          >
            View All the Clubs
          </button>
        </div>
      </div>

      {/* All Clubs Modal */}
      <div
        className={`modal fade${showModal ? ' show d-block' : ''}`}
        id="allClubsModal"
        tabIndex="-1"
        aria-labelledby="allClubsModalLabel"
        aria-hidden={!showModal}
        style={{ background: showModal ? 'rgba(0,0,0,0.5)' : 'none' }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="allClubsModalLabel">All Campus Clubs</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {clubs.map((club, index) => (
                  <div
                    className="col-md-4 mb-4"
                    key={club.id}
                  >
                    <div className="club-card">
                      <Image
                        src={club.img || "/default-club.jpg"}
                        alt={club.alt}
                        className="club-img"
                        width={400}
                        height={250}
                        style={{ objectFit: 'cover', width: '100%', height: '180px' }}
                      />
                      <div className="club-content">
                        <h5 className="club-title">{club.title}</h5>
                        <p className="club-text">{club.desc}</p>
                        <div className="mb-3">
                          {club.tags.map((tag, i) => (
                            <span key={i} className="club-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          className="btn view-more-btn"
                          data-bs-toggle="modal"
                          data-bs-target={`#${club.modalId}`}
                          onClick={() => setShowModal(false)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubCards;
