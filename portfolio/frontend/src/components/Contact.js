import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can replace this with a real API call to your backend
    try {
      const response = await axios.post('/api/contact', { message });
      console.log('Message sent!', response.data);
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <section>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Your message"
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Contact;
