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
  font-weight: normal;
  animation: pulse 500ms ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
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
  const [loading, setLoading] = useState(!window.__INITIAL_DATA__);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if SSR data is available
    if (window.__INITIAL_DATA__) {
      const rootElement = document.getElementById('root');
      const htmlContent = rootElement.getAttribute('data-html') || '';
      setSsrHtml(htmlContent);
      setLoading(false);
    } else {
      // Fetch SSR HTML dynamically if not available (e.g., on client-side navigation)
      fetch('/')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch SSR HTML');
          }
          return response.text();
        })
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const rootElement = doc.getElementById('root');
          const htmlContent = rootElement?.getAttribute('data-html') || '';
          if (!htmlContent) {
            throw new Error('SSR HTML content not found');
          }
          setSsrHtml(htmlContent);
          setLoading(false);
        })
        .catch(error => {
          console.error('[Home.jsx] Error fetching SSR HTML:', error);
          setError(error.message);
          setLoading(false);
        });
    }
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
