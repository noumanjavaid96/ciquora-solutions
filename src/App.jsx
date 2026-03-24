import React, { useState, useEffect, useRef } from 'react'

// ===== NAV =====
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home">
          <img src="https://res.cloudinary.com/dmedwkbdp/image/upload/v1774354612/Ciquora-green-logo_no-background_oqya9f.png" alt="Ciquora Solutions" className="nav-logo" />
        </a>
        <div className="nav-links">
          <div className="dropdown-wrap" ref={dropdownRef}>
            <button
              className={`dropdown-trigger${dropdownOpen ? ' open' : ''}`}
              onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen) }}
            >
              Services
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className={`services-dropdown${dropdownOpen ? ' open' : ''}`}>
              <div className="dropdown-col">
                <h4>Security &amp; Governance</h4>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon">🛡️</div>
                  <div className="dd-text">
                    <strong>Cybersecurity &amp; Governance</strong>
                    <span>GRC, audit readiness, risk assessment</span>
                  </div>
                </a>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon">🔒</div>
                  <div className="dd-text">
                    <strong>Managed Security</strong>
                    <span>24/7 monitoring, MDR, virtual CISO</span>
                  </div>
                </a>
              </div>
              <div className="dropdown-col">
                <h4>Identity &amp; Access</h4>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon">🔑</div>
                  <div className="dd-text">
                    <strong>IAM Consulting</strong>
                    <span>Strategy, IGA, SailPoint</span>
                  </div>
                </a>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon">🏛️</div>
                  <div className="dd-text">
                    <strong>PAM Consulting</strong>
                    <span>CyberArk, BeyondTrust, maturity</span>
                  </div>
                </a>
              </div>
              <div className="dropdown-col">
                <h4>Cloud &amp; Healthcare</h4>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon">☁️</div>
                  <div className="dd-text">
                    <strong>Cloud Security</strong>
                    <span>CSPM, landing zones, DevSecOps</span>
                  </div>
                </a>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon">🏥</div>
                  <div className="dd-text">
                    <strong>Healthcare Interop</strong>
                    <span>HL7, FHIR, Epic &amp; Cerner</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <a href="#about">About</a>
          <a href="#cases">Results</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-cta" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Get in Touch</button>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <a href="#services" onClick={closeMobile}>Services</a>
        <a href="#about" onClick={closeMobile}>About</a>
        <a href="#cases" onClick={closeMobile}>Results</a>
        <a href="#contact" onClick={closeMobile}>Contact</a>
        <button className="nav-cta" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); closeMobile() }}>Get in Touch</button>
      </div>
    </nav>
  )
}

// ===== HERO =====
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="fade-up">
          <h1>Securing Enterprises.<br /><span className="accent">Enabling Growth.</span></h1>
          <p>We help organizations strengthen access controls, achieve audit readiness, and integrate critical systems — securely and at scale.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Book a Consultation →</a>
            <a href="#services" className="btn-outline">Explore Services</a>
          </div>
        </div>
        <div className="hero-visual fade-up">
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-num">50K+</div>
              <div className="stat-label">Privileged accounts secured</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">100+</div>
              <div className="stat-label">Enterprise engagements</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">5+</div>
              <div className="stat-label">Industries served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== COMMITMENT =====
