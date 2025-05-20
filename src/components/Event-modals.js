'use client';
import React, { useState } from 'react';

const EventModals = () => {
  const [activeForm, setActiveForm] = useState({});
  const [successMessages, setSuccessMessages] = useState({});

  // Toggle the visibility of the registration form for a specific event
  const toggleRegistrationForm = (eventId, show = null) => {
    setActiveForm(prev => ({
      ...prev,
      [eventId]: show !== null ? show : !prev[eventId]
    }));
  };

  // Handle form submission
  const handleFormSubmit = (event, eventId) => {
    event.preventDefault();
    const form = event.target;
    const idInput = form.querySelector(`input[id^="studentId"]`);
    const nameInput = form.querySelector(`input[id^="studentName"]`);
    const id = idInput?.value.trim();
    const name = nameInput?.value.trim();
    
    if (!id || !name) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Hide form and show success message
    toggleRegistrationForm(eventId, false);
    setSuccessMessages(prev => ({
      ...prev,
      [eventId]: `Thank you ${name}! Your registration has been submitted successfully.`
    }));
    
    // Reset form
    form.reset();
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessages(prev => ({
        ...prev,
        [eventId]: null
      }));
    }, 3000);
  };

  // Event data array
  const eventsData = [
    {
      id: 1,
      title: 'Best of CST',
      imageSrc: 'BestofCST.jpg',
      date: 'April 29, 2025',
      location: 'MPH Hall',
      description: 'Experience the magic of live performances from student bands and professional artists...',
      schedule: [
        '6:00 PM - Chief Guest arrives',
        '7:00 PM - Student Performances Begin',
        '8:30 PM - Lucky Draw Sessions',
        '9:00 PM - Students Band',
        '10:00 PM - Teachers Performance',
        '10:30 PM - Program Ends'
      ],
      ticketInfo: 'Free for students with ID, Nu.30 for non-students'
    },
    {
      id: 2,
      title: 'Contemporary Art Exhibition',
      imageSrc: 'ArtExhibition.jpg',
      date: 'April 27, 2025',
      location: 'Architecture Building',
      description: 'Explore the creativity and innovative designs of architecture students...',
      schedule: [
        '9:00 AM - President arrives',
        '9:30 AM - Art Exhibition Begins',
        '10:00 AM - Other Departments can join',
        '6:00 PM - Exhibition Ends'
      ],
      ticketInfo: 'Free for students with ID, Nu.30 for non-students'
    },
    {
      id: 3,
      title: 'Tech Hackathon Challenge',
      imageSrc: 'Hackathon.jpg',
      date: 'May 8, 2025',
      location: 'IT Building',
      description: 'Join the ultimate challenge for tech enthusiasts and innovators...',
      schedule: [
        '9:00 AM - Participants arrive',
        '9:30 AM - Hackathon Begins',
        '6:00 PM - Submissions Due',
        '7:00 PM - Project Presentations',
        '8:30 PM - Awards Ceremony'
      ],
      ticketInfo: 'Registration required: Free for all students with valid ID'
    }
  ];

  // Render single event modal
  const renderEventModal = (event) => {
    const { id, title, imageSrc, date, location, description, schedule, ticketInfo } = event;
    
    return (
      <div 
        className="modal fade" 
        id={`eventModal${id}`} 
        tabIndex="-1" 
        aria-labelledby={`eventModal${id}Label`}
        key={`event-modal-${id}`}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id={`eventModal${id}Label`}>{title}</h4>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img 
                src={imageSrc} 
                alt={title} 
                className="img-fluid rounded mb-4" 
              />
              <p className="text-primary fw-bold">{date} | {location}</p>
              <p>{description}</p>
              <ul>
                {schedule.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mb-0 text-primary">
                <i className="fas fa-ticket-alt me-2"></i> Ticket information: {ticketInfo}
              </p>
              
              {/* Success message */}
              {successMessages[id] && (
                <div className="alert alert-success mt-3">
                  {successMessages[id]}
                </div>
              )}
              
              {/* Registration form */}
              <form 
                className={`registration-form ${activeForm[id] ? '' : 'd-none'} mt-3`} 
                id={`form${id}`}
                onSubmit={(e) => handleFormSubmit(e, id)}
              >
                <div className="mb-3">
                  <label htmlFor={`studentId${id}`} className="form-label">Student ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id={`studentId${id}`} 
                    placeholder="Enter your student ID" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`studentName${id}`} className="form-label">Student Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id={`studentName${id}`} 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-success" 
                  id={`submitform${id}`}
                >
                  Submit
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary ms-2" 
                  id={`cancelform${id}`}
                  onClick={() => toggleRegistrationForm(id, false)}
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
              >
                Close
              </button>
              {!activeForm[id] && !successMessages[id] && (
                <button 
                  type="button" 
                  className="btn btn-primary register-btn" 
                  data-form={`form${id}`}
                  onClick={() => toggleRegistrationForm(id, true)}
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="modals-container">
      {eventsData.map(event => renderEventModal(event))}
    </section>
  );
};

export default EventModals;