import React from 'react';

const Blog = () => {
  return (
    <div className="container py-5">
      {/* Custom styles for Believe Jobs blue theme */}
      <style>{`
        .believe-blue {
          color: #004080 !important;
        }
        .believe-bg-blue {
          background-color: #004080 !important;
        }
        .believe-border-blue {
          border-color: #004080 !important;
        }
        .believe-btn-blue {
          background-color: #004080 !important;
          color: #fff !important;
          border: none;
        }
        .believe-btn-blue:hover, .believe-btn-blue:focus {
          background-color: #003366 !important;
          color: #fff !important;
        }
        .believe-outline-btn {
          border: 2px solid #004080 !important;
          color: #004080 !important;
          background: #fff !important;
        }
        .believe-outline-btn:hover, .believe-outline-btn:focus {
          background: #004080 !important;
          color: #fff !important;
        }
        .believe-card {
          border: 2px solid #004080 !important;
          border-radius: 12px;
        }
        .believe-card .card-body {
          min-height: 160px;
        }
        .believe-section-title {
          color: #004080;
          font-weight: 700;
        }
        .believe-section-subtitle {
          color: #004080;
          font-weight: 500;
        }
        .believe-divider {
          border-top: 3px solid #004080;
          width: 80px;
          margin: 0 auto 24px auto;
        }
        .believe-bg-lightblue {
          background: #f4f8fc !important;
        }
        .tick-blue {
          color: #004080 !important;
        }
      `}</style>

      <section className="text-center my-5">
        <h1 className="display-4 fw-bold believe-blue mb-3">Talent Talks</h1>
        <p className="lead believe-section-subtitle">
          Bridging the gap between job seekers and employers
        </p>
        <div className="d-flex justify-content-center">
          <div className="believe-divider"></div>
        </div>
        <p className="text-muted">
          India's trusted blog for career advice, recruitment trends, and inspiring success stories
        </p>
      </section>

      <section className="my-5 p-4 believe-bg-lightblue rounded-3">
        <div className="row align-items-center">
          <div className="col-md-2 text-center mb-3 mb-md-0">
            <span className="believe-blue" style={{fontSize: '50px'}}>🚀</span>
          </div>
          <div className="col-md-10">
            <h2 className="h4 mb-3 believe-section-title">What is Talent Talks?</h2>
            <p>
              Talent Talks is a knowledge-driven blog curated by BelieveJobs.com, designed to share real experiences, offer actionable job search tips, help employers with branding, highlight job market trends, and promote skill development.
            </p>
          </div>
        </div>
      </section>

      <section className="my-5">
        <h2 className="text-center my-4 believe-section-title">
          <span className="believe-blue me-2" style={{fontSize: '1.5rem'}}>💡</span>
          Key Topics We Cover
        </h2>
        
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 believe-card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="believe-blue me-2" style={{fontSize: '1.5rem'}}>📄</span>
                  <h3 className="h5 mb-0 believe-section-title" style={{fontWeight: 600}}>Career-Building Advice</h3>
                </div>
                <p className="card-text">
                  Learn how to write powerful resumes, crack interviews, and leverage job portals effectively.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 believe-card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="believe-blue me-2" style={{fontSize: '1.5rem'}}>👔</span>
                  <h3 className="h5 mb-0 believe-section-title" style={{fontWeight: 600}}>Success Stories</h3>
                </div>
                <p className="card-text">
                  Discover how real people found real jobs using BelieveJobs and stayed motivated during tough times.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 believe-card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="believe-blue me-2" style={{fontSize: '1.5rem'}}>📈</span>
                  <h3 className="h5 mb-0 believe-section-title" style={{fontWeight: 600}}>Employer Insights</h3>
                </div>
                <p className="card-text">
                  Explore what top recruiters are looking for and how they build winning teams.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 believe-card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="believe-blue me-2" style={{fontSize: '1.5rem'}}>💻</span>
                  <h3 className="h5 mb-0 believe-section-title" style={{fontWeight: 600}}>Workplace Trends</h3>
                </div>
                <p className="card-text">
                  Stay informed about remote jobs, flexible careers, hybrid work culture, and hiring patterns.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 believe-card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <span className="believe-blue me-2" style={{fontSize: '1.5rem'}}>🧠</span>
                  <h3 className="h5 mb-0 believe-section-title" style={{fontWeight: 600}}>Motivation & Mindset</h3>
                </div>
                <p className="card-text">
                  Job search can be stressful. We focus on mental well-being and staying resilient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5 p-4 believe-bg-blue text-white rounded-3">
        <div className="row align-items-center">
          <div className="col-md-2 text-center mb-3 mb-md-0">
            <span style={{fontSize: '50px'}}>🌍</span>
          </div>
          <div className="col-md-10">
            <h2 className="h4 mb-3" style={{color: "#fff", fontWeight: 700}}>Why Believe in Talent?</h2>
            <p style={{color: "#e6e6e6"}}>
              At BelieveJobs, we know that every resume tells a story—and every job seeker has untapped potential. We're more than just a job listing platform; we're a community where talent meets opportunity.
            </p>
            <p style={{color: "#e6e6e6"}}>
              Whether you're in Chennai, Bangalore, Mumbai, or a Tier 2 city, we are committed to helping you find your next job online and get noticed by recruiters.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center p-4 believe-bg-lightblue rounded-3">
        <span className="believe-blue my-3" style={{fontSize: '40px'}}>📢</span>
        <h2 className="h4 mb-3 believe-section-title">Get Featured on Talent Talks</h2>
        <p className="mb-4">
          Have an inspiring job story? Want to share tips or insights from your recruitment journey? 
          Reach out to us—we'd love to feature your voice in our next edition of Talent Talks.
        </p>
        <button className="btn believe-btn-blue btn-lg">Contact Us</button>
      </section>

      {/* Interview Tips Section */}
      <section className="my-5 p-4 believe-bg-lightblue rounded-3">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="h3 mb-4 believe-section-title text-center">Ace Your Interview: Smart Tips to Stand Out from the Crowd</h2>
            <p className="mb-4">
              Preparing for a job interview isn't just about having the right answers — it's about making the right impression. At BelieveJobs, we believe that a confident, well-prepared candidate can turn any interview into a career breakthrough.
            </p>
            <p className="mb-3">Here are some smart, lesser-known tips to help you shine:</p>
            <ul className="list-unstyled" style={{color:'#004080'}}>
              <li className="mb-3"><span className="me-2 tick-blue">✓</span> <strong>Tailor Your Answers</strong> – Read the job description carefully and align your responses to what the employer truly needs. Customize examples that reflect your strengths for that specific role.</li>
              <li className="mb-3"><span className="me-2 tick-blue">✓</span> <strong>Practice with Purpose</strong> – Instead of memorizing answers, focus on telling short, impactful stories using the STAR method (Situation, Task, Action, Result). Real-life wins are more convincing than buzzwords.</li>
              <li className="mb-3"><span className="me-2 tick-blue">✓</span> <strong>Mind Your Body Language</strong> – Interviews aren't just verbal. Sit tall, maintain eye contact, and offer a genuine smile. Confidence isn't loud — it's visible.</li>
              <li className="mb-3"><span className="me-2 tick-blue">✓</span> <strong>Ask Thoughtful Questions</strong> – Show you're not just looking for a job, but a career. Ask about team culture, success metrics, or upcoming challenges.</li>
            </ul>
            <p className="mb-4">
              Remember, every interview is a two-way conversation. Use it to present your best self and learn if the company fits your growth path.
            </p>
            <div className="text-center">
              <a href="https://believejobs.com" className="btn believe-btn-blue">
                <span className="me-2">🔗</span> Ready to take the next step? Explore job openings and career support at BelieveJobs.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Salary Insights Section */}
      <section className="my-5 p-4 rounded-3 believe-card">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="h3 mb-4 believe-section-title text-center">Salary Insights: Know Your Worth Before You Negotiate</h2>
            <p className="mb-4">
              Understanding your market value is the first step to smart career growth. At BelieveJobs, we believe that being well-informed empowers candidates to negotiate confidently and land fair compensation.
            </p>
            <ul className="list-unstyled" style={{color:'#004080'}}>
              <li className="mb-3"><span className="believe-blue me-2">💰</span> <strong>Research Industry Standards:</strong> Use trusted platforms and company reviews to compare salaries for similar roles in your region and sector.</li>
              <li className="mb-3"><span className="believe-blue me-2">📊</span> <strong>Consider More Than Just Pay:</strong> Evaluate benefits, growth opportunities, and work-life balance. A slightly lower salary may come with valuable perks like health insurance, flexible hours, or upskilling support.</li>
              <li className="mb-3"><span className="believe-blue me-2">🎯</span> <strong>Know When to Negotiate:</strong> The best time to discuss salary is after you've demonstrated your value. Be honest, clear, and professional with your expectations.</li>
            </ul>
            <p className="mb-4">
              Remember, salary isn't just about numbers—it's about what you're bringing to the table and what aligns with your career goals.
            </p>
            <div className="text-center">
              <a href="https://believejobs.com" className="btn believe-outline-btn">
                <span className="me-2">🔍</span> Ready to explore your worth? Find your next opportunity with confidence at BelieveJobs.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search Tools Section */}
      <section className="my-5 p-4 believe-bg-blue text-white rounded-3">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="h3 mb-4 text-center" style={{color: "#fff", fontWeight: 700}}>Job Search Tools: Your Smart Companion to Land the Right Job</h2>
            <p className="mb-4" style={{color: "#e6e6e6"}}>
              Finding the perfect job today is more strategic than ever—and with the right tools, it becomes faster, smarter, and more effective. At BelieveJobs, we help you move beyond random applications to targeted success.
            </p>
            <ul className="list-unstyled" style={{color: "#e6e6e6"}}>
              <li className="mb-3"><span className="me-2">🧭</span> <strong>Resume Builders & Templates:</strong> A well-formatted, keyword-optimized resume increases your chances of getting shortlisted. Use intuitive resume tools to make yours stand out.</li>
              <li className="mb-3"><span className="me-2">🔔</span> <strong>Job Alerts & Filters:</strong> Save time by setting personalized alerts based on your skills, location, and salary expectations. Let opportunities come to you.</li>
              <li className="mb-3"><span className="me-2">💬</span> <strong>AI-Powered Matchmaking:</strong> Advanced platforms now suggest jobs based on your profile, preferences, and past applications—just like BelieveJobs does!</li>
              <li className="mb-3"><span className="me-2">🧠</span> <strong>Interview Prep & Salary Estimators:</strong> Tools that help you practice interviews or compare salaries can give you the confidence you need to ace the next big step.</li>
            </ul>
            <p className="mb-4" style={{color: "#e6e6e6"}}>
              Smart job seekers use smart tools. Make your search faster, focused, and fruitful with BelieveJobs.com—your job journey, simplified.
            </p>
          </div>
        </div>
      </section>

      {/* Career Coaching Section */}
      <section className="my-5 p-4 believe-bg-lightblue rounded-3">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="h3 mb-4 believe-section-title text-center">Career Coaching: Unlock Your Professional Potential</h2>
            <p className="mb-4">
              Feeling stuck in your job search or unsure of your next career move? You're not alone—and that's where career coaching comes in. At BelieveJobs, we believe in more than just helping you find a job; we guide you toward building a career you love.
            </p>
            <div className="row" style={{color:'#004080'}}>
              <div className="col-md-6 mb-3">
                <div className="d-flex">
                  <span className="believe-blue me-2">🎯</span>
                  <div>
                    <strong>Clarity & Direction:</strong> A career coach helps you discover your strengths, set realistic goals, and align your passions with the right roles.
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex">
                  <span className="believe-blue me-2">📈</span>
                  <div>
                    <strong>Skill Gap Analysis:</strong> Coaches identify areas of improvement and suggest learning paths to boost your market value.
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex">
                  <span className="believe-blue me-2">💬</span>
                  <div>
                    <strong>Interview & Resume Guidance:</strong> From crafting powerful resumes to mastering interviews, career coaching gives you the edge to stand out.
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex">
                  <span className="believe-blue me-2">🔄</span>
                  <div>
                    <strong>Career Shifts Made Easier:</strong> Whether you're switching industries or returning after a break, expert guidance can smooth the transition.
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center mt-4">
              Investing in career coaching isn't just smart—it's transformative. Let BelieveJobs connect you to professionals who help turn ambition into action.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center my-5">
        <h3 className="mb-3 believe-section-title">Let Your Talent Talk</h3>
        <p className="lead mb-4">
          Your future doesn't wait—and neither should you. Believe in your skills. Believe in your journey. 
          Believe in your future. And most of all—<br />
          <strong>Believe in Jobs. Believe in You.</strong>
        </p>
        <a href="https://believejobs.com" className="btn believe-outline-btn btn-lg">
          Visit BelieveJobs.com
        </a>
      </section>
    </div>
  );
};

export default Blog;