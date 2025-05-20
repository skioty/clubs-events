import React, { useEffect } from 'react';

const Modals = () => {
  useEffect(() => {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const searchableContent = [
      { type: 'club', name: 'Culture Club', id: 'clubModal1', tags: ['culture', 'dance'] },
      { type: 'club', name: 'ACM Club', id: 'clubModal2', tags: ['technology', 'coding'] },
      { type: 'event', name: 'Tech Hackathon Challenge', id: 'eventModal3', tags: ['technology', 'hackathon'] },
      // Add all other clubs and events here
      { type: 'club', name: 'Y-pheer Club', id: 'clubModal3', tags: ['supportive', 'interacting'] },
      { type: 'club', name: 'Literary Club', id: 'clubModal4', tags: ['debate', 'speaking'] },
      { type: 'club', name: 'Sports Club', id: 'clubModal5', tags: ['sports', 'fitness'] },
      { type: 'club', name: 'Radio Club', id: 'clubModal6', tags: ['communication', 'hearing'] },
      { type: 'club', name: 'GNH Club', id: 'clubModal7', tags: ['peace', 'happiness'] },
      { type: 'club', name: 'Multimedia Club', id: 'clubModal8', tags: ['visual', 'arts'] },
      { type: 'club', name: 'Spiritual Club', id: 'clubModal9', tags: ['rituals', 'offering'] },
      { type: 'club', name: 'Kuenphen Tshogpa Club', id: 'clubModal10', tags: ['community', 'sustainability'] },
      { type: 'club', name: 'Nature Club', id: 'clubModal11', tags: ['nature', 'environment'] },
      { type: 'club', name: 'Rovers Club', id: 'clubModal12', tags: ['participation', 'activities'] },
      { type: 'event', name: 'Best of CST', id: 'eventModal1', tags: ['performance', 'arts'] },
      { type: 'event', name: 'Contemporary Art Exhibition', id: 'eventModal2', tags: ['art', 'exhibition'] },
      { type: 'event', name: 'Literary Festival', id: 'eventModal4', tags: ['literature', 'reading'] },
      { type: 'event', name: 'Inter-College Sports Tournament', id: 'eventModal5', tags: ['sports', 'competition'] },
      { type: 'event', name: 'Annual Career Fair', id: 'eventModal6', tags: ['career', 'networking'] },
    ];

    const performSearch = () => {
      const query = searchInput.value.toLowerCase().trim();
      searchResults.innerHTML = '';
      
      if (query.length < 2) {
        searchResults.innerHTML = '<div class="alert alert-info">Please enter at least 2 characters to search</div>';
        return;
      }
      
      const results = searchableContent.filter(item =>
        item.name.toLowerCase().includes(query) || 
        item.tags.some(tag => tag.includes(query))
      );
      
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="alert alert-warning">No results found.</div>';
      } else {
        results.forEach(result => {
          const el = document.createElement('div');
          el.className = 'search-result mb-3 p-2 border rounded';
          el.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
              <div><strong>${result.name}</strong> <span class="badge bg-secondary">${result.type}</span></div>
              <button class="btn btn-sm btn-primary view-result" data-target="#${result.id}">View Details</button>
            </div>
          `;
          searchResults.appendChild(el);
          
          el.querySelector('.view-result').addEventListener('click', function() {
            const targetModalId = this.getAttribute('data-target');
            const searchModal = document.getElementById('searchModal');
            const bsSearchModal = bootstrap.Modal.getInstance(searchModal);
            
            if (bsSearchModal) {
              bsSearchModal.hide();
            }
            
            const targetModal = document.querySelector(targetModalId);
            if (targetModal) {
              const bsTargetModal = new bootstrap.Modal(targetModal);
              bsTargetModal.show();
            }
          });
        });
      }
    };

    if (searchButton) {
      searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
      searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
      });
    }

    // Modal accessibility and form handling
    document.querySelectorAll('.modal').forEach(modal => {
      let lastFocused = null;
      
      modal.addEventListener('show.bs.modal', () => {
        lastFocused = document.activeElement;
      });
      
      modal.addEventListener('shown.bs.modal', () => {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      });
      
      modal.addEventListener('hidden.bs.modal', () => {
        if (lastFocused) {
          lastFocused.focus();
        }
        
        // Reset forms and hide success messages when modal is closed
        modal.querySelectorAll('.join-form, .registration-form').forEach(f => f.classList.add('d-none'));
        modal.querySelectorAll('form').forEach(f => f.reset());
        modal.querySelectorAll('.alert-success').forEach(alert => alert.classList.add('d-none'));
        modal.querySelectorAll('.join-club-btn, .register-btn').forEach(btn => {
          btn.style.display = 'inline-block';
        });
      });
    });

    // Registration form handling
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const form = document.getElementById('registerForm');
        const successAlert = document.getElementById('registerSuccess');
        
        // Simple validation
        const nameInput = document.getElementById('regName');
        const studentNoInput = document.getElementById('regStudentNo');
        
        if (nameInput.value.trim() === '' || studentNoInput.value.trim() === '') {
          return; // Don't submit if required fields are empty
        }
        
        // Show success message
        if (successAlert) {
          successAlert.classList.remove('d-none');
        }
        
        // Hide the register button
        this.style.display = 'none';
      });
    });

  }, []);

  return (
    <div>
      {/* Search Modal */}
      <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="searchModalLabel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="searchModalLabel">Search Clubs & Events</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="searchForm">
                <div className="input-group mb-3">
                  <input type="text" className="form-control" id="searchInput" placeholder="Search clubs, events, activities..." />
                  <button className="btn btn-outline-primary" type="button" id="searchButton" aria-label="Search">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </button>
                </div>
                <div id="searchResults" className="mt-4" aria-live="polite">
                  {/* Results will appear here */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">Event Registration</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="registerForm">
                <div className="mb-3">
                  <label htmlFor="regName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="regName" name="studentName" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="regStudentNo" className="form-label">Student Number</label>
                  <input type="text" className="form-control" id="regStudentNo" name="studentNumber" required />
                </div>
                <div className="alert alert-success d-none" id="registerSuccess">
                  Registration successful!
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary register-btn">Register</button>
            </div>
          </div>
        </div>
      </div>

      {/* All Events Modal */}
      <div className="modal fade" id="allEventsModal" tabIndex="-1" aria-labelledby="allEventsModalLabel">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="allEventsModalLabel">All Upcoming Events</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {/* Cards for events */}
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src="BestofCST.jpg" className="card-img-top" alt="Best of CST" />
                    <div className="card-body">
                      <h5 className="card-title">Best of CST</h5>
                      <p className="card-text">Apr 29, 2025 | MPH Hall</p>
                      <p>Experience the magic of live performances from students of each department.</p>
                      <button className="btn btn-primary view-event-btn" data-bs-toggle="modal" data-bs-target="#eventModal1">Details</button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src="ArtExhibition.jpg" className="card-img-top" alt="Art Exhibition" />
                    <div className="card-body">
                      <h5 className="card-title">Contemporary Art Exhibition</h5>
                      <p className="card-text">Apr 27, 2025 | Architecture Building</p>
                      <p>Explore stunning artwork created by our talented architecture students.</p>
                      <button className="btn btn-primary view-event-btn" data-bs-toggle="modal" data-bs-target="#eventModal2">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src="Hackathon.jpg" className="card-img-top" alt="Hackathon" />
                    <div className="card-body">
                      <h5 className="card-title">Tech Hackathon Challenge</h5>
                      <p className="card-text">May 8, 2025 | IT Building</p>
                      <p>Join our 48-hour coding marathon to create innovative solutions.</p>
                      <button className="btn btn-primary view-event-btn" data-bs-toggle="modal" data-bs-target="#eventModal3">
                        Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional events */}
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src="Literaryfestival.jpg" className="card-img-top" alt="Literary Festival" />
                    <div className="card-body">
                      <h5 className="card-title">Literary Festival</h5>
                      <p className="card-text">May 15, 2025 | Library</p>
                      <p>A celebration of literature with author talks, readings, and workshops.</p>
                      <button className="btn btn-primary view-event-btn" data-bs-toggle="modal" data-bs-target="#eventModal4">
                        Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src="Sportstournament.jpg" className="card-img-top" alt="Sports Tournament" />
                    <div className="card-body">
                      <h5 className="card-title">Inter-College Sports Tournament</h5>
                      <p className="card-text">May 20, 2025 | Sports Complex</p>
                      <p>Compete in various sports against teams from other colleges.</p>
                      <button className="btn btn-primary view-event-btn" data-bs-toggle="modal" data-bs-target="#eventModal5">
                        Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img src="CareerFair.jpg" className="card-img-top" alt="Career Fair" />
                    <div className="card-body">
                      <h5 className="card-title">Annual Career Fair</h5>
                      <p className="card-text">June 5, 2025 | Main Hall</p>
                      <p>Connect with potential employers and explore career opportunities.</p>
                      <button className="btn btn-primary view-event-btn" data-bs-toggle="modal" data-bs-target="#eventModal6">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Clubs Modal */}
      <div className="modal fade" id="allClubsModal" tabIndex="-1" aria-labelledby="allClubsModalLabel">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="allClubsModalLabel">All Campus Clubs</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {/* Cards for clubs */}
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="culture.jpg" className="card-img-top" alt="Culture Club" />
                    <div className="card-body">
                      <h5 className="card-title">Culture Club</h5>
                      <span className="badge bg-primary me-1">Dance</span>
                      <span className="badge bg-primary">Performance</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal1">View Details</button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="ACM.jpg" className="card-img-top" alt="ACM Club" />
                    <div className="card-body">
                      <h5 className="card-title">ACM Club</h5>
                      <span className="badge bg-primary me-1">Technology</span>
                      <span className="badge bg-primary">Coding</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal2">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club13.jpg" className="card-img-top" alt="Y-pheer Club" />
                    <div className="card-body">
                      <h5 className="card-title">Y-pheer Club</h5>
                      <span className="badge bg-primary me-1">Supportive</span>
                      <span className="badge bg-primary">Interacting</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal3">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club6.jpg" className="card-img-top" alt="Literary Club" />
                    <div className="card-body">
                      <h5 className="card-title">Literary Club</h5>
                      <span className="badge bg-primary me-1">Debate</span>
                      <span className="badge bg-primary">Speaking</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal4">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="sports.jpg" className="card-img-top" alt="Sports Club" />
                    <div className="card-body">
                      <h5 className="card-title">Sports Club</h5>
                      <span className="badge bg-primary me-1">Sports</span>
                      <span className="badge bg-primary">Fitness</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal5">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club10.jpg" className="card-img-top" alt="Radio Club" />
                    <div className="card-body">
                      <h5 className="card-title">Radio Club</h5>
                      <span className="badge bg-primary me-1">Communication</span>
                      <span className="badge bg-primary">Hearing</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal6">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional clubs */}
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club5.jpg" className="card-img-top" alt="GNH Club" />
                    <div className="card-body">
                      <h5 className="card-title">GNH Club</h5>
                      <span className="badge bg-primary me-1">Peace</span>
                      <span className="badge bg-primary">Happiness</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal7">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club8.jpg" className="card-img-top" alt="Multimedia Club" />
                    <div className="card-body">
                      <h5 className="card-title">Multimedia Club</h5>
                      <span className="badge bg-primary me-1">Visual</span>
                      <span className="badge bg-primary">Arts</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal8">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club12.jpg" className="card-img-top" alt="Spiritual Club" />
                    <div className="card-body">
                      <h5 className="card-title">Spiritual Club</h5>
                      <span className="badge bg-primary me-1">Rituals</span>
                      <span className="badge bg-primary">Offering</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal9">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club1.jpg" className="card-img-top" alt="Kuenphen Tshogpa Club" />
                    <div className="card-body">
                      <h5 className="card-title">Kuenphen Tshogpa Club</h5>
                      <span className="badge bg-primary me-1">Community</span>
                      <span className="badge bg-primary">Sustainability</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal10">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club9.jpg" className="card-img-top" alt="Nature Club" />
                    <div className="card-body">
                      <h5 className="card-title">Nature Club</h5>
                      <span className="badge bg-primary me-1">Nature</span>
                      <span className="badge bg-primary">Environment</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal11">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-4">
                  <div className="card h-100">
                    <img src="club11.jpg" className="card-img-top" alt="Rovers Club" />
                    <div className="card-body">
                      <h5 className="card-title">Rovers Club</h5>
                      <span className="badge bg-primary me-1">Participation</span>
                      <span className="badge bg-primary">Activities</span>
                      <button className="btn btn-sm btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#clubModal12">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;