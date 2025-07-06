import { memo, useEffect } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const LicHome = memo(() => {
  useEffect(() => {
    // Load scripts dynamically
    const scripts = [
      { src: '/scripts/sidebarToggle.js', defer: true },
      { src: '/scripts/scrollToTop.js', defer: true },
      { src: '/scripts/faqToggle.js', defer: true },
      { src: '/scripts/search.js', defer: true },
      { src: '/scripts/langToggleHome.js', defer: true }, // Corrected script
      { src: '/scripts/audio.js', defer: true },
    ];

    scripts.forEach(({ src, defer }) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = defer;
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      scripts.forEach(({ src }) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) script.remove();
      });
    };
  }, []);

  return (
    <Layout>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: document.documentElement.outerHTML }} />
      </Content>
    </Layout>
  );
});

export default LicHome;
