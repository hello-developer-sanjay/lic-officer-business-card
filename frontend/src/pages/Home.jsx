import { useEffect, useRef, lazy, Suspense } from 'react';
import axios from 'axios';
import profileImage1 from '../assets/jitendraprofilephoto.jpg';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faBriefcase, faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';
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

const Article = styled.article`
  max-width: 1200px;
  margin: 1rem 0;
  padding: 1rem;
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

const Address = styled.address`
  font-style: normal;
  color: #e0e0e0;
  margin-bottom: 1rem;
`;

const Footer = styled.footer`
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  text-align: center;
  color: #e0e0e0;
`;

const RatingDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  color: #ffbb00;
`;

const Home = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(4.8);
  const [ratingCount, setRatingCount] = useState(50);
  const [recentReviews, setRecentReviews] = useState([]);
  const footerRef = useRef(null);
  const API_URL =  'https://lic-backend-8jun.onrender.com';

  useEffect(() => {
    const fetchRatingsAndReviews = async () => {
      try {
        const ratingsResponse = await axios.get(`${API_URL}/api/lic/ratings`);
        const ratingsData = ratingsResponse.data || [];
        if (ratingsData.length) {
          const validRatings = ratingsData.filter(r => r.rating >= 1 && r.rating <= 5);
          if (validRatings.length) {
            setRatingCount(validRatings.length);
            setAverageRating(
              validRatings.reduce((sum, r) => sum + r.rating, 0) / validRatings.length
            );
          }
        }

        const reviewsResponse = await axios.get(`${API_URL}/api/lic/reviews`);
        const reviewsData = reviewsResponse.data || [];
        if (reviewsData.length) {
          const sortedReviews = reviewsData
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 2);
          setRecentReviews(sortedReviews);
        }
      } catch (error) {
        console.error('Error fetching ratings/reviews:', error);
        toast.error('Failed to load ratings/reviews.');
      }
    };

    fetchRatingsAndReviews();
  }, [API_URL]);

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
      const response = await fetch(`${API_URL}/api/lic/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, feedback: feedback || query, query }),
      });

      if (response.ok) {
        toast.success(query ? 'प्रश्न भेजा गया!' : 'प्रतिक्रिया जमा की गई!');
        e.target.reset();
      } else {
        toast.error('जमा करने में त्रुटि। कृपया पुनः प्रयास करें।');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LIC Neemuch',
      url: 'https://lic-neemuch-jitendra-patidar.vercel.app/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/titleImage_LICBlo.jpeg',
        width: 600,
        height: 200,
      },
      sameAs: ['https://www.instagram.com/jay7268patidar'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'LIC Neemuch',
      description: 'LIC Neemuch, led by Jitendra Patidar, ensures your secure life through life insurance, financial planning, and LIC agent opportunities in Neemuch, Madhya Pradesh.',
      url: 'https://lic-neemuch-jitendra-patidar.vercel.app/',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vikas Nagar, Scheme No. 14-3, Neemuch Chawni',
        addressLocality: 'Neemuch',
        addressRegion: 'Madhya Pradesh',
        postalCode: '458441',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.476385,
        longitude: 74.862409,
      },
      telephone: '+917987235207',
      image: 'https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/titleImage_LICBlo.jpeg',
      priceRange: '$$',
      openingHours: 'Mo-Fr 09:00-17:00',
      hasMap: 'https://maps.google.com/?q=Vikas+Nagar,+Neemuch,+Madhya+Pradesh+458441',
      sameAs: ['https://www.instagram.com/jay7268patidar'],
      inLanguage: ['en', 'hi'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+917987235207',
        contactType: 'Customer Service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating.toFixed(1),
        reviewCount: ratingCount,
        bestRating: '5',
        worstRating: '1',
      },
      review: recentReviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.username,
        },
        datePublished: new Date(review.createdAt).toISOString().split('T')[0],
        reviewBody: review.comment,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lic-neemuch-jitendra-patidar.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: 'Join', item: 'https://lic-neemuch-jitendra-patidar.vercel.app/join' },
        { '@type': 'ListItem', position: 3, name: 'Services', item: 'https://lic-neemuch-jitendra-patidar.vercel.app/services' },
        { '@type': 'ListItem', position: 4, name: 'About', item: 'https://lic-neemuch-jitendra-patidar.vercel.app/about' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Jitendra Patidar at LIC Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'Jitendra Patidar is a Development Officer at LIC Neemuch, ensuring secure life insurance solutions and recruiting agents.' },
        },
        {
          '@type': 'Question',
          name: 'How to become an LIC agent in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'Contact Jitendra Patidar, pass the IRDAI exam, and complete LIC training to become an agent.' },
        },
        {
          '@type': 'Question',
          name: 'How to contact Jitendra Patidar for LIC services?',
          acceptedAnswer: { '@type': 'Answer', text: 'Contact Jitendra Patidar via lic-neemuch-jitendra-patidar.vercel.app or call +917987235207 for secure life insurance.' },
        },
        {
          '@type': 'Question',
          name: 'What is the role of an LIC Development Officer?',
          acceptedAnswer: { '@type': 'Answer', text: 'An LIC Development Officer, like Jitendra Patidar, ensures secure insurance plans, recruits, and trains agents.' },
        },
        {
          '@type': 'Question',
          name: 'What are the benefits of being an LIC agent?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC agents enjoy a secure career, flexible hours, training, and commissions under Jitendra Patidar’s guidance.' },
        },
        {
          '@type': 'Question',
          name: 'What types of LIC policies are available in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC Neemuch offers term insurance, endowment plans, ULIPs, pension plans, and child plans for a secure life.' },
        },
        {
          '@type': 'Question',
          name: 'Why choose LIC Neemuch for insurance?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC Neemuch, led by Jitendra Patidar, ensures trusted, secure insurance solutions with personalized service.' },
        },
        {
          '@type': 'Question',
          name: 'What is the purpose of LIC India?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC India ensures financial security through life insurance, promoting wealth creation and retirement planning.' },
        },
        {
          '@type': 'Question',
          name: 'How does LIC Neemuch support financial literacy?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC Neemuch, under Jitendra Patidar, conducts programs to ensure clients understand secure financial planning.' },
        },
        {
          '@type': 'Question',
          name: 'What is the LIC agent recruitment process?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC agent recruitment involves eligibility checks, IRDAI exam, training, and licensing, guided by Jitendra Patidar.' },
        },
        {
          '@type': 'Question',
          name: 'Can I join Jitendra Patidar’s LIC team in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, contact Jitendra Patidar to join his LIC Neemuch team for a secure career as an agent.' },
        },
        {
          '@type': 'Question',
          name: 'What are LIC endowment plans in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC endowment plans in Neemuch ensure savings and insurance, offering secure maturity benefits.' },
        },
        {
          '@type': 'Question',
          name: 'How does LIC Neemuch handle insurance claims?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC Neemuch, under Jitendra Patidar, ensures smooth, secure claim processing with transparency.' },
        },
        {
          '@type': 'Question',
          name: 'What is the role of LIC agents in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC agents in Neemuch ensure secure policy advice, claim assistance, and financial security.' },
        },
        {
          '@type': 'Question',
          name: 'What are LIC ULIPs in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC ULIPs in Neemuch ensure secure insurance and investment with market-linked returns.' },
        },
        {
          '@type': 'Question',
          name: 'How does LIC Neemuch promote CSR initiatives?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC Neemuch supports education, healthcare, and sustainability, ensuring secure community development.' },
        },
        {
          '@type': 'Question',
          name: 'What training do LIC agents receive in Neemuch?',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC agents in Neemuch receive comprehensive training to ensure secure client service.' },
        },
        {
          '@type': 'Question',
          name: 'LIC एजेंट कैसे बनें? (How to become an LIC agent?)',
          acceptedAnswer: { '@type': 'Answer', text: 'LIC एजेंट बनने के लिए नीमच में जीतेंद्र पाटीदार से संपर्क करें, IRDAI परीक्षा पास करें, और LIC प्रशिक्षण पूरा करें।' },
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <html lang="mul" />
        <title>LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life</title>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Jitendra Patidar, LIC Development Officer in Neemuch, ensures your secure life with trusted life insurance, financial planning, and LIC agent opportunities in Madhya Pradesh. Rated 4.8/5 by 50 clients."
        />
        <meta
          name="keywords"
          content="LIC Neemuch, Jitendra Patidar, secure life, life insurance Neemuch, LIC agent recruitment, financial planning Madhya Pradesh, trusted insurance solutions"
        />
        <meta name="author" content="Jitendra Patidar" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Neemuch, Madhya Pradesh" />
        <meta name="geo.position" content="24.476385;74.862409" />
        <meta name="DC.title" content="LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life" />
        <link rel="canonical" href="https://lic-neemuch-jitendra-patidar.vercel.app/" />
        <link rel="alternate" hreflang="hi" href="https://lic-neemuch-jitendra-patidar.vercel.app/hi" />
        <link rel="preload" href={profileImage1} as="image" />
        <link
          rel="preload"
          href="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp"
          as="image"
        />
        <link rel="dns-prefetch" href={API_URL} />
        <meta property="og:title" content="LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life" />
        <meta
          property="og:description"
          content="Jitendra Patidar ensures your secure life with life insurance and LIC agent opportunities in Neemuch, Madhya Pradesh. Rated 4.8/5 by 50 clients."
        />
        <meta
          property="og:image"
          content="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/titleImage_LICBlo.jpeg"
        />
        <meta property="og:image:alt" content="LIC Neemuch Logo" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="200" />
        <meta property="og:url" content="https://lic-neemuch-jitendra-patidar.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LIC Neemuch | Jitendra Patidar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LIC Neemuch: How Jitendra Patidar Ensures Your Secure Life" />
        <meta
          name="twitter:description"
          content="Secure your life with Jitendra Patidar’s life insurance and LIC agent opportunities in Neemuch. Rated 4.8/5 by 50 clients."
        />
        <meta
          name="twitter:image"
          content="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/titleImage_LICBlo.jpeg"
        />
        <meta name="twitter:site" content="@jitendrapatidar" />
        <meta name="twitter:creator" content="@jitendrapatidar" />
        {structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">{JSON.stringify(data)}</script>
        ))}
      </Helmet>
      <MainContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Header>
          <NavContainer aria-label="Main navigation">
            <NavLink to="/" aria-label="Home">
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
            <NavLink to="/join" aria-label="Join as Agent">
              <FontAwesomeIcon icon={faUserPlus} /> Join as Agent
            </NavLink>
            <NavLink to="/services" aria-label="Services">
              <FontAwesomeIcon icon={faBriefcase} /> Services
            </NavLink>
            <NavLink to="/about" aria-label="About">
              <FontAwesomeIcon icon={faInfoCircle} /> About
            </NavLink>
          </NavContainer>
        </Header>
        <Title>LIC Neemuch: Jitendra Patidar Ensures Your Secure Life</Title>
        <Article>
          <SubHeading>Welcome to LIC Neemuch</SubHeading>
          <Paragraph lang="en">
            At LIC Neemuch, led by Development Officer <strong>Jitendra Patidar</strong>, we ensure your secure life through comprehensive life insurance and financial planning solutions. Serving Neemuch, Mandsaur, Ratangarh, Singoli, Manasa, Jawad, and Sarwaniya Maharaj, our mission is to empower families with trusted LIC policies for a secure future. Whether you seek term insurance, endowment plans, ULIPs, pension plans, or child plans, we offer personalized services to safeguard your life.
          </Paragraph>
          <Paragraph lang="hi">
            नीमच में एलआईसी, विकास अधिकारी <strong>जीतेंद्र पाटीदार</strong> के नेतृत्व में, आपके सुरक्षित जीवन को सुनिश्चित करता है। नीमच, मंदसौर, रतनगढ़, सिंगोली, मनासा, जावद और सरवानीयाँ महाराज की सेवा करते हुए, हमारा मिशन विश्वसनीय एलआईसी पॉलिसियों के माध्यम से परिवारों को सुरक्षित भविष्य प्रदान करना है। टर्म इंश्योरेंस, एंडोमेंट प्लान, ULIP, पेंशन प्लान, या चाइल्ड प्लान, हम आपके जीवन की सुरक्षा के लिए वैयक्तिकृत सेवाएँ प्रदान करते हैं।
          </Paragraph>
          {ratingCount > 0 && averageRating >= 1 && (
            <RatingDisplay aria-label="Average customer rating">
              <FontAwesomeIcon icon={faStar} />
              <span>
                {averageRating.toFixed(1)}/5 ({ratingCount} reviews)
              </span>
            </RatingDisplay>
          )}
        </Article>
        <FlexContainer>
          <ProfileImageContainer>
            <ProfileImage
              src={profileImage1}
              alt="Jitendra Patidar, LIC Development Officer ensuring secure life"
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
            <SubHeading>Contact Jitendra Patidar for a Secure Life</SubHeading>
            <Paragraph>
              📞 <strong>Contact Number:</strong>{' '}
              <Link href="tel:+917987235207" id="contactNumber">
                +91 7987235207
              </Link>{' '}
              <Button onClick={copyContactNumber} aria-label="Copy contact number">
                Copy Number
              </Button>
            </Paragraph>
            <Paragraph>
              <FaInstagram /> <strong>Instagram:</strong>{' '}
              <Link
                href="https://www.instagram.com/jay7268patidar"
                id="instaID"
                target="_blank"
                rel="noopener noreferrer"
              >
                jay7268patidar
              </Link>{' '}
              <Button onClick={copyInstaID} aria-label="Copy Instagram ID">
                Copy ID
              </Button>
            </Paragraph>
            <Address>
              <strong>Office Address:</strong> Vikas Nagar, Scheme No. 14-3, Neemuch Chawni,
              Neemuch, Madhya Pradesh 458441
            </Address>
            <Paragraph>
              Ready to ensure your secure life? Visit the{' '}
              <Link href="https://licindia.in/hi/home" target="_blank" rel="noopener noreferrer">
                LIC India website
              </Link>{' '}
              or <NavLink to="/services">our services page</NavLink> for more details.
            </Paragraph>
          </Section>
        </FlexContainer>
        <Article>
          <SubHeading>Become an LIC Agent with Jitendra Patidar</SubHeading>
          <Paragraph lang="en">
            Join Jitendra Patidar’s team at LIC Neemuch as an LIC agent to ensure a secure career. Enjoy flexible hours, comprehensive training, and attractive commissions. Start by passing the IRDAI exam and completing LIC’s training program.{' '}
            <NavLink to="/join">Learn more about secure agent opportunities</NavLink>.
          </Paragraph>
          <Paragraph lang="hi">
            नीमच में जीतेंद्र पाटीदार की टीम में एलआईसी एजेंट के रूप में शामिल होकर सुरक्षित करियर सुनिश्चित करें। लचीले घंटों, व्यापक प्रशिक्षण और आकर्षक कमीशन का आनंद लें। IRDAI परीक्षा पास करें और LIC का प्रशिक्षण पूरा करें।{' '}
            <NavLink to="/join">सुरक्षित एजेंट अवसरों के बारे में और जानें</NavLink>।
          </Paragraph>
        </Article>
        <img
          src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp"
          alt="LIC Neemuch Office ensuring secure life insurance"
          width="600"
          height="200"
          loading="lazy"
          style={{ margin: '1rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
        />
        <ContactForm
          onSubmit={handleFormSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Input type="text" name="name" placeholder="आपका नाम" required aria-label="Name" />
          <Input type="email" name="email" placeholder="आपका ईमेल" aria-label="Email" />
          <TextArea name="message" rows="4" placeholder="आपकी प्रतिक्रिया..." aria-label="Feedback" />
          <TextArea name="query" rows="4" placeholder="आपका प्रश्न..." aria-label="Query" />
          <Button type="submit" aria-label="Submit form">
            जमा करें
          </Button>
        </ContactForm>
        <Suspense fallback={<div>Loading...</div>}>
          <Section aria-label="Customer ratings and reviews">
            <SubHeading>Ratings & Reviews for Secure Services</SubHeading>
            <Rating />
            <Review />
          </Section>
        </Suspense>
        <ToastContainer position="top-right" style={{ marginTop: '80px' }} />
      </MainContainer>
      <Footer ref={footerRef}>
        <Paragraph>
          Discover{' '}
          <Link href="https://zedemy.vercel.app" target="_blank" rel="noopener noreferrer">
            Zedemy
          </Link>{' '}
          by Sanjay Patidar
        </Paragraph>
        <Paragraph>
          © <strong>EduXcel</strong> by Sanjay Patidar |{' '}
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Paragraph>
      </Footer>
    </>
  );
};

export default Home;
