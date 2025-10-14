import React, {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import RestaurantModal from '../RestaurantModal';
import {Link, useLocation} from '@remix-run/react';
import AnimatedButton from '../AnimatedButton';
import Carrot from '~/assets/Carrot';
import Plus from '~/assets/Plus.svg';
import Minus from '~/assets/Minus.svg';
import CloseIcon from '~/assets/CloseIcon.svg';
import gsap from 'gsap';
import logo from '~/assets/SV_LOGO_031025.png';

function HeaderMobile({data, pathname}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const location = useLocation();
  const [showDetails, setShowDetails] = useState(pathname !== '/');
  const menuRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowDetails(true);
      return;
    } else {
      setShowDetails(false);
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowDetails(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveAccordion(null);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    if (isMenuOpen) {
      gsap.to(menu, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto',
      });
    } else {
      gsap.to(menu, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none',
      });
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveAccordion(null);
    }
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
    setActiveAccordion(null);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    if (isLeftSwipe && isMenuOpen) {
      setIsMenuOpen(false);
      setActiveAccordion(null);
    }
  };

  return (
    <>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87094'}
        link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
        api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
      />

      {/* Mobile Header */}
      <div className="w-full bg-[#006f43] flex justify-between items-center sticky top-0 h-[100px] z-50 px-4 lg:hidden">
        {/* Logo Section */}
        <div
          className={`transition-all duration-500 ease-in-out flex flex-col justify-center ${
            showDetails ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link to="/" onClick={handleMenuLinkClick}>
            <Image
              src={logo}
              width={100}
              sizes="(min-width: 40em) 180px, 360px"
              alt="Salon Vert Logo"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`mobile-menu-button flex flex-col justify-center items-center w-12 h-12 z-50 ${
            isMenuOpen ? 'open' : ''
          }`}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu-panel"
        >
          <div className="line w-6 h-0.5 bg-[#00d58d] mb-1.5 transition-all duration-300"></div>
          <div className="line w-6 h-0.5 bg-[#00d58d] mb-1.5 transition-all duration-300"></div>
          <div className="line w-6 h-0.5 bg-[#00d58d] transition-all duration-300"></div>
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Mobile Menu Panel */}
        <div
          id="mobile-menu-panel"
          ref={menuRef}
          className={`fixed top-0 right-0 h-full w-[85%] max-w-[350px] bg-[#006f43] z-50`}
          role="dialog"
          style={{
            transform: 'translateX(100%)',
            pointerEvents: 'none',
          }}
          aria-modal="true"
          aria-label="Mobile navigation menu"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#00d58d] border-opacity-20">
            <div className="flex flex-col">
              <Link to="/">
                <Image
                  src={logo}
                  width={120}
                  sizes="180px"
                  alt="Salon Vert Logo"
                />
              </Link>
            </div>
            <button
              onClick={toggleMenu}
              className="w-8 h-8 flex items-center justify-center touch-manipulation"
              aria-label="Close menu"
            >
              <img src={CloseIcon} alt="Close" className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col">
            <div className="flex-1 px-4">
              {/* Location Link */}

              {/* About Accordion */}
              <div className="border-b border-[#00d58d] border-opacity-20">
                <button
                  onClick={() => toggleAccordion('about')}
                  className="w-full flex justify-between items-center text-[#00d58d] moderat-bold text-lg py-6 touch-manipulation"
                  aria-expanded={activeAccordion === 'about'}
                >
                  <span style={{textRendering: 'geometricPrecision'}}>
                    ABOUT
                  </span>
                  <img
                    src={activeAccordion === 'about' ? Minus : Plus}
                    alt={activeAccordion === 'about' ? 'Collapse' : 'Expand'}
                    className="w-4 h-4"
                  />
                </button>

                {activeAccordion === 'about' && (
                  <div className="pb-4 space-y-3 animate-fadeIn">
                    {data[0]?.links?.references.nodes.map((item) => {
                      const url = item?.url?.value;
                      const isExternal = url && !url.startsWith('/');

                      return isExternal ? (
                        <a
                          key={`${item?.text?.value}_mobile`}
                          href={url}
                          className="moderat-bold block text-[#00d58d] text-opacity-80 text-base pl-4 py-3 hover:text-opacity-100 transition-opacity touch-manipulation"
                          onClick={handleMenuLinkClick}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.text?.value}
                        </a>
                      ) : (
                        <Link
                          key={`${item?.text?.value}_mobile`}
                          to={url}
                          className="moderat-bold block text-[#00d58d] text-opacity-80 text-base pl-4 py-3 hover:text-opacity-100 transition-opacity touch-manipulation"
                          onClick={handleMenuLinkClick}
                        >
                          {item?.text?.value}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Link
                to="/location"
                className="block text-[#00d58d] moderat-bold text-lg py-6 border-b border-[#00d58d] border-opacity-20 touch-manipulation"
                onClick={handleMenuLinkClick}
              >
                LOCATION
              </Link>
              {/* Menu Link */}
              <div className="border-b border-[#00d58d] border-opacity-20">
                <button
                  onClick={() => toggleAccordion('menu')}
                  className="w-full flex justify-between items-center text-[#00d58d] moderat-bold text-lg py-6 touch-manipulation"
                  aria-expanded={activeAccordion === 'menu'}
                >
                  <span style={{textRendering: 'geometricPrecision'}}>
                    Menu
                  </span>
                  <img
                    src={activeAccordion === 'menu' ? Minus : Plus}
                    alt={activeAccordion === 'menu' ? 'Collapse' : 'Expand'}
                    className="w-4 h-4"
                  />
                </button>

                {activeAccordion === 'menu' && (
                  <div className="pb-4 space-y-3 animate-fadeIn">
                    {data[1]?.links?.references.nodes.map((item) => {
                      const url = item?.url?.value;
                      const isExternal = url && !url.startsWith('/');

                      return isExternal ? (
                        <a
                          key={`${item?.text?.value}_mobile`}
                          href={url}
                          className="moderat-bold block text-[#00d58d] text-opacity-80 text-base pl-4 py-3 hover:text-opacity-100 transition-opacity touch-manipulation"
                          onClick={handleMenuLinkClick}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item?.text?.value}
                        </a>
                      ) : (
                        <Link
                          key={`${item?.text?.value}_mobile`}
                          to={url}
                          className="moderat-bold block text-[#00d58d] text-opacity-80 text-base pl-4 py-3 hover:text-opacity-100 transition-opacity touch-manipulation"
                          onClick={handleMenuLinkClick}
                        >
                          {item?.text?.value}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Link
                to="/contact-us"
                className="block text-[#00d58d] moderat-bold text-lg py-6 mb-1 border-opacity-20 touch-manipulation"
                onClick={handleMenuLinkClick}
              >
                CONTACT US
              </Link>
            </div>

            {/* Reservation Button */}
            <div className="p-6 border-t border-[#00d58d] border-opacity-20">
              <AnimatedButton
                text={'Reservations'}
                bgColor={'#00d58d'}
                hoverColor={'#00d58d'}
                textColor={'black'}
                border="#00d58d"
                hoverBorder={'#00d58d'}
                onClick={() => {
                  setModalOpen(true);
                  handleMenuLinkClick();
                }}
                h="48px"
                w="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderMobile;
