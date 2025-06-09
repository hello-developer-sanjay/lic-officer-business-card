import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroTitle = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #ffbb00;
  text-align: center;
  margin: 1rem 0;
  text-shadow: 0 2px 4px rgba(255, 187, 0, 0.5);
`;

const SectionHeading = styled.h2`
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  color: #ffbb00;
  margin: 1.5rem 0 1rem;
`;

const ContentText = styled.p`
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.8;
  margin-bottom: 1rem;
  color: #e0e0e0;
`;

const ContentLink = styled(Link)`
  color: #ffbb00;
  text-decoration: none;
  &:hover {
    color: #e85d04;
  }
`;

const ExternalLink = styled.a`
  color: #ffbb00;
  text-decoration: none;
  &:hover {
    color: #e85d04;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.6);
  object-fit: cover;
  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const OfficeImage = styled.img`
  width: 600px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  margin: 1rem;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const RatingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  color: #ffbb00;
`;

const ReviewItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #e0e0e0;
`;

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  text-align: center;
  color: #e0e0e0;
`;

const Home = () => {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // Read the initial data passed from SSR
    const data = window.__INITIAL_DATA__ || {
      averageRating: 0,
      ratingCount: 0,
      reviews: [],
    };
    setInitialData(data);
  }, []);

  if (!initialData) {
    return <div>Loading...</div>;
  }

  const { averageRating, ratingCount, reviews } = initialData;

  const renderStars = (rating) => {
    const starCount = Math.round(rating);
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < starCount ? '★' : '☆';
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life</title>
        <meta
          name="description"
          content={`Jitendra Patidar, LIC Development Officer in Neemuch, offers trusted life insurance, financial planning, and LIC agent opportunities in Madhya Pradesh. Rated ${averageRating}/5 by ${ratingCount} clients.`}
        />
      </Helmet>
      <Container>
        <main role="main">
          <HeroTitle>LIC Neemuch: Jitendra Patidar Ensures Your Secure Life</HeroTitle>
          <article>
            <section aria-labelledby="welcome-heading">
              <SectionHeading id="welcome-heading">Welcome to LIC Neemuch</SectionHeading>
              <ContentText lang="en">
                At LIC Neemuch, led by Development Officer <strong>Jitendra Patidar</strong>, we ensure your secure life through comprehensive life insurance and financial planning solutions. Serving Neemuch, Mandsaur, Ratangarh, Singoli, Manasa, Jawad, and Sarwaniya Maharaj, our mission is to empower families with trusted LIC policies for a secure future. Whether you seek term insurance, endowment plans, ULIPs, pension plans, or child plans, we offer personalized services to safeguard your life.
              </ContentText>
              <ContentText lang="hi">
                नीमच में एलआईसी, विकास अधिकारी <strong>जीतेंद्र पाटीदार</strong> के नेतृत्व में, आपके सुरक्षित जीवन को सुनिश्चित करता है। नीमच, मंदसौर, रतनगढ़, सिंगोली, मनासा, जावद और सरवानीयाँ महाराज की सेवा करते हुए, हमारा मिशन विश्वसनीय एलआईसी पॉलिसियों के माध्यम से परिवारों को सुरक्षित भविष्य प्रदान करना है। टर्म इंश्योरेंस, एंडोमेंट प्लान, ULIP, पेंशन प्लान, या चाइल्ड प्लान, हम आपके जीवन की सुरक्षा के लिए वैयक्तिकृत सेवाएँ प्रदान करते हैं।
              </ContentText>
              {ratingCount > 0 && averageRating >= 1 && (
                <RatingDisplay aria-label="Average customer rating">
                  <span>{renderStars(averageRating)}</span>
                  <span>
                    {averageRating}/5 ({ratingCount} reviews)
                  </span>
                </RatingDisplay>
              )}
            </section>
            <section aria-labelledby="contact-heading">
              <SectionHeading id="contact-heading">Contact Jitendra Patidar for a Secure Life</SectionHeading>
              <figure className="profile-figure">
                <ProfileImage
                  src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/jitendraprofilephoto.jpg"
                  alt="Jitendra Patidar, LIC Development Officer ensuring secure life"
                  width="300"
                  height="300"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
                <figcaption className="sr-only">Profile photo of Jitendra Patidar</figcaption>
              </figure>
              <ContentText>
                📞 <strong>Contact Number:</strong>{' '}
                <ExternalLink href="tel:+917987235207">+91 7987235207</ExternalLink>
              </ContentText>
              <ContentText>
                📸 <strong>Instagram:</strong>{' '}
                <ExternalLink href="https://www.instagram.com/jay7268patidar" target="_blank" rel="noopener noreferrer">
                  jay7268patidar
                </ExternalLink>
              </ContentText>
              <address className="content-text">
                <strong>Office Address:</strong> Vikas Nagar, Scheme No. 14-3, Neemuch Chawni, Neemuch, Madhya Pradesh 458441
              </address>
              <ContentText>
                Ready to ensure your secure life? Visit the{' '}
                <ExternalLink href="https://licindia.in/hi/home" target="_blank" rel="noopener noreferrer">
                  LIC India website
                </ExternalLink>{' '}
                or our <ContentLink to="/services">services page</ContentLink> for more details.
              </ContentText>
            </section>
            <section aria-labelledby="agent-heading">
              <SectionHeading id="agent-heading">Become an LIC Agent with Jitendra Patidar</SectionHeading>
              <ContentText lang="en">
                Join Jitendra Patidar’s team at LIC Neemuch as an LIC agent to ensure a secure career. Enjoy flexible hours, comprehensive training, and attractive commissions. Start by passing the IRDAI exam and completing LIC’s training program.{' '}
                <ContentLink to="/join">Learn more about secure agent opportunities</ContentLink>.
              </ContentText>
              <ContentText lang="hi">
                नीमच में जीतेंद्र पाटीदार की टीम में एलआईसी एजेंट के रूप में शामिल होकर सुरक्षित करियर सुनिश्चित करें। लचीले घंटों, व्यापक प्रशिक्षण और आकर्षक कमीशन का आनंद लें। IRDAI परीक्षा पास करें और LIC का प्रशिक्षण पूरा करें।{' '}
                <ContentLink to="/join">सुरक्षित एजेंट अवसरों के बारे में और जानें</ContentLink>।
              </ContentText>
            </section>
            <OfficeImage
              src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp"
              alt="LIC Neemuch Office ensuring secure life insurance"
              width="600"
              height="200"
              loading="lazy"
              decoding="async"
            />
            <section aria-labelledby="reviews-heading">
              <SectionHeading id="reviews-heading">Recent Reviews</SectionHeading>
              {reviews.length > 0 ? (
                <>
                  <ul className="review-list">
                    {reviews.map((review, index) => (
                      <ReviewItem key={index}>
                        <strong>{review.username}:</strong> {review.comment}
                      </ReviewItem>
                    ))}
                  </ul>
                  <ContentText>
                    Want to leave a review or rating? Visit our{' '}
                    <ContentLink to="/reviews">Reviews & Feedback page</ContentLink>.
                  </ContentText>
                </>
              ) : (
                <ContentText>
                  No reviews yet. Be the first to leave a review on our{' '}
                  <ContentLink to="/reviews">Reviews & Feedback page</ContentLink>.
                </ContentText>
              )}
            </section>
          </article>
        </main>
        <Footer>
          <ContentText>
            Discover{' '}
            <ExternalLink href="https://zedemy.vercel.app" target="_blank" rel="noopener noreferrer">
              Zedemy
            </ExternalLink>{' '}
            by Sanjay Patidar
          </ContentText>
          <ContentText>
            © <strong>EduXcel</strong> by Sanjay Patidar | June 9, 2025
          </ContentText>
        </Footer>
      </Container>
    </>
  );
};

export default Home;
