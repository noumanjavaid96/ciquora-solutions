import React, { useState, useEffect, useRef } from 'react'

// ===== SVG ICONS (matte, consistent style) =====
const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  const icons = {
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    key: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    cloud: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    target: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    clipboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    trending: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    award: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    building: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    chevDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    arrowUp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  }
  return icons[name] || null
}

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
              <Icon name="chevDown" size={16} />
            </button>
            <div className={`services-dropdown${dropdownOpen ? ' open' : ''}`}>
              <div className="dropdown-col">
                <h4>Security &amp; Governance</h4>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon"><Icon name="shield" size={18} /></div>
                  <div className="dd-text">
                    <strong>Cybersecurity &amp; Governance</strong>
                    <span>GRC, audit readiness, risk assessment</span>
                  </div>
                </a>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon"><Icon name="lock" size={18} /></div>
                  <div className="dd-text">
                    <strong>Managed Security</strong>
                    <span>24/7 monitoring, MDR, virtual CISO</span>
                  </div>
                </a>
              </div>
              <div className="dropdown-col">
                <h4>Identity &amp; Access</h4>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon"><Icon name="key" size={18} /></div>
                  <div className="dd-text">
                    <strong>IAM Consulting</strong>
                    <span>Strategy, IGA, SailPoint</span>
                  </div>
                </a>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon"><Icon name="lock" size={18} /></div>
                  <div className="dd-text">
                    <strong>PAM Consulting</strong>
                    <span>CyberArk, BeyondTrust, maturity</span>
                  </div>
                </a>
              </div>
              <div className="dropdown-col">
                <h4>Cloud &amp; Healthcare</h4>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon"><Icon name="cloud" size={18} /></div>
                  <div className="dd-text">
                    <strong>Cloud Security</strong>
                    <span>CSPM, landing zones, DevSecOps</span>
                  </div>
                </a>
                <a href="#services" onClick={() => setDropdownOpen(false)}>
                  <div className="dd-icon"><Icon name="heart" size={18} /></div>
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
          <div className="hero-badge">Enterprise Security &amp; IT Advisory</div>
          <h1>Identity-First Security.<br /><span className="accent">Enterprise-Grade Delivery.</span></h1>
          <p>We help regulated organizations implement Zero Trust, govern human and machine identities, achieve continuous compliance, and integrate critical systems — from strategy through hands-on delivery.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Book a Consultation <Icon name="arrowRight" size={16} /></a>
            <a href="#services" className="btn-outline">Explore Services</a>
          </div>
        </div>
        <div className="hero-visual fade-up">
          <img src="/images/hero-cybersecurity.png" alt="Enterprise cybersecurity" className="hero-image" />
        </div>
      </div>
    </section>
  )
}

