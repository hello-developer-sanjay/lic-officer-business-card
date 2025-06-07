import { useEffect, useRef, lazy, Suspense } from 'react';
import profileImage1 from '../assets/jitendraprofilephoto.jpg';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faUniversity, faNewspaper, faBriefcase, faUserTie, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaUsers } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Rating = lazy(() => import('../components/Rating'));
const Review = lazy(() => import('../components/Review'));

const FooterContainer = styled(motion.footer)`
  position: relative;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
  background-color: #050816;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  background: radial-gradient(ellipse at center, rgba(5, 8, 22, 0.15) 0%, rgba(5, 8, 22, 0) 70%), linear-gradient(90deg, #010102, #010204);
`;

const Text = styled.h1`
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 0.1px;
  color: #fff;
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const BorderLine = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 3px;
  background: linear-gradient(to right, #ffbb00, #e85d04);
  box-shadow: 0 0 8px rgba(232, 93, 4, 0.6);
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const CatchyMessage = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.8s ease-in-out, ${bounceAnimation} 2s infinite;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  border: 1px solid #ff6b6b;
`;

const ContactInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.2s ease;
  &:focus {
    background-color: rgba(0, 0, 0, 0.7);
    outline: none;
  }
`;

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
  }
`;

const FlexContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ProfileImageContainer = styled.figure`
  flex-shrink: 0;
  @media (min-width: 768px) {
    order: 1;
    margin-right: 1.5rem;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.6);
  object-fit: cover;
  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover {
    color: #ffbb00;
  }
`;

const ContactTextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #555;
  border-radius: 8px;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.2s ease;
  &:focus {
    box-shadow: 0 0 8px rgba(255, 107, 107, 0.5);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #ffbb00, #e85d04);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const QueryButton = styled(SubmitButton)`
  border-radius: 20px;
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
`;

const Next = styled.article`
  font-size: 1rem;
  color: #f3f3f3;
  margin: 0.5rem 0;
  line-height: 1.5;
  text-align: justify;
  padding: 0.5rem;
  border-left: 3px solid #5d00ff;
  border-radius: 5px;
`;

const Onlyforlap = styled.section`
  margin: 1rem;
  @media (max-width: 768px) {
    margin: 0.5rem;
  }
`;

const Introduction = styled(motion.p)`
  font-size: 1.4rem;
  line-height: 1.6;
  max-width: 800px;
  text-align: center;
  color: #ffffff;
  font-family: 'Playfair Display', serif;
  .highlight {
    font-weight: 700;
    color: #ffbb00;
  }
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.4;
  }
