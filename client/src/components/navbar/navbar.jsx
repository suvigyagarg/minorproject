import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import Signin from '../signIn/signIn'
import { AuthContext } from '../../context/authContext';



export default function Navbar() {
    const [activeOption, setActiveOption] = useState('');
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const { dispatch } = useContext(AuthContext);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY < 700 ) {
          setActiveOption('home');
        } else if (scrollY < 1600) {
          setActiveOption('discover');
        } else if (scrollY < 2300) {
          setActiveOption('testimonials');
        } else {
          setActiveOption('faqs');
        }
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const handleOptionClick = (sectionId) => {
        
        if (sectionId === 'home') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 1, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'discover') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 700, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'testimonials') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 1850, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'faqs') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 2550, behavior: 'smooth' });
          }, 0);
        } 
      };

      const openSignInModal = () => {
        setIsSignInModalOpen(true);
        document.body.classList.add('body-no-scroll');
      };
    
      const closeSignInModal = () => {
        setIsSignInModalOpen(false);
        document.body.classList.remove('body-no-scroll');
      };

      const handeLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }


      
  return (
    <div className='navbarWrapper'>
        <div className='left'>
          <Link to='/'>
            <div className='logo'>
            <img src="/images/logo.png" alt="logo" className='logoimg'/>
            <span className='boldlogo'>Eco</span>
            <span className='logosimple'>Voyage</span>
            </div>
          </Link>
        </div>
        <div className="center">
            <ul className='centerList'>
            
        <li className={activeOption === 'home' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('home')}>
          Home
        </li>

        <li className={activeOption === 'discover' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('discover')}>Discover</li>
        <li className={activeOption === 'testimonials' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('testimonials')}>Reviews</li>
        <li className={activeOption === 'faqs' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('faqs')}>FAQs</li>
            </ul>
        </div>
        <div className="right">
          {user ? (
            <button className='signin' onClick={handeLogout}>Logout</button>
          ) : (
            <button className='signin' onClick={openSignInModal}>Sign in</button>
          )}
        </div>
        {isSignInModalOpen && <Signin onClose={closeSignInModal} />}
    </div>
    
  )
}
