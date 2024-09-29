// src/components/Contact.js
import './Contact.scss';
import React from 'react';

const Contact = () => {
  return (
    <section id="contact">
      <h3>Contact Us</h3>
      <form action="/submit" method="POST">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" aria-required="true" />

        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" aria-required="true" />

        <label htmlFor="message">Your Message</label>
        <textarea id="message" name="message" placeholder="Enter your message" aria-required="true"></textarea>

        <button type="submit" aria-label="Submit your contact form">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
