import React from "react";

function ProfileUpdate() {
    const sections = [
        { title: 'Your career preferences', description: 'Preferred job type', action: 'Add work availability' },
        { title: 'Education', description: 'B.Tech/B.E. from Dhirajlal Gandhi College of Technology, Salem' },
        { title: 'Key skills', description: 'ReactJs, NodeJs, NestJs, PostgreSQL, Redux, Linux' },
        { title: 'Languages', description: 'English' },
        { title: 'Internships', description: 'Lucifer Software Solution' },
        { title: 'Projects', description: 'Food Ordering System' },
        { title: 'Profile Summary', description: 'Write a meaningful summary of more than 50 characters.' },
        { title: 'Accomplishments', description: '' },
        { title: 'Certifications', description: 'NPTEL Project Management Course' },
        { title: 'Awards', description: '' },
        { title: 'Clubs & committees', description: '' },
        { title: 'Competitive exams', description: '' },
      ];
  return (
    <div className="row">
     

      <div className="container px-3 py-1 col-12">
        {sections.map((section, index) => (
          <div key={index} className="profile-card mb-3 p-5 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="fw-bold">
                  {section.title} <i className="bi bi-pencil ms-2"></i>
                </h6>
                {section.description && (
                  <p className="text-muted small mt-1 mb-0">
                    {section.description}
                  </p>
                )}
              </div>
              <div className="text-primary small cursor-pointer">Add</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileUpdate;
