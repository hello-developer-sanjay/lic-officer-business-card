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

const Home = () => {
  const ssrHtml = document.getElementById('root')?.innerHTML || '<div>SSR content not found.</div>';

  return (
    <>
      <Helmet>
        <title>LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life</title>
        <meta
          name="description"
          content="Jitendra Patidar, LIC Development Officer in Neemuch, offers trusted life insurance, financial planning, and LIC agent opportunities in Madhya Pradesh."
        />
      </Helmet>
      <Layout>
        <HomeContent>
          <div dangerouslySetInnerHTML={{ __html: ssrHtml }} />
        </HomeContent>
      </Layout>
    </>
  );
};

export default Home;
