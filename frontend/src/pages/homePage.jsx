import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: none; /* Hide on SSR-rendered homepage */
`;

const HomePage = () => {
  return (
    <Container>
      {/* Empty for SSR; Vercel rewrite handles homepage */}
    </Container>
  );
};

export default HomePage;
