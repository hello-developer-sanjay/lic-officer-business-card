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
    // Inline script logic (no external dependencies)
    function toggleSidebar() {
      const menu = document.getElementById('nav-menu');
      const toggle = document.querySelector('.nav-toggle');
      if (menu && toggle) {
        menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', menu.classList.contains('active'));
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      const toggle = document.querySelector('.nav-toggle');
      if (toggle) {
        toggle.addEventListener('click', toggleSidebar);
      }

      const langButtons = document.querySelectorAll('.lang-btn');
      langButtons.forEach(button => {
        button.addEventListener('click', () => {
          langButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          const lang = button.getAttribute('data-lang');
          document.querySelectorAll('[lang]').forEach(el => {
            el.classList.remove('lang-visible', 'lang-hidden');
            el.classList.add(lang === 'en' ? 'lang-visible' : 'lang-hidden');
          });
        });
      });
    });

    function scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }

    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', toggleSidebar);
      const langButtons = document.querySelectorAll('.lang-btn');
      langButtons.forEach(button => button.removeEventListener('click', toggleSidebar));
    };
  }, []);

  return (
    <Layout>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: window.__INITIAL_HTML__ || '' }} />
      </Content>
    </Layout>
  );
});

export default LicHome;