function Commitment() {
  const items = [
    { icon: '🎯', title: 'Strategic Thinking', desc: 'We align security initiatives with your business objectives — not the other way around.' },
    { icon: '📋', title: 'Regulatory Readiness', desc: 'We prepare you for ISO 27001, SOC 2, HIPAA, and industry-specific compliance with clear evidence and remediation plans.' },
    { icon: '🤝', title: 'Trusted Partnership', desc: 'We embed with your teams, not above them. Our consultants become an extension of your capability.' },
    { icon: '🔗', title: 'Collaborative Delivery', desc: 'We work across business, risk, and engineering teams to ensure alignment from strategy through implementation.' },
    { icon: '📈', title: 'Knowledge Transfer', desc: "We don't create dependency. We build your team's capability through structured mentoring and documentation." },
    { icon: '🔐', title: 'Security-First Approach', desc: 'Every recommendation we make is grounded in real-world security principles and tested methodology.' },
  ]
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header fade-up">
          <div className="overline">Our Commitment</div>
          <h2>What You Can Expect From Us</h2>
          <p>Every engagement is built on six principles that guide how we work and what we deliver.</p>
        </div>
        <div className="commitment-grid">
          {items.map((item, i) => (
            <div className="commitment-card fade-up" key={i}>
              <div className="commitment-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== SERVICES =====
function Services() {
  const services = [
    {
      icon: '🛡️', title: 'Enterprise Cybersecurity & Governance',
      desc: 'Comprehensive GRC services that strengthen your security posture and prepare you for audit.',
      items: ['Enterprise security architecture', 'Risk and control gap assessments', 'Audit readiness (ISO 27001, SOC 2)', 'Governance reporting and KPI design'],
    },
    {
      icon: '🔑', title: 'Identity & Access Management',
      desc: 'Design and govern secure identity ecosystems — from strategy through SailPoint implementation.',
      items: ['IAM strategy and roadmap development', 'Identity governance and administration', 'SailPoint IdentityIQ advisory', 'Access certification and lifecycle design'],
    },
    {
      icon: '🏛️', title: 'Privileged Access Management',
      desc: 'Secure critical assets through enterprise-grade PAM with CyberArk and BeyondTrust expertise.',
      items: ['PAM maturity assessment and strategy', 'CyberArk advisory and implementation', 'Break-glass and emergency access design', 'Privileged account governance'],
    },
    {
      icon: '🏥', title: 'Healthcare Interoperability',
      desc: 'Connect clinical systems with standards-based integration across EMRs, HIEs, and ancillary platforms.',
      items: ['HL7 v2.x, CDA, CCDA, and FHIR integration', 'LIS, RIS, and immunization interfaces', 'Epic & Cerner integration support', 'Interface stabilization and optimization'],
    },
    {
      icon: '☁️', title: 'Cloud Security & Architecture',
      desc: 'Secure your cloud transformation across AWS, Azure, and GCP with proven architecture patterns.',
      items: ['Cloud security posture management', 'Secure landing zone design', 'DevSecOps integration', 'Multi-cloud security governance'],
    },
    {
      icon: '🤖', title: 'AI-Enabled Advisory',
      desc: 'Identify practical AI opportunities to improve security operations, identity analytics, and workflow automation.',
      items: ['AI use case identification for IAM/PAM', 'Identity analytics and anomaly detection', 'Workflow automation assessment', 'AI-supported prioritization frameworks'],
    },
  ]
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header fade-up">
          <div className="overline">Core Services</div>
          <h2>Specialized Expertise for Complex Environments</h2>
          <p>From identity governance to healthcare interoperability, we deliver consulting that drives measurable outcomes.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card fade-up" key={i}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul>{s.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              <a href="#contact" className="service-link">Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== PROCESS =====
function Process() {
  const steps = [
    { num: 1, title: 'Discover', desc: 'We assess your current state — risks, gaps, maturity, and business priorities.' },
    { num: 2, title: 'Design', desc: 'We build a tailored roadmap with clear milestones, ownership, and success criteria.' },
    { num: 3, title: 'Deliver', desc: 'We execute alongside your teams — hands-on implementation, not just slide decks.' },
    { num: 4, title: 'Sustain', desc: 'We transfer knowledge, document processes, and ensure your team can maintain what we build.' },
  ]
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header fade-up">
          <div className="overline">Our Approach</div>
          <h2>From Assessment to Outcome</h2>
          <p>A structured, transparent process that delivers measurable results at every stage.</p>
        </div>
        <div className="process-steps">
          {steps.map((s) => (
            <div className="step fade-up" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== ABOUT =====
function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content fade-up">
            <div className="overline">Who We Are</div>
            <h2>Consulting Built on Delivery, Not Decks</h2>
            <p>Ciquora Solutions is an enterprise consultancy specializing in cybersecurity, identity governance, privileged access management, cloud security, and healthcare interoperability.</p>
            <p>We work with regulated organizations — financial services, healthcare, and enterprise IT — to solve complex security and integration challenges. Our team combines deep technical expertise with practical delivery experience.</p>
            <div className="capabilities">
              <div className="capability">
                <div className="cap-icon">👥</div>
                <div>
                  <h4>Cross-Functional Teams</h4>
                  <p>Specialized pods of architects, engineers, and analysts tailored to your engagement.</p>
                </div>
              </div>
              <div className="capability">
                <div className="cap-icon">⚡</div>
                <div>
                  <h4>Enterprise-Scale Delivery</h4>
                  <p>Proven methodologies for managing large-scale implementations across complex environments.</p>
                </div>
              </div>
              <div className="capability">
                <div className="cap-icon">🔬</div>
                <div>
                  <h4>Continuous Innovation</h4>
                  <p>Dedicated research into emerging threats, AI-driven security, and evolving standards.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-visual fade-up">
            <img src="/images/company-profile.png" alt="Ciquora Solutions" />
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== INDUSTRIES =====
function Industries() {
  const items = [
    { icon: '🏥', title: 'Healthcare', desc: 'Clinical systems integration, HIPAA compliance, EHR optimization, and FHIR adoption.' },
    { icon: '🏦', title: 'Financial Services', desc: 'IAM/PAM governance, SOC 2 readiness, access control uplift, and regulatory remediation.' },
    { icon: '🏛️', title: 'Government', desc: 'Zero Trust architecture, privileged access governance, and compliance automation.' },
    { icon: '🏢', title: 'Enterprise IT', desc: 'Cloud security, identity lifecycle management, DevSecOps, and platform modernization.' },
  ]
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-header fade-up">
          <div className="overline">Industries We Serve</div>
          <h2>Deep Expertise in Regulated Sectors</h2>
          <p>We understand the unique compliance, security, and operational challenges of highly regulated industries.</p>
        </div>
        <div className="industries-grid">
          {items.map((item, i) => (
            <div className="industry-card fade-up" key={i}>
              <div className="industry-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== CASE STUDIES =====
function Cases() {
  const cases = [
    {
      tag: 'PAM Rollout',
      title: 'Securing 50,000+ Privileged Accounts at a Global Financial Institution',
      desc: 'Designed and led a multi-phase CyberArk deployment across hybrid cloud infrastructure, reducing privileged access risk exposure by 70% within the first year.',
      result: '📉 70% reduction in privileged access risk',
    },
    {
      tag: 'IAM Governance',
      title: 'Identity Governance Uplift for a Regional Healthcare Provider',
      desc: 'Implemented SailPoint IdentityIQ with automated access reviews, cutting manual certification effort by 60% and achieving audit-ready access governance in 9 months.',
      result: '⏱️ 60% faster access certifications',
    },
    {
      tag: 'Audit Readiness',
      title: 'SOC 2 Type II Readiness for a SaaS Platform',
      desc: 'Built the control framework, evidence model, and remediation backlog that took the client from zero audit preparation to successful SOC 2 Type II certification.',
      result: '✅ SOC 2 Type II achieved on first attempt',
    },
  ]
  return (
    <section className="section" id="cases">
      <div className="container">
        <div className="section-header fade-up">
          <div className="overline">Results</div>
          <h2>Outcomes That Matter</h2>
          <p>Representative engagements demonstrating the impact of our consulting approach.</p>
        </div>
        <div className="cases-grid">
          {cases.map((c, i) => (
            <div className="case-card fade-up" key={i}>
              <div className="case-tag">{c.tag}</div>
              <div className="case-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="case-result">{c.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== CTA BANNER =====
function CtaBanner() {
  return (
    <section className="cta-banner">
      <h2>Ready to Strengthen Your Security Posture?</h2>
      <p>Whether you're preparing for audit, implementing IAM/PAM, or integrating clinical systems — we can help.</p>
      <a href="#contact" className="btn-white">Book a Free Consultation →</a>
    </section>
  )
}

// ===== CONTACT =====
function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-info fade-up">
            <div className="overline">Get in Touch</div>
            <h2>Let's Talk About Your Challenges</h2>
            <p>Tell us about your environment and what you're trying to achieve. We'll connect you with the right consultant.</p>
            <div className="contact-detail">
              <div className="cd-icon">📧</div>
              <div className="cd-text">
                <strong>Email</strong>
                <span>contact@ciquora-solutions.com</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="cd-icon">📍</div>
              <div className="cd-text">
                <strong>Location</strong>
                <span>Serving clients globally</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="cd-icon">🔗</div>
              <div className="cd-text">
                <strong>LinkedIn</strong>
                <span>Connect with our team</span>
              </div>
            </div>
          </div>
          <div className="contact-form fade-up">
            <h3>Request a Consultation</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" placeholder="Jane Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company *</label>
                  <input type="text" id="company" name="company" placeholder="Acme Corp" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Work Email *</label>
                  <input type="email" id="email" name="email" placeholder="jane@acme.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="size">Company Size</label>
                  <select id="size" name="size">
                    <option value="">Select...</option>
                    <option>1–50</option>
                    <option>51–200</option>
                    <option>201–1000</option>
                    <option>1001–5000</option>
                    <option>5000+</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interest</label>
                <select id="service" name="service">
                  <option value="">Select a service...</option>
                  <option>Cybersecurity &amp; Governance</option>
                  <option>Identity &amp; Access Management</option>
                  <option>Privileged Access Management</option>
                  <option>Healthcare Interoperability</option>
                  <option>Cloud Security</option>
                  <option>AI-Enabled Advisory</option>
                  <option>Multiple / Not Sure</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Tell Us About Your Challenge *</label>
                <textarea id="message" name="message" placeholder="Describe your IAM, PAM, compliance, or integration challenges..." required></textarea>
              </div>
              <button type="submit" className="form-submit">
                {submitted ? '✓ Request Submitted' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="https://res.cloudinary.com/dmedwkbdp/image/upload/v1774354612/Ciquora-green-logo_no-background_oqya9f.png" alt="Ciquora Solutions" style={{ height: 40, filter: 'brightness(0) invert(1)' }} />
          <p>Enterprise consultancy and advisory firm specializing in cybersecurity, identity governance, privileged access management, cloud security, and healthcare IT interoperability.</p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <a href="#services">Cybersecurity &amp; Governance</a>
          <a href="#services">Identity &amp; Access Management</a>
          <a href="#services">Privileged Access Management</a>
          <a href="#services">Healthcare Interoperability</a>
          <a href="#services">Cloud Security</a>
          <a href="#services">AI-Enabled Advisory</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#cases">Results</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/terms.html">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Ciquora Solutions. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="/privacy.html">Privacy</a>
          <a href="/terms.html">Terms</a>
        </div>
      </div>
    </footer>
  )
}

// ===== SCROLL TO TOP =====
function ScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >↑</button>
  )
}

// ===== SCROLL ANIMATIONS =====
function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ===== APP =====
export default function App() {
  useFadeUp()

  return (
    <>
      <Nav />
      <Hero />
      <Commitment />
      <Services />
      <Process />
      <About />
      <Industries />
      <Cases />
      <CtaBanner />
      <Contact />
      <Footer />
      <ScrollTop />
    </>
  )
}
