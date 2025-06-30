import React, { useEffect, useRef, lazy, Suspense } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Helmet } from 'react-helmet';

const Rating = lazy(() => import('../components/Rating'));
const Review = lazy(() => import('../components/Review'));
const MainContainer = styled(motion.main)`
  background: linear-gradient(180deg, #050816, #010204);
  color: white;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  max-width: 800px;
  margin: 1rem 0;
  padding: 1rem;
`;

const SubHeading = styled.h2`
  font-size: 1.8rem;
  color: #ffbb00;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  border: 1px solid #ff6b6b;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  resize: vertical;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ff6b6b;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #ffbb00, #e85d04);
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Reviews = () => {
  const footerRef = useRef(null);
  const API_URL = 'https://2rw0yilbbl.execute-api.ap-south-1.amazonaws.com/prod';

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const feedback = formData.get('message');
    const query = formData.get('query');

    if (!name) {
      toast.error('कृपया अपना नाम भरें!');
      return;
    }
    if (!feedback && !query) {
      toast.error('कृपया प्रतिक्रिया या प्रश्न प्रदान करें।');
      return;
    }

    try {
      const endpoint = query ? 'submit-query' : 'submit-feedback';
      const response = await fetch(`${API_URL}/api/lic/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, feedback: feedback || query, query }),
      });

      if (response.ok) {
        toast.success(query ? 'प्रश्न भेजा गया!' : 'प्रतिक्रिया जमा की गई!');
        e.target.reset();
      } else {
        toast.error('जमा करने में त्रुटि। कृपया पुनः प्रयास करें।');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('जमा करने में त्रुटि। कृपया पुनः प्रयास करें।');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            toast.info('नमस्ते! कोई सुझाव या प्रश्न? हमें बताएं!', {
              position: 'top-right',
              autoClose: 8000,
              style: { background: '#487503', color: '#fff', borderRadius: '8px' },
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.4 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>LIC Neemuch: Reviews & Feedback</title>
        <meta name="description" content="Share your feedback, rate our services, and read reviews from other clients at LIC Neemuch with Jitendra Patidar." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lic-neemuch-jitendra-patidar.vercel.app/reviews" />
      </Helmet>
      <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <SubHeading>Reviews & Feedback</SubHeading>
        <Section>
          <SubHeading>Share Your Feedback or Query</SubHeading>
          <ContactForm
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Input type="text" name="name" placeholder="आपका नाम" required aria-label="Name" />
            <Input type="email" name="email" placeholder="आपका ईमेल" aria-label="Email" />
            <TextArea name="message" rows="4" placeholder="आपकी प्रतिक्रिया..." aria-label="Feedback" />
            <TextArea name="query" rows="4" placeholder="आपका प्रश्न..." aria-label="Query" />
            <Button type="submit" aria-label="Submit form">जमा करें</Button>
          </ContactForm>
        </Section>
        <Suspense fallback={<div>Loading...</div>}>
          <Section aria-label="Customer ratings and reviews">
            <SubHeading>Rate Our Services</SubHeading>
            <Rating />
          </Section>
          <Section>
            <SubHeading>Leave a Review</SubHeading>
            <Review />
          </Section>
        </Suspense>
        <ToastContainer position="top-right" style={{ marginTop: '80px' }} />
        <footer ref={footerRef} />
      </MainContainer>
    </>
  );
};

export default Reviews;