// ===== TRUST BAR =====
function TrustBar() {
  const items = [
    { icon: 'shield', label: 'Zero Trust Advisory' },
    { icon: 'key', label: 'Identity-First Security' },
    { icon: 'clipboard', label: 'Continuous Compliance' },
    { icon: 'users', label: 'Regulated Industries' },
    { icon: 'cpu', label: 'AI-Enabled Operations' },
  ]
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {items.map((item, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-icon"><Icon name={item.icon} size={16} /></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== COMMITMENT =====
function Commitment() {
  const items = [
    { icon: 'target', title: 'Strategic Thinking', desc: 'We align security initiatives with your business objectives — tying identity, access, and compliance to measurable outcomes.' },
    { icon: 'clipboard', title: 'Regulatory Readiness', desc: 'We prepare you for ISO 27001, SOC 2, HIPAA, DORA, and evolving frameworks like NIST CSF 2.0.' },
    { icon: 'users', title: 'Trusted Partnership', desc: 'We embed with your teams, not above them. Our consultants become an extension of your capability.' },
    { icon: 'link', title: 'Collaborative Delivery', desc: 'We work across business, risk, and engineering teams to ensure alignment from roadmap through implementation.' },
    { icon: 'trending', title: 'Knowledge Transfer', desc: "We build your team's capability through structured mentoring, runbooks, and documentation — reducing long-term dependency." },
    { icon: 'shield', title: 'Zero Trust Mindset', desc: 'Every recommendation is grounded in identity-first, least-privilege principles and validated against real-world threat models.' },
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
              <div className="commitment-icon"><Icon name={item.icon} size={22} /></div>
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
      icon: 'shield', image: '/images/service-cybersecurity.png', title: 'Enterprise Cybersecurity & Governance',
      desc: 'Comprehensive GRC services that strengthen your security posture, align to NIST CSF 2.0, and prepare you for audit.',
      items: ['Enterprise security architecture and Zero Trust strategy', 'Risk and control gap assessments', 'Audit readiness (ISO 27001, SOC 2, NIST CSF 2.0)', 'Governance reporting, KPI design, and board-level metrics'],
    },
    {
      icon: 'key', image: '/images/service-iam.png', title: 'Identity & Access Management',
      desc: 'Design and govern secure identity ecosystems — covering human and machine identities from strategy through implementation.',
      items: ['IAM strategy, roadmap, and Zero Trust alignment', 'Identity governance and administration (IGA)', 'SailPoint IdentityIQ advisory and deployment', 'Machine identity governance and lifecycle automation'],
    },
    {
      icon: 'lock', image: '/images/service-pam.png', title: 'Privileged Access Management',
      desc: 'Secure critical assets through enterprise-grade PAM with CyberArk and BeyondTrust — including ITDR and session monitoring.',
      items: ['PAM maturity assessment and strategy', 'CyberArk and BeyondTrust advisory and implementation', 'Identity Threat Detection & Response (ITDR)', 'Privileged account governance and Just-in-Time access'],
    },
    {
      icon: 'heart', image: '/images/service-healthcare.png', title: 'Healthcare Interoperability',
      desc: 'Connect clinical systems with standards-based integration across EMRs, HIEs, and ancillary platforms — aligned to CMS mandates.',
      items: ['HL7 v2.x, CDA, CCDA, and FHIR R4 integration', 'LIS, RIS, and immunization registry interfaces', 'Epic & Cerner integration and 21st Century Cures compliance', 'Interface stabilization, monitoring, and optimization'],
    },
    {
      icon: 'cloud', image: '/images/service-cloud.png', title: 'Cloud Security & Architecture',
      desc: 'Secure your cloud transformation across AWS, Azure, and GCP with proven architecture patterns and continuous posture management.',
      items: ['Cloud security posture management (CSPM/CNAPP)', 'Secure landing zone and guardrail design', 'DevSecOps pipeline integration and shift-left security', 'Multi-cloud identity governance and SASE alignment'],
    },
    {
      icon: 'cpu', image: '/images/service-managed.png', title: 'AI-Enabled Advisory',
      desc: 'Apply AI and automation to identity operations — from anomaly detection to intelligent access reviews and workflow automation.',
      items: ['AI use case identification for IAM/PAM operations', 'Identity analytics, UEBA, and anomaly detection', 'Intelligent access certification and auto-remediation', 'GenAI-assisted policy creation and risk scoring'],
    },
  ]
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header fade-up">
          <div className="overline">Core Services</div>
          <h2>Specialized Expertise for Complex Environments</h2>
          <p>From identity governance to healthcare interoperability, we deliver consulting that drives measurable outcomes in complex, regulated environments.</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card fade-up" key={i}>
              <div className="service-card-image">
                <img src={s.image} alt={s.title} />
              </div>
              <div className="service-card-body">
                <div className="service-icon"><Icon name={s.icon} size={20} /></div>
                <h3>{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <ul>{s.items.map((item, j) => <li key={j}><Icon name="check" size={14} color="#0d7377" /> <span>{item}</span></li>)}</ul>
                <a href="#contact" className="service-link">Learn more <Icon name="arrowRight" size={14} /></a>
              </div>
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
            <p>Ciquora Solutions is an enterprise consultancy specializing in cybersecurity, identity governance, privileged access management, cloud security, and healthcare interoperability. Our consultants average 12+ years in enterprise security — with hands-on deployment experience across SailPoint, CyberArk, and major cloud platforms.</p>
            <p>We work with regulated organizations — financial services, healthcare, government, and enterprise IT — to solve complex security and integration challenges. Every engagement is structured around measurable outcomes, knowledge transfer, and long-term organizational capability.</p>
            <div className="capabilities">
              <div className="capability">
                <div className="cap-icon"><Icon name="users" size={18} /></div>
                <div>
                  <h4>Cross-Functional Teams</h4>
                  <p>Specialized pods of architects, engineers, and analysts tailored to your engagement.</p>
                </div>
              </div>
              <div className="capability">
                <div className="cap-icon"><Icon name="trending" size={18} /></div>
                <div>
                  <h4>Enterprise-Scale Delivery</h4>
                  <p>Proven methodologies for managing large-scale implementations across complex environments.</p>
                </div>
              </div>
              <div className="capability">
                <div className="cap-icon"><Icon name="cpu" size={18} /></div>
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
    { icon: 'heart', title: 'Healthcare', desc: 'Clinical systems integration, HIPAA and HITRUST compliance, EHR optimization, FHIR adoption, and 21st Century Cures alignment.' },
    { icon: 'building', title: 'Financial Services', desc: 'IAM/PAM governance, SOC 2 and DORA readiness, PCI DSS compliance, access control uplift, and regulatory remediation.' },
    { icon: 'globe', title: 'Government', desc: 'Zero Trust architecture, FedRAMP and CMMC alignment, privileged access governance, and continuous compliance automation.' },
    { icon: 'cloud', title: 'Enterprise IT', desc: 'Cloud security, identity lifecycle management, machine identity governance, DevSecOps, and platform modernization.' },
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
              <div className="industry-icon"><Icon name={item.icon} size={28} /></div>
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
      title: 'Securing Privileged Accounts at a Global Financial Institution',
      desc: 'Designed and led a multi-phase CyberArk deployment across hybrid cloud infrastructure, reducing privileged access risk exposure by 74% and onboarding 12,000+ accounts within the first year.',
      icon: 'lock',
    },
    {
      tag: 'IAM Governance',
      title: 'Identity Governance Uplift for a Regional Healthcare Provider',
      desc: 'Implemented SailPoint IdentityIQ with automated access reviews, cutting manual certification effort by 85% and achieving audit-ready access governance across 30,000+ identities.',
      icon: 'key',
    },
    {
      tag: 'Audit Readiness',
      title: 'SOC 2 Type II Readiness for a SaaS Platform',
      desc: 'Built the control framework, evidence model, and remediation backlog that took the client from zero audit preparation to successful SOC 2 Type II certification in under 6 months.',
      icon: 'clipboard',
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
              <div className="case-icon"><Icon name={c.icon} size={24} /></div>
              <div className="case-tag">{c.tag}</div>
              <div className="case-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <a href="#contact" className="case-link">Discuss a similar engagement <Icon name="arrowRight" size={14} /></a>
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
      <p>Whether you're implementing Zero Trust, preparing for SOC 2 or DORA, governing machine identities, or integrating clinical systems — we can help.</p>
      <a href="#contact" className="btn-white">Book a Consultation <Icon name="arrowRight" size={16} /></a>
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
              <div className="cd-icon"><Icon name="mail" size={18} /></div>
              <div className="cd-text">
                <strong>Email</strong>
                <span>contact@ciquora-solutions.com</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="cd-icon"><Icon name="mapPin" size={18} /></div>
              <div className="cd-text">
                <strong>Location</strong>
                <span>Serving clients globally</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="cd-icon"><Icon name="link" size={18} /></div>
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
                {submitted ? 'Request Submitted' : 'Submit Request'}
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
          <p>Enterprise advisory firm specializing in identity governance, privileged access management, Zero Trust, cloud security, and healthcare IT interoperability for regulated industries.</p>
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
    ><Icon name="arrowUp" size={20} /></button>
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
      <TrustBar />
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
