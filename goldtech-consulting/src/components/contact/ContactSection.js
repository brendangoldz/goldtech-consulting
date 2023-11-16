import React, { useState } from 'react';
import './ContactSection.css'
import Navigation from '../nav/Navbar';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaCheck, FaX } from 'react-icons/fa6'; // Importing check icon from react-icons

function ContactSection({ scrollTo }) {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [didFail, setFailure] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return re.test(String(email).toLowerCase());
    };

    const updateEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsEmailValid(validateEmail(newEmail));
        checkFormValidity();
    };

    const updateSubject = (e) => {
        const newSubject = e.target.value;
        setSubject(newSubject);
        checkFormValidity();
    };

    const updateMessage = (e) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
        checkFormValidity();
    };

    const checkFormValidity = () => {
        setIsFormValid(
            email.length > 0 &&
            subject.length > 0 &&
            message.length > 0 &&
            isEmailValid
        );
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        checkFormValidity();
        if(!isFormValid) { 
            setFailure(true);
            return;
        }
        const email = event.target.formBasicEmail.value;
        const subject = event.target.formBasicSubject.value;
        const message = event.target.formBasicMessage.value;

        try {
            const response = await axios.post(
                'https://3myxbr87g6.execute-api.us-east-2.amazonaws.com/contact/',
                {
                    "email": email,
                    "subject": subject,
                    "message": message
                },
                {
                    headers: {
                        'x-api-key': 'I3z5vv3C7K4IWQxrWbPeC334cGo9fjQo4KEjUE2D',
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                console.log(response); // or display it on the page
                setIsSubmitted(true);
                setFailure(false);

            } else {
                console.log(response)
                setIsSubmitted(true);
                setFailure(true);
            }
            setTimeout(() => {
                setIsSubmitted(false); // Optionally reset after a certain time
                setFailure(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to send message:', error.response); // handle error appropriately in UI
        }
    };

    return (
        <div className="contact-container h-screen flex flex-col justify-center items-center">
          <Navigation scrollTo={scrollTo}/>
          <h2>Contact Form</h2>
          <section id="contact">
            <div className="contact-section">
              <Form className="form" onSubmit={handleSubmit}>
                <Form.Group className="form-group" controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={updateEmail}
                    />
                    {!isEmailValid && <div className="invalid-feedback">Invalid email address</div>}
                </Form.Group>
    
                <Form.Group className="form-group" controlId="formBasicSubject">
                    <Form.Label>Subject:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={updateSubject}
                    />
                </Form.Group>
    
                <Form.Group className="form-group" controlId="formBasicMessage">
                    <Form.Label>Message:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Your message..."
                      value={message}
                      onChange={updateMessage}
                    />
                </Form.Group>
                
                <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid}
                    className={isSubmitted ? (didFail ? 'submit-failure' : 'submit-success') : ''}
                >
                    {isSubmitted ? (!didFail ? <FaCheck className="icon" /> : <FaX className="icon" />) : 'Submit'}
                </Button>
              </Form>
            </div>
          </section>
        </div>
      );
    }
    
    export default ContactSection;