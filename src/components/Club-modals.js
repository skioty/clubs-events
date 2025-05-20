'use client';
import React, { useState, useEffect } from 'react';

const ClubModals = () => {
  const [activeForm, setActiveForm] = useState({});
  const [successMessages, setSuccessMessages] = useState({});

  // Toggle the visibility of the join form for a specific club
  const toggleJoinForm = (clubId, show = null) => {
    setActiveForm(prev => ({
      ...prev,
      [clubId]: show !== null ? show : !prev[clubId]
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event, clubId) => {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[id^="studentName"]').value;
    const id = form.querySelector('input[id^="studentID"]').value;
    const reason = form.querySelector('textarea[id^="whyJoin"]').value;
    
    if (!name || !id || !reason) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Send data to API
    const response = await fetch('/api/memberships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clubId,
        studentName: name,
        studentId: id,
        applicationDescription: reason,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Show error message
      setSuccessMessages(prev => ({
        ...prev,
        [clubId]: data.error || 'Something went wrong. Please try again.'
      }));
      return;
    }
    
    // Hide form and show success message
    toggleJoinForm(clubId, false);
    setSuccessMessages(prev => ({
      ...prev,
      [clubId]: `Thank you ${name}! Your club join request has been submitted successfully.`
    }));
    
    // Reset form
    form.reset();
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessages(prev => ({
        ...prev,
        [clubId]: null
      }));
    }, 3000);
  };

  const renderClubModal = (id, title, imageSrc, details) => {
    const { about, activities, clubDetails } = details;

    return (
      <div 
        className="modal fade" 
        id={`clubModal${id}`} 
        tabIndex="-1" 
        aria-labelledby={`clubModal${id}Label`} 
        aria-hidden="true" 
        key={`modal-${id}`}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id={`clubModal${id}Label`}>{title}</h4>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img 
                src={imageSrc} 
                alt={`${title} Club`} 
                className="img-fluid rounded mb-4" 
              />
              <div className="row">
                <div className="col-md-8">
                  <h5 className="text-primary mb-3">About the Club</h5>
                  {about.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <h5 className="text-primary mb-3">Activities</h5>
                  <ul>
                    {activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light p-3">
                    <h5 className="text-primary mb-3">Club Details</h5>
                    {Object.entries(clubDetails).map(([key, value]) => (
                      <p key={key} className="mb-2">
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {successMessages[id] && (
                <div className={`alert mt-3 ${successMessages[id].startsWith('Thank you') ? 'alert-success' : 'alert-danger'}`}>
                  {successMessages[id]}
                </div>
              )}
              <form 
                className={`join-form ${activeForm[id] ? '' : 'd-none'} mt-3`} 
                id={`joinForm${id}`}
                onSubmit={(e) => handleFormSubmit(e, id)}
              >
                <h5 className="text-primary mb-3">Join the Club</h5>
                <div className="mb-3">
                  <label htmlFor={`studentName${id}`} className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id={`studentName${id}`} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`studentID${id}`} className="form-label">Student ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id={`studentID${id}`} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`whyJoin${id}`} className="form-label">
                    Why do you want to join?
                  </label>
                  <textarea 
                    className="form-control" 
                    id={`whyJoin${id}`} 
                    rows="3" 
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-success" 
                  id={`submitJoin${id}`}
                >
                  Submit
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary ms-2" 
                  id={`cancelJoin${id}`}
                  onClick={() => toggleJoinForm(id, false)}
                >
                  Cancel
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                id={`closeFooterBtn${id}`}
              >
                Close
              </button>
              {!activeForm[id] && !successMessages[id] && (
                <button 
                  type="button" 
                  className="btn btn-success join-club-btn" 
                  id={`joinClubBtn${id}`}
                  onClick={() => toggleJoinForm(id, true)}
                >
                  Join Club
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const clubsData = [
    {
      id: 'cmavwsr9q000gl1ohs3mp8og',
      title: 'Culture Club',
      imageSrc: 'culture.jpg',
      details: {
        about: [
          'The Culture Club is a vibrant community dedicated to exploring, celebrating, and preserving diverse cultural heritages. It serves as a platform for students to connect, learn, and express themselves through various cultural mediums.',
          'The club organizes events that promote cultural awareness, creativity, and unity, while providing an opportunity to experience the beauty of different traditions. We aim to foster a deeper understanding of global cultures and encourage students to embrace diversity through engaging activities that bridge cultural gaps and inspire mutual respect.'
        ],
        activities: [
          'Cultural Performances',
          'Cultural Festivals',
          'Workshops & Masterclasses',
          'Cultural Competitions',
          'Cultural Documentary Screenings',
          'Global Food Days'
        ],
        clubDetails: {
          'Founded': '2014',
          'Members': '87',
          'Meeting Day': 'Wednesdays',
          'Time': '5:00 PM - 7:00 PM',
          'Location': 'MPH Hall',
          'Faculty Advisor': 'Sir Nima'
        }
      }
    },
    {
      id: 'cmavwsr9q0001gl1ol52mix8q',
      title: 'ACM Club',
      imageSrc: 'ACM.jpg',
      details: {
        about: [
          'The ACM Club is a student-led organization dedicated to advancing the field of computer science and technology. It serves as a platform for students to collaborate, learn, and grow in various aspects of computing, from programming and algorithms to the latest trends in software development.',
          'The club fosters a strong sense of community among like-minded individuals, providing opportunities for skill-building, networking, and professional development. With a focus on both technical and soft skills, the ACM Club strives to prepare its members for future careers in technology through engaging projects, competitions, and events that promote hands-on learning and problem-solving.'
        ],
        activities: [
          'Coding competitions',
          'Guest lectures and talks',
          'Tech-related networking events and meetups',
          'Collaborative performances',
          'Career development sessions',
          'Workshops on programming languages'
        ],
        clubDetails: {
          'Founded': '2020',
          'Members': '93',
          'Meeting Day': 'Thursdays',
          'Time': '5:00 PM - 7:00 PM',
          'Location': 'MPH Hall',
          'Faculty Advisor': 'Sir James'
        }
      }
    },
    {
      id: 'cmavwsr9q0002gl1o09lkba6n',
      title: 'Y-pheer Club',
      imageSrc: 'club13.jpg',
      details: {
        about: [
          'The Y-pheer Club is dedicated to promoting leadership, social awareness, and personal development. It offers a platform for young individuals to develop their potential and make a positive impact on society.',
          'The club focuses on equipping its members with the skills needed for effective leadership while encouraging them to engage in community service and meaningful social causes.'
        ],
        activities: [
          'Leadership Development Workshops',
          'Awareness Campaigns',
          'Personal Development Sessions',
          'Mentorship and Peer Support Programs',
          'Public Speaking and Debating Events',
          'Teamwork'
        ],
        clubDetails: {
          'Founded': '2022',
          'Members': '57',
          'Meeting Day': 'Mondays',
          'Time': '5:00 PM - 7:00 PM',
          'Location': 'MPH Hall',
          'Faculty Advisor': 'Sir Ngawang'
        }
      }
    },
    {
      id: 'cmavx2zpv000elk0s9pmsh304',
      title: 'Literary Club',
      imageSrc: 'club6.jpg',
      details: {
        about: [
          'The Literary Club is a vibrant community of literature enthusiasts who are passionate about reading, writing, and discussing various forms of literature.',
          'The club fosters a love for books, encourages creative expression, and provides a platform for literary exploration. It aims to develop critical thinking, communication skills, and a deeper appreciation of literary works among its members.'
        ],
        activities: [
          'Book Discussions',
          'Writing Workshops',
          'Poetry Reading and Writing',
          'Literary Competitions',
          'Guest Speaker Events',
          'Thematic Book Series'
        ],
        clubDetails: {
          'Founded': '2008',
          'Members': '117',
          'Meeting Day': 'Fridays',
          'Time': '5:00 PM - 7:00 PM',
          'Location': 'MPH Hall',
          'Faculty Advisor': 'Mam. Tshewang'
        }
      }
    },
    {
      id: 'cmavx4ddo000flk0sdqzj9rv3',
      title: 'Sports Club',
      imageSrc: 'sports.jpg',
      details: {
        about: [
          'The Sports Club is dedicated to promoting physical fitness, teamwork, and a spirit of healthy competition among students.',
          'It serves as a platform for athletes and sports enthusiasts to showcase their talent, improve their skills, and participate in various indoor and outdoor sports activities. The club also encourages an active lifestyle and fosters discipline and sportsmanship in all participants.'
        ],
        activities: [
          'Organizing inter-department sports tournaments',
          'Conducting regular training sessions',
          'Arranging fitness workshops',
          'Facilitating participation in national and regional sports events',
          'Promoting games',
          'Encouraging inclusivity'
        ],
        clubDetails: {
          'Founded': '2009',
          'Members': '327',
          'Meeting Day': 'Saturdays',
          'Time': '5:00 PM - 7:00 PM',
          'Location': 'MPH Hall',
          'Faculty Advisor': 'Sir. Jamtsho'
        }
      }
    },
    {
      id: 'cmavx5a65000glk0seuv83b3v',
      title: 'Radio Club',
      imageSrc: 'club10.jpg',
      details: {
        about: [
          'The Radio Club serves as the creative voice of the campus, offering students a platform to express ideas, share stories, and spread information through audio broadcasting.',
          'It nurtures communication skills, creativity, and technical knowledge related to audio production and media. The club is an exciting space for aspiring RJs, content creators, and audio enthusiasts to collaborate and engage the student body.'
        ],
        activities: [
          'Weekly campus radio shows',
          'Interviews, talk shows, and music segments',
          'Broadcasting important college announcements and updates',
          'Organizing RJ training',
          'Covering college events',
          'Encouraging student participation'
        ],
        clubDetails: {
          'Founded': '2019',
          'Members': '47',
          'Meeting Day': 'Tuesdays',
          'Time': '5:00 PM - 7:00 PM',
          'Location': 'MPH Hall',
          'Faculty Advisor': 'Sir Lhagyel'
        }
      }
    },
    {
      id: 'cmavx5j99000hlk0su4p72jiz',
      title: 'GNH Club',
      imageSrc: '',
      details: {
        about: [],
        activities: [],
        clubDetails: {}
      }
    },
    {
      id: 'cmavx5vaq000ilk0sozu7lmq',
      title: 'Multimedia Club',
      imageSrc: '',
      details: {
        about: [],
        activities: [],
        clubDetails: {}
      }
    },
    {
      id: 'cmavx64nb000jlk0s3yu1per1',
      title: 'Spiritual Club',
      imageSrc: '',
      details: {
        about: [],
        activities: [],
        clubDetails: {}
      }
    },
    {
      id: 'cmavx6hcb000klk0suhy8jeqw',
      title: 'Kuenphen Tshogpa Club',
      imageSrc: '',
      details: {
        about: [],
        activities: [],
        clubDetails: {}
      }
    },
    {
      id: 'cmavx6p46000llk0s9rnfkfxw',
      title: 'Nature Club',
      imageSrc: '',
      details: {
        about: [],
        activities: [],
        clubDetails: {}
      }
    },
    {
      id: 'cmavx6ws1000mlk0s2f3sz5z5',
      title: 'Rovers Club',
      imageSrc: '',
      details: {
        about: [],
        activities: [],
        clubDetails: {}
      }
    },
  ];

  return (
    <div>
      {clubsData.map(club => 
        renderClubModal(club.id, club.title, club.imageSrc, club.details)
      )}
    </div>
  );
};

export default ClubModals;