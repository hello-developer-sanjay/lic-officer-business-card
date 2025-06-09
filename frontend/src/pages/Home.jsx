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
`;

const Home = () => {
  const pageUrl = 'https://lic-neemuch-jitendra-patidar.vercel.app/';
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
            Loading SSR content... If this persists, SSR failed.
          </Fallback>
        </HomeContent>
      </Layout>
    </>
  );
};

export default Home;
