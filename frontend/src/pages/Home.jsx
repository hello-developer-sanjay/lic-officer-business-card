import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const HomeContent = styled.div`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: #ffbb00;
  text-decoration: none;
`;

const Heading1 = styled.h1`
  font-size: 2.5rem;
  color: #ffbb00;
  text-align: center;
`;

const Heading2 = styled.h2`
  font-size: 1.8rem;
  color: #ffbb00;
  margin: 1rem 0;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const ContentLink = styled.a`
  color: #ffbb00;
`;

const RatingDisplay = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  color: #ffbb00;
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  margin-bottom: 1rem;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
`;

const Home = () => {
  const pageUrl = 'https://lic-neemuch-jitendra-patidar.vercel.app/';
  const metaDescription = 'Jitendra Patidar, LIC Development Officer in Neemuch, offers trusted life insurance and financial planning.';

  // Since SSR HTML is served by the backend and Vercel, we rely on hydration
  // The content below ensures client-side rendering matches SSR HTML for hydration
  return (
    <>
      <Helmet>
        <title>LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      <Layout>
        <HomeContent>
          <Navbar>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/reviews">Reviews</NavLink>
            <NavLink href="/join">Join as Agent</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/about">About</NavLink>
          </Navbar>
          <main>
            <Heading1>LIC Neemuch: Jitendra Patidar Ensures Your Secure Life</Heading1>
            <section>
              <Heading2>Welcome to LIC Neemuch</Heading2>
              <Paragraph lang="en">
                At LIC Neemuch, led by Development Officer <strong>Jitendra Patidar</strong>, we ensure your secure life through comprehensive life insurance and financial planning solutions.
              </Paragraph>
              <Paragraph lang="hi">
                नीमच में एलआईसी, विकास अधिकारी <strong>जीतेंद्र पाटीदार</strong> के नेतृत्व में, आपके सुरक्षित जीवन को सुनिश्चित करता है।
              </Paragraph>
              {/* Note: Ratings/reviews are dynamic and will be injected by SSR */}
            </section>
            <section>
              <Heading2>Contact Jitendra Patidar</Heading2>
              <Paragraph>
                📞 <strong>Contact Number:</strong>{' '}
                <ContentLink href="tel:+917987235207">+91 7987235207</ContentLink>
              </Paragraph>
              <Paragraph>
                📸 <strong>Instagram:</strong>{' '}
                <ContentLink href="https://www.instagram.com/jay7268patidar" target="_blank" rel="noopener noreferrer">
                  jay7268patidar
                </ContentLink>
              </Paragraph>
              <address>
                <strong>Office Address:</strong> Vikas Nagar, Scheme No. 14-3, Neemuch Chawni, Neemuch, Madhya Pradesh 458441
              </address>
            </section>
            <section>
              <Heading2>Recent Reviews</Heading2>
              {/* Reviews will be populated by SSR HTML */}
            </section>
          </main>
          <Footer>© EduXcel by Sanjay Patidar | June 9, 2025</Footer>
        </HomeContent>
      </Layout>
    </>
  );
};

export default Home;