`;

const Home = () => {
  const catchyMessages = [
    "LIC एजेंट बनने के लिए आज ही संपर्क करें जितेंद्र पाटीदार अधिकारी(LIC, Neemuch) से। भारतीय जीवन बीमा निगम, नीमच (मध्य प्रदेश)",
  ];
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const copyContactNumber = () => {
    const contactNumber = document.getElementById('contactNumber');
    navigator.clipboard.writeText('+917987235207').then(() => {
      toast.success('Contact number copied!');
    }).catch(() => {
      toast.error('Failed to copy number.');
    });
  };

  const copyInstaID = () => {
    const instaID = document.getElementById('instaID');
    navigator.clipboard.writeText('jay7268patidar').then(() => {
      toast.success('Instagram ID copied!');
    }).catch(() => {
      toast.error('Failed to copy ID.');
    });
  };

  const handleCareerInsightsClick = () => {
    if (!isToastVisible) {
      toast.info("Redirecting to Sanjay Patidar's Blog insights...", {
        autoClose: 3000,
        onOpen: () => setIsToastVisible(true),
        onClose: () => setIsToastVisible(false),
      });
      setTimeout(() => {
        window.open("https://sanjay-patidar.vercel.app/blogs", "_blank");
      }, 3000);
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const footer = useRef(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          toast.info(
            "नमस्ते! अगर आपके पास कोई सुझाव या प्रश्न है तो कृपया उन्हें हमें भेजें।",
            {
              position: "top-right",
              autoClose: 8000,
              style: {
                background: "#487503",
                color: "#fff",
                borderRadius: "8px",
              },
            }
          );
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    if (footer.current) observer.observe(footer.current);
    return () => {
      if (footer.current) observer.unobserve(footer.current);
    };
  }, []);

  const getRandomCatchyMessage = () => catchyMessages[0];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const feedback = formData.get("message");
    const query = formData.get("query");

    if (!name) {
      toast.error("कृपया अपना नाम भरें!");
      return;
    }
    if (!feedback && !query) {
      toast.error("कृपया प्रतिक्रिया या प्रश्न प्रदान करें।");
      return;
    }

    try {
      const endpoint = query ? "submit-query" : "submit-feedback";
      const response = await fetch(`https://eduxcel-api-30april.onrender.com/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, feedback: feedback || query, query }),
      });

      if (response.ok) {
        toast.success(query ? "प्रश्न भेजा गया!" : "प्रतिक्रिया जमा की गई!");
      } else {
        toast.error("जमा करने में त्रुटि। कृपया पुनः प्रयास करें।");
      }
    } catch (error) {
      toast.error("जमा करने में त्रुटि। कृपया पुनः प्रयास करें।");
    }
  };
 const faqData = [
    {
      '@type': 'Question',
      name: 'Who is Jitendra Patidar at LIC Neemuch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jitendra Patidar is a Development Officer at LIC Neemuch, guiding clients on insurance solutions and recruiting LIC agents.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does LIC Neemuch offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LIC Neemuch provides life insurance, retirement plans, and wealth creation policies, led by Jitendra Patidar for financial security.',
      },
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
    {
      '@type': 'Question',
      name: 'Why trust Jitendra Patidar for LIC services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jitendra Patidar, LIC Neemuch’s Development Officer, offers expert guidance and personalized insurance solutions.',
      },
    },
  ];

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'LIC Neemuch | Jitendra Patidar, LIC Development Officer',
      description: 'Contact Jitendra Patidar, LIC Development Officer in Neemuch, for insurance solutions and agent opportunities with LIC.',
      url: 'https://lic-neemuch-jitendra-patidar.vercel.app/',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://lic-neemuch-jitendra-patidar.vercel.app/',
      },
      author: {
        '@type': 'Person',
        name: 'Jitendra Patidar',
      },
      publisher: {
        '@type': 'Person',
        name: 'Jitendra Patidar',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData,
    },
  ];


  return (
    <>
      <Helmet>
        <html lang="mul" />
        <title>LIC Neemuch | Jitendra Patidar, LIC Development Officer</title>
        <meta charset="UTF-8" />
        <meta name="description" 
        content="Contact Jitendra Patidar, LIC Development Officer in Neemuch, for insurance solutions and agent opportunities. Secure your future with LIC." />
        <meta name="keywords" content="LIC Neemuch, Jitendra Patidar, LIC Development Officer, LIC agent recruitment, life insurance Neemuch, financial security Madhya Pradesh" />
        <meta name="author" content="Jitendra Patidar" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://lic-neemuch-jitendra-patidar.vercel.app/" />
        <link rel="alternate" hreflang="hi" href="https://lic-neemuch-jitendra-patidar.vercel.app/hi" />
        <link rel="preload" href={profileImage1} as="image" />
        <link rel="dns-prefetch" href="https://mys3resources.s3.ap-south-1.amazonaws.com" />
        <meta property="og:title" content="LIC Neemuch | Jitendra Patidar, LIC Development Officer" />
        <meta property="og:description" content="Contact Jitendra Patidar for insurance and agent opportunities in Neemuch." />
        <meta property="og:image" content="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp" />
        <meta property="og:image:alt" content="Jitendra Patidar, LIC Development Officer" />
        <meta property="og:url" content="https://lic-neemuch-jitendra-patidar.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LIC Neemuch | Jitendra Patidar" />
        <meta name="twitter:description" content="Contact Jitendra Patidar for insurance and agent opportunities." />
        <meta name="twitter:image" content="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <header>
        <NavigationContainer aria-label="Main navigation">
          <NavLink to="/" aria-label="Home"><FontAwesomeIcon icon={faHome} /> Home</NavLink>
          <NavLink to="https://jitendra-patidar.vercel.app/be-an-lic-agent" aria-label="Join as Agent"><FontAwesomeIcon icon={faUserPlus} /> Join as Agent</NavLink>
          <NavLink to="https://smartserve-do.vercel.app/" aria-label="Services"><FontAwesomeIcon icon={faBriefcase} /> Services</NavLink>
        </NavigationContainer>
      </header>
      <main>
        <FooterContainer id="footer" ref={footer}>
          <BorderLine initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 0.6 }} />
          <CatchyMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {getRandomCatchyMessage()}
          </CatchyMessage>
          <FlexContainer>
            <ProfileImageContainer>
              <ProfileImage
                src={profileImage1}
                alt="Jitendra Patidar, LIC Development Officer"
                width="300"
                height="300"
                loading="lazy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(true)}
              />
            </ProfileImageContainer>
            <Onlyforlap>
              <Introduction initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Next lang="hi">
                  <button
                    onClick={() => window.location.href = 'tel:+917987235207'}
                    style={{ padding: '0.3rem 0.6rem', border: '1px solid #ff6b6b', borderRadius: '20px', cursor: 'pointer', background: '#ffbb00', color: '#fff' }}
                    aria-label="Call Jitendra Patidar"
                  >
                    <span>अभी कॉल करें</span> <span role="img" aria-label="Phone">📞</span>
                  </button>
                  {' '} जितेंद्र पाटीदार, एलआईसी विकास अधिकारी, नीमच
                </Next>
                <Next>
                  📞 <span className="light">Contact:</span>{' '}
                  <Link href="tel:+917987235207" id="contactNumber">+91 7987235207</Link> |{' '}
                  <button onClick={copyContactNumber} style={{ padding: '0.3rem 0.6rem', border: '1px solid #ff6b6b', borderRadius: '20px', cursor: 'pointer', background: '#ffbb00', color: '#fff' }}>
                    Copy Number
                  </button>
                </Next>
                <Next>
                  🔗 <span className="light">Instagram:</span>{' '}
                  <Link href="https://www.instagram.com/jay7268patidar" id="instaID" target="_blank">jay7268patidar</Link> |{' '}
                  <button onClick={copyInstaID} style={{ padding: '0.3rem 0.6rem', border: '1px solid #ff6b6b', borderRadius: '20px', cursor: 'pointer', background: '#ffbb00', color: '#fff' }}>
                    Copy Insta ID
                  </button>
                </Next>
                <Next lang="hi">
                  एलआईसी नीमच भारतीय जीवन बीमा निगम की शाखा है, जिसका प्रबंधन जितेंद्र पाटीदार द्वारा किया जाता है। यह नीमच, मंदसौर, और आसपास के क्षेत्रों में बीमा सेवाएँ प्रदान करती है।
                </Next>
                <Next>LIC Neemuch Office: Vikas Nagar, Scheme No. 14-3, Neemuch Chawni, Madhya Pradesh 458441</Next>
                <Next>
                  <Link href="https://licindia.in/hi/home" target="_blank" style={{ padding: '0.3rem 0.6rem', border: '1px solid #ff6b6b', borderRadius: '20px', color: '#fff', background: '#ffbb00' }}>
                    Explore LIC Website
                  </Link>
                </Next>
              </Introduction>
            </Onlyforlap>
            <Suspense fallback={<div>Loading...</div>}>
              <Rating />
            </Suspense>
          </FlexContainer>
          <img
            src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/lic_neemuch_header_11zon.webp"
            alt="Jitendra Patidar LIC Officer Neemuch"
            width="600"
            height="200"
            loading="lazy"
            style={{ margin: '1rem', borderRadius: '10px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}
          />
          <ContactForm onSubmit={handleFormSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ContactInput type="text" name="name" placeholder="आपका नाम" required aria-label="Name" />
            <ContactInput type="email" name="email" placeholder="आपका ईमेल" aria-label="Email" />
            <ContactTextArea name="message" rows="4" placeholder="आपकी प्रतिक्रिया..." aria-label="Feedback" />
            <ContactTextArea name="query" rows="4" placeholder="आपका प्रश्न..." aria-label="Query" />
            <QueryButton type="submit" aria-label="Submit form">जमा करें</QueryButton>
          </ContactForm>
          <Suspense fallback={<div>Loading...</div>}>
            <Review />
          </Suspense>
          <ToastContainer position="top-right" style={{ marginTop: '80px' }} />
        </FooterContainer>
      </main>
      <footer>
        <Text>
          Discover <Link href="https://zedemy.vercel.app" target="_blank">Zedemy</Link> by Sanjay Patidar
        </Text>
        <Text>
          © <span style={{ color: '#ffbb00' }}>EduXcel</span> by Sanjay Patidar | {getCurrentDate()}
        </Text>
      </footer>
    </>
  );
};

export default Home;
