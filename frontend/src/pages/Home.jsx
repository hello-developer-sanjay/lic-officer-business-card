import { useEffect, useRef, lazy, Suspense } from 'react';
import profileImage1 from '../assets/jitendraprofilephoto.jpg';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faBriefcase, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { FaInstagram } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Rating = lazy(() => import('../components/Rating'));
const Review = lazy(() => import('../components/Review'));

const MainContainer = styled(motion.main)`
  background: linear-gradient(180deg, #050816, #010204);
  color: white;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  padding: 1rem 0;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  a {
    color: #ffbb00;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
    &:hover {
      color: #e85d04;
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin: 1rem 0;
  color: #ffbb00;
  text-shadow: 0 0 8px rgba(255, 187, 0, 0.5);
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 1rem 0;
  padding: 1rem;
  animation: ${fadeIn} 0.8s ease-in;
`;

const SubHeading = styled.h2`
  font-size: 1.8rem;
  color: #ffbb00;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #e0e0e0;
`;

const FlexContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProfileImageContainer = styled.figure`
  flex-shrink: 0;
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.6);
  object-fit: cover;
  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  border: 1px solid #ff6b6b;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  resize: vertical;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ff6b6b;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #ffbb00, #e85d04);
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Link = styled.a`
  color: #ffbb00;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: #e85d04;
  }
`;

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  text-align: center;
  color: #e0e0e0;
`;

