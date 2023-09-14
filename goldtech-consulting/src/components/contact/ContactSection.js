import React from 'react';
import './ContactSection.css'
import Navigation from '../nav/Navbar'; 
import { Form, Button } from 'react-bootstrap';

function ContactSection({ scrollTo }) {
    return (
      <div className="contact-container h-screen flex flex-col justify-center items-center">
        <Navigation scrollTo={scrollTo}/>
        <section id="contact">
          <div className="contact-section">
            <h2>Contact Form</h2>
            <Form>
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
