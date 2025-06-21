import React from 'react';
import { FaInstagram, FaLinkedin, FaPhone, FaWhatsapp } from 'react-icons/fa';
import '../styles/benefit.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Business Card Footer for LIC Neemuch">
      <div className="footer-container">
        <div className="footer-brand">
          <h3 className="footer-title">
            <span lang="en">Jitendra Patidar - LIC Neemuch</span>
            <span lang="hi" className="lang-hidden">जितेंद्र पाटीदार - एलआईसी नीमच</span>
          </h3>
          <p lang="en">
            Trusted LIC Development Officer serving Neemuch, Manasa, Singoli, and Mandsaur with personalized insurance solutions since 2015.
          </p>
          <p lang="hi" className="lang-hidden">
            2015 से नीमच, मनासा, सिंगोली और मंदसौर में वैयक्तिकृत बीमा समाधानों के साथ विश्वसनीय एलआईसी डेवलपमेंट ऑफिसर।
          </p>
          <p>
            <span lang="en">📍 Vikas Nagar, Scheme No. 14-3, Neemuch, MP 458441</span>
            <span lang="hi" className="lang-hidden">📍 विकास नगर, स्कीम नंबर 14-3, नीमच, एमपी 458441</span>
          </p>
        </div>

        <div className="footer-links">
          <h3 className="footer-title">
            <span lang="en">Explore LIC Neemuch</span>
            <span lang="hi" className="lang-hidden">एलआईसी नीमच का अन्वेषण करें</span>
          </h3>
          <ul className="footer-nav">
            <li><a href="https://www.licneemuch.space/" className="footer-link" aria-label="Visit LIC Neemuch Homepage">Home</a></li>
            <li><a href="https://www.licneemuch.space/services" className="footer-link" aria-label="Explore Insurance Services">Services</a></li>
            <li><a href="https://www.licneemuch.space/reviews" className="footer-link" aria-label="View Customer Reviews">Reviews</a></li>
            <li><a href="https://www.licneemuch.space/join" className="footer-link" aria-label="Join as LIC Agent">Join as Agent</a></li>
            <li><a href="https://www.licneemuch.space/about" className="footer-link" aria-label="About LIC Neemuch">About</a></li>
            <li><a href="https://www.licneemuch.space/faqs" className="footer-link" aria-label="View LIC FAQs">FAQs</a></li>
            <li><a href="https://www.licneemuch.space/bimasakhi" className="footer-link" aria-label="Bima Sakhi Yojana">Bima Sakhi Yojana</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3 className="footer-title">
            <span lang="en">Connect with Jitendra</span>
            <span lang="hi" className="lang-hidden">जितेंद्र से जुड़ें</span>
          </h3>
          <ul className="footer-social">
            <li>
              <a
                href="tel:+917987235207"
                className="footer-social-link"
                aria-label="Call Jitendra Patidar"
              >
                <FaPhone className="footer-icon" /> <span lang="en">+91 7987235207</span>
                <span lang="hi" className="lang-hidden">+91 7987235207</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/917987235207"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Jitendra on WhatsApp"
              >
                <FaWhatsapp className="footer-icon" /> <span lang="en">WhatsApp</span>
                <span lang="hi" className="lang-hidden">व्हाट्सएप</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/do_jitendrapatidar_lic/"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Jitendra on Instagram"
              >
                <FaInstagram className="footer-icon" /> <span lang="en">Instagram</span>
                <span lang="hi" className="lang-hidden">इंस्टाग्राम</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/jitendra-patidar-lic/"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Jitendra’s LinkedIn Profile"
              >
                <FaLinkedin className="footer-icon" /> <span lang="en">LinkedIn</span>
                <span lang="hi" className="lang-hidden">लिंक्डइन</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-cta">
          <a
            href="https://www.licneemuch.space/join"
            className="cta-button"
            aria-label="Claim Free Insurance Consultation"
          >
            <span lang="en">🎁 Free Insurance Consultation</span>
            <span lang="hi" className="lang-hidden">🎁 मुफ्त बीमा परामर्श</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <span lang="en">
            © 2025 Jitendra Patidar - LIC Neemuch. All rights reserved. <em>Secure Your Future with LIC.</em>
          </span>
          <span lang="hi" className="lang-hidden">
            © 2025 जितेंद्र पाटीदार - एलआईसी नीमच। सर्वाधिकार सुरक्षित। <em>एलआईसी के साथ अपना भविष्य सुरक्षित करें।</em>
          </span>
        </p>
        <p lang="en">
          Crafted by <a href="https://www.linkedin.com/in/sanjay-patidar-/" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Visit Sanjay Patidar’s LinkedIn">Sanjay Patidar</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
