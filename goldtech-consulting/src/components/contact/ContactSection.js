import React from 'react';
import './ContactSection.css'
import Navigation from '../nav/Navbar'; 
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function ContactSection({ scrollTo }) {
  const handleSubmit = async (event) => {
      event.preventDefault();

      const email = event.target.formBasicEmail.value;
      const subject = event.target.formBasicSubject.value;
      const message = event.target.formBasicMessage.value;

      try {
          const response = await axios.post(
              'https://3myxbr87g6.execute-api.us-east-2.amazonaws.com/default',
              {
                  email: email,
                  subject: subject,
                  message: message
              },
              {
                  headers: {
                      'x-api-key': 'I3z5vv3C7K4IWQxrWbPeC334cGo9fjQo4KEjUE2D'
                  }
              }
          );

          if (response.data.message) {
              console.log(response.data.message); // or display it on the page
          }
      } catch (error) {
          console.error('Failed to send message:', error); // handle error appropriately in UI
      }
    };
    return (
      <div className="contact-container h-screen flex flex-col justify-center items-center">
        <Navigation scrollTo={scrollTo}/>
        <section id="contact">
          <div className="contact-section">
            <h2>Contact Form</h2>
            <Form  onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Subject" />
                </Form.Group>

                <Form.Group controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Your message..." />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
          </div>
        </section>
      </div>
    );
}

export default ContactSection;