const Home = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const footerRef = useRef(null);

  const copyContactNumber = () => {
    navigator.clipboard.writeText('+917987235207').then(() => {
      toast.success('Contact number copied!');
    }).catch(() => {
      toast.error('Failed to copy number.');
    });
  };

  const copyInstaID = () => {
    navigator.clipboard.writeText('jay7268patidar').then(() => {
      toast.success('Instagram ID copied!');
    }).catch(() => {
      toast.error('Failed to copy ID.');
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const feedback = formData.get('message');
    const query = formData.get('query');

    if (!name) {
      toast.error('कृपया अपना नाम भरें!');
      return;
    }
    if (!feedback && !query) {
      toast.error('कृपया प्रतिक्रिया या प्रश्न प्रदान करें।');
      return;
    }

    try {
      const endpoint = query ? 'submit-query' : 'submit-feedback';
      const response = await fetch(`https://lic-backend-8jun.onrender.com/api/lic/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, feedback: feedback || query, query }),
      });

      if (response.ok) {
        toast.success(query ? 'प्रश्न भेजा गया!' : 'प्रतिक्रिया जमा की गई!');
      } else {
        toast.error('जमा करने में त्रुटि। कृपया पुनः प्रयास करें।');
      }
    } catch (error) {
      toast.error('जमा करने में त्रुटि। कृपया पुनः प्रयास करें।');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            toast.info('नमस्ते! कोई सुझाव या प्रश्न? हमें बताएं!', {
              position: 'top-right',
              autoClose: 8000,
              style: { background: '#487503', color: '#fff', borderRadius: '8px' },
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.4 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'LIC Neemuch | Jitendra Patidar, LIC Development Officer',
    description: 'Contact Jitendra Patidar, LIC Development Officer in Neemuch, for life insurance solutions, financial planning, and LIC agent opportunities in Madhya Pradesh.',
    url: 'https://lic-neemuch-jitendra-patidar.vercel.app/',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://lic-neemuch-jitendra-patidar.vercel.app/' },
    author: { '@type': 'Person', name: 'Jitendra Patidar' },
    publisher: {
      '@type': 'Organization',
      name: 'LIC Neemuch',
      logo: { '@type': 'ImageObject', url: 'https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp' },
    },
    inLanguage: 'mul',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lic-neemuch-jitendra-patidar.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Join', item: 'https://lic-neemuch-jitendra-patidar.vercel.app/join' },
      ],
    },
    FAQPage: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Jitendra Patidar at LIC Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'Jitendra Patidar is a Development Officer at LIC Neemuch, guiding clients on insurance and recruiting agents.' },
        },
        {
          '@type': 'Question',
          name: 'How to become an LIC agent in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'Contact Jitendra Patidar, pass the IRDAI exam, and complete LIC training to become an agent.' },
        },
         {
      '@type': 'Question',
      name: 'How to contact Jitendra Patidar for LIC services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact Jitendra Patidar via lic-neemuch-jitendra-patidar.vercel.app for insurance and agent recruitment in Neemuch.',
      },
    },
      {
      '@type': 'Question',
      name: 'What is the role of an LIC Development Officer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An LIC Development Officer, like Jitendra Patidar, recruits and trains agents, and advises clients on insurance plans.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to become an LIC agent in Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To become an LIC agent in Neemuch, contact Jitendra Patidar, pass the IRDAI exam, and complete LIC training.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the benefits of being an LIC agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC agents enjoy a stable career, training, flexible hours, and income potential through commissions and bonuses.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of LIC policies are available in Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC Neemuch offers term insurance, endowment plans, ULIPs, pension plans, and child plans for diverse needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why choose LIC Neemuch for insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC Neemuch, led by Jitendra Patidar, offers trusted insurance solutions with personalized service and reliability.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the purpose of LIC India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC India aims to provide financial security through life insurance, promoting wealth creation and retirement planning.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does LIC Neemuch support financial literacy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC Neemuch conducts outreach programs to educate clients on insurance and financial planning, led by Jitendra Patidar.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the LIC agent recruitment process?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC agent recruitment involves eligibility checks, an IRDAI exam, training, and licensing, guided by officers like Jitendra Patidar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I join Jitendra Patidar’s LIC team in Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, contact Jitendra Patidar to join his LIC Neemuch team as an agent, with training and support provided.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are LIC endowment plans in Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC endowment plans in Neemuch combine savings and insurance, offering maturity benefits and life cover.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does LIC Neemuch handle insurance claims?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC Neemuch, under Jitendra Patidar, ensures smooth claim processing with professional support and transparency.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the role of LIC agents in Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC agents in Neemuch advise clients on policies, assist with claims, and promote financial security under Jitendra Patidar’s guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are LIC ULIPs in Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC ULIPs in Neemuch combine insurance and investment, offering market-linked returns and life cover.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does LIC Neemuch promote CSR initiatives?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC Neemuch supports education, healthcare, and sustainability through CSR programs, aligned with LIC India’s mission.',
      },
    },
    {
      '@type': 'Question',
      name: 'What training do LIC agents receive in Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC agents in Neemuch receive comprehensive training on products, sales, and client service, guided by Jitendra Patidar.',
      },
    },
    {
      '@type': 'Question',
      name: 'LIC एजेंट कैसे बनें? (How to become an LIC agent?)',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC एजेंट बनने के लिए नीमच में जीतेंद्र पाटीदार से संपर्क करें, IRDAI परीक्षा पास करें, और LIC प्रशिक्षण पूरा करें।',
      },
    },
      ],
    },
  };

  return (
    <>
      <Helmet>
        <html lang="mul" />
        <title>LIC Neemuch | Jitendra Patidar, LIC Development Officer</title>
        <meta charset="UTF-8" />
        <meta name="description" content="Contact Jitendra Patidar, LIC Development Officer in Neemuch, for life insurance, financial planning, and LIC agent opportunities in Madhya Pradesh. Secure your future with trusted LIC services." />
        <meta name="keywords" content="LIC Neemuch, Jitendra Patidar, LIC Development Officer, life insurance Neemuch, LIC agent recruitment, financial planning Madhya Pradesh, insurance solutions" />
        <meta name="author" content="Jitendra Patidar" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Neemuch, Madhya Pradesh" />
        <meta name="geo.position" content="24.476385;74.862409" />
        <meta name="DC.title" content="LIC Neemuch | Jitendra Patidar, LIC Development Officer" />
        <link rel="canonical" href="https://lic-neemuch-jitendra-patidar.vercel.app/" />
        <link rel="alternate" hreflang="hi" href="https://lic-neemuch-jitendra-patidar.vercel.app/hi" />
        <link rel="preload" href={profileImage1} as="image" />
        <link rel="dns-prefetch" href="https://mys3resources.s3.ap-south-1.amazonaws.com" />
        <meta property="og:title" content="LIC Neemuch | Jitendra Patidar, LIC Development Officer" />
        <meta property="og:description" content="Contact Jitendra Patidar for life insurance and LIC agent opportunities in Neemuch, Madhya Pradesh." />
        <meta property="og:image" content="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp" />
        <meta property="og:image:alt" content="Jitendra Patidar, LIC Development Officer" />
        <meta property="og:url" content="https://lic-neemuch-jitendra-patidar.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LIC Neemuch | Jitendra Patidar" />
        <meta name="twitter:description" content="Life insurance and LIC agent opportunities with Jitendra Patidar in Neemuch." />
        <meta name="twitter:image" content="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Header>
          <NavContainer aria-label="Main navigation">
            <NavLink to="/" aria-label="Home"><FontAwesomeIcon icon={faHome} /> Home</NavLink>
            <NavLink to="/join" aria-label="Join as Agent"><FontAwesomeIcon icon={faUserPlus} /> Join as Agent</NavLink>
            <NavLink to="/services" aria-label="Services"><FontAwesomeIcon icon={faBriefcase} /> Services</NavLink>
            <NavLink to="/about" aria-label="About"><FontAwesomeIcon icon={faInfoCircle} /> About</NavLink>
          </NavContainer>
        </Header>
        <Title>Jitendra Patidar - LIC Development Officer, Neemuch</Title>
        <Section>
          <SubHeading>Welcome to LIC Neemuch</SubHeading>
          <Paragraph lang="en">
            At LIC Neemuch, led by Development Officer <strong>Jitendra Patidar</strong>, we provide comprehensive life insurance and financial planning solutions to secure your future. Serving Neemuch, Mandsaur, Ratangarh, Singoli, Manasa, Jawad, and Sarwaniya Maharaj, our mission is to empower families with financial security through trusted LIC policies. Whether you're seeking term insurance, endowment plans, ULIPs, or pension plans, we offer personalized services tailored to your needs.
          </Paragraph>
          <Paragraph lang="hi">
            नीमच में एलआईसी, विकास अधिकारी <strong>जीतेंद्र पाटीदार</strong> के नेतृत्व में, आपके भविष्य को सुरक्षित करने के लिए व्यापक जीवन बीमा और वित्तीय नियोजन समाधान प्रदान करता है। नीमच, मंदसौर, रतनगढ़, सिंगोली, मनासा, जावद और सरवानीयाँ महाराज की सेवा करते हुए, हमारा मिशन विश्वसनीय एलआईसी पॉलिसियों के माध्यम से परिवारों को वित्तीय सुरक्षा प्रदान करना है।
          </Paragraph>
        </Section>
        <FlexContainer>
          <ProfileImageContainer>
            <ProfileImage
              src={profileImage1}
              alt="Jitendra Patidar, LIC Development Officer"
              width="300"
              height="300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(true)}
            />
          </ProfileImageContainer>
          <Section>
            <SubHeading>Contact Jitendra Patidar</SubHeading>
            <Paragraph>
              📞 <strong>Contact Number:</strong>{' '}
              <Link href="tel:+917987235207" id="contactNumber">+91 7987235207</Link>{' '}
              <Button onClick={copyContactNumber} aria-label="Copy contact number">Copy Number</Button>
            </Paragraph>
            <Paragraph>
              <FaInstagram /> <strong>Instagram:</strong>{' '}
              <Link href="https://www.instagram.com/jay7268patidar" id="instaID" target="_blank">jay7268patidar</Link>{' '}
              <Button onClick={copyInstaID} aria-label="Copy Instagram ID">Copy ID</Button>
            </Paragraph>
            <Paragraph>
              <strong>Office Address:</strong> Vikas Nagar, Scheme No. 14-3, Neemuch Chawni, Neemuch, Madhya Pradesh 458441
            </Paragraph>
            <Paragraph>
              Ready to explore LIC services? Visit the <Link href="https://licindia.in/hi/home" target="_blank">LIC India website</Link> or <NavLink to="/services">our services page</NavLink> for more details.
            </Paragraph>
          </Section>
        </FlexContainer>
        <Section>
          <SubHeading>Become an LIC Agent</SubHeading>
          <Paragraph lang="en">
            Join Jitendra Patidar’s team at LIC Neemuch as an LIC agent. Enjoy a rewarding career with flexible hours, comprehensive training, and attractive commissions. To get started, pass the IRDAI exam and complete LIC’s training program. <NavLink to="/join">Learn more about agent opportunities</NavLink>.
          </Paragraph>
          <Paragraph lang="hi">
            नीमच में जीतेंद्र पाटीदार की टीम में एलआईसी एजेंट के रूप में शामिल हों। लचीले घंटों, व्यापक प्रशिक्षण और आकर्षक कमीशन के साथ एक पुरस्कृत करियर का आनंद लें। शुरू करने के लिए, IRDAI परीक्षा पास करें और LIC का प्रशिक्षण कार्यक्रम पूरा करें। <NavLink to="/join">एजेंट अवसरों के बारे में और जानें</NavLink>।
          </Paragraph>
        </Section>
        <img
          src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp"
          alt="LIC Neemuch Office"
          width="600"
          height="200"
          loading="lazy"
          style={{ margin: '1rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
        />
        <ContactForm onSubmit={handleFormSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Input type="text" name="name" placeholder="आपका नाम" required aria-label="Name" />
          <Input type="email" name="email" placeholder="आपका ईमेल" aria-label="Email" />
          <TextArea name="message" rows="4" placeholder="आपकी प्रतिक्रिया..." aria-label="Feedback" />
          <TextArea name="query" rows="4" placeholder="आपका प्रश्न..." aria-label="Query" />
          <Button type="submit" aria-label="Submit form">जमा करें</Button>
        </ContactForm>
        <Suspense fallback={<div>Loading...</div>}>
          <Rating />
          <Review />
        </Suspense>
        <ToastContainer position="top-right" style={{ marginTop: '80px' }} />
      </MainContainer>
      <Footer ref={footerRef}>
        <Paragraph>
          Discover <Link href="https://zedemy.vercel.app" target="_blank">Zedemy</Link> by Sanjay Patidar
        </Paragraph>
        <Paragraph>
          © <strong>EduXcel</strong> by Sanjay Patidar | {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Paragraph>
      </Footer>
    </>
  );
};

export default Home;
