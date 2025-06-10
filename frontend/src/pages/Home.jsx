import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const HomeContent = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Fallback = styled.div`
  color: #ffbb00;
  text-align: center;
  font-family: sans-serif;
  background: linear-gradient(180deg, #050816, #010204);
  padding: 40px;
  font-size: 1.5rem;
`;

const Home = () => {
  const pageUrl = 'https://lic-backend-8jun.onrender.com/';
  const metaDescription = 'Jitendra Patidar, LIC Development Officer in Neemuch, offers trusted life insurance and financial planning.';

  return (
    <>
      <Helmet>
        <title>LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      <Layout>
        <HomeContent>
          <Fallback>
            Content failed to load. Check console for [index.jsx] logs.
          </Fallback>
        </HomeContent>
      </Layout>
    </>
  );
};

export default Home;
