import React, {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import RestaurantModal from './RestaurantModal';
import {Link} from '@remix-run/react';
import {data, useLoaderData, defer} from '@remix-run/react';
import AnimatedButton from './AnimatedButton';
import HeaderDropDown from './HeaderDropDown';
import Carrot from '~/assets/Carrot';
import {useLocation} from '@remix-run/react';
import Homepage from '~/routes/_index';
import useIsMobile from './functions/isMobile';
import HeaderMobile from './mobile/HeaderMobile';
import logo from '../assets/SV_LOGO_031025.png';
import Popup from './Popup';

function HeaderComponent({data, isMobile, pathname, popupData}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showDetails, setShowDetails] = useState(() => {
    // On homepage, show only if already scrolled
    if (typeof window !== 'undefined' && isHomePage) {
      return window.scrollY > 200;
    }
    // On any other page, always show
    return true;
  });

  const hoverRef = useRef(null);
  const dropdownRef = useRef(null);
  let leaveTimeout = null;

  // Use the server-side mobile detection
  const isMobileActive = useIsMobile(isMobile);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    // safe - only runs in browser
    const hasSeen = sessionStorage.getItem('hasSeenPopup');
    if (hasSeen) {
      setSeen(true);
    }
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowDetails(true);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowDetails(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMouseLeave = (e) => {
    if (e.relatedTarget instanceof Window) {
      setIsHover(false);
      // Add your hover close logic here
    } else if (
      e.relatedTarget &&
      dropdownRef.current &&
      dropdownRef.current?.contains(e.relatedTarget) &&
      !hoverRef.current.contains(e.relatedTarget)
    ) {
      // If the mouse is moving into the specific div, do nothing.
      return;
    }
    leaveTimeout = setTimeout(() => {
      setIsHover(false);
    }, 200);
  };

  const handleMouseEnter = (section) => {
    clearTimeout(leaveTimeout);
    setIsHover(section); // 'about' or 'menu'
  };

  // If mobile, render the mobile header
  if (isMobileActive) {
    return (
      <>
        <RestaurantModal
          setOpenModal={setModalOpen}
          openModal={modalOpen}
          venue_id={'87092'}
          link={'https://resy.com/cities/new-york-ny/venues/salon-vert'}
          api_key={'z4Ih9aYxtWx3obA8GxX8Rsa33g5mQzKZ'}
        />
        {!seen && showNewsletter && popupData.show.value == 'true' && (
          <Popup
            data={popupData}
            onClose={() => setShowNewsletter(false)}
            isMobile={true}
          />
        )}
        <HeaderMobile data={data} pathname={pathname} />
      </>
    );
  }
  // Desktop header
  return (
    <>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87092'}
        link={'https://resy.com/cities/new-york-ny/venues/salon-vert'}
        api_key={'z4Ih9aYxtWx3obA8GxX8Rsa33g5mQzKZ'}
      ></RestaurantModal>
      {!seen && showNewsletter && popupData.show.value == 'true' && (
        <Popup data={popupData} onClose={() => setShowNewsletter(false)} />
      )}
      <div className="w-full bg-[#006f43] flex justify-between sticky top-0 h-[100px] z-100">
        <div
          className={`py-4 px-8 transition-all duration-500 ease-in-out flex flex-col justify-center  ${
            showDetails ? 'opacity-100 h-full' : 'opacity-0 max-h-0'
          }`}
        >
          <Link to="/">
            <Image
              src={logo}
              width={120} // ✅ number, not '50px'
              sizes="(min-width: 35em) 250px, 500px"
              alt="Salon Vert Logo"
            />
          </Link>

          {/* <div className="mt-1 ml-1">
            <p className="moderat-bold text-sm " style={{color: '#00d58d'}}>
              ONE WALL STREET, NEW YORK, NEW YORK
            </p>
          </div> */}
        </div>
        <div className="flex gap-12 items-center px-4">
          <div
            className="text-[#00d58d] moderat-bold cursor-pointer h-full flex items-center gap-1 text-sm"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
            ref={hoverRef}
          >
            <span>ABOUT</span>
            <Carrot rotated={isHover} />
          </div>
          <Link
            to="/location"
            className="text-[#00d58d] moderat-bold cursor-pointer text-sm"
          >
            LOCATION
          </Link>
          <div
            className="text-[#00d58d] moderat-bold cursor-pointer text-sm h-full flex items-center gap-1 relative"
            onMouseEnter={() => handleMouseEnter('menu')}
            onMouseLeave={handleMouseLeave}
            ref={hoverRef}
          >
            <span>MENU</span>
            <Carrot rotated={isHover === 'menu'} />
          </div>
          <Link
            to="/contact-us"
            className="text-[#00d58d] moderat-bold cursor-pointer text-sm"
          >
            CONTACT US
          </Link>
          <AnimatedButton
            text="RESERVE A TABLE"
            onClick={() => setModalOpen(true)}
            bgColor="#00d58d"
            textColor="#006f43"
            hoverColor="#00d58d"
            border="#00d58d"
            w="180px"
            h="40px"
          />
        </div>
        <HeaderDropDown
          isHover={isHover}
          handleMouseLeave={handleMouseLeave}
          dropdownRef={dropdownRef}
          hoverRef={hoverRef}
          hoverValue="menu"
          headerData={data}
          handleMouseEnter={handleMouseEnter}
        />
      </div>
    </>
  );
}

export default HeaderComponent;
