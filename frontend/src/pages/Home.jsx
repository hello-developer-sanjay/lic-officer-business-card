import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #050816, #010204);
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #e0e0e0;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #050816, #010204);
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  text-align: center;
`;

const Home = () => {
  const [ssrHtml, setSsrHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSSR = async () => {
      try {
        // Check if SSR HTML is already present (mimicking Zedemy's PostPage.jsx)
        const rootElement = document.getElementById('root');
        if (rootElement?.innerHTML) {
          setSsrHtml(rootElement.innerHTML);
          setLoading(false);
          return;
        }

        // Fetch SSR HTML directly from the backend
        const response = await fetch('https://lic-backend-8jun.onrender.com/', {
          method: 'GET',
          headers: {
            'Accept': 'text/html',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rootContent = doc.getElementById('root')?.innerHTML;

        if (!rootContent) {
          throw new Error('SSR HTML content not found');
        }

        setSsrHtml(rootContent);
        setLoading(false);
      } catch (err) {
        console.error('[Home.jsx] Error fetching SSR HTML:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSSR();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <RingLoader color="#ffbb00" size={50} />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <div>{error}</div>
        <a href="/" style={{ color: '#ffbb00', marginTop: '1rem' }}>Try Again</a>
      </ErrorContainer>
    );
  }

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
