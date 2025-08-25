import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import AnimatedButton from '../AnimatedButton';
import RestaurantModal from '../RestaurantModal';
import RoomCard from '../RoomCard';
import FooterMobile from './FooterMobile';
import logo from '~/assets/SV_LOGO_031025.png';
function HomePageMobile({staticData}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87092'}
        link={'https://resy.com/cities/new-york-ny/venues/salon-vert'}
        api_key={'z4Ih9aYxtWx3obA8GxX8Rsa33g5mQzKZ'}
      />

      {/* Hero Section */}
      <div className="bg-[#006f43] flex flex-col items-center gap-2 py-16 px-4">
        <Image
          className="logo"
          src={logo}
          width={'250px'}
          sizes="(min-width: 35em) 60vw, 70vw"
          alt="Salon Vert Logo"
        />

        <div className='mt-6'>
          <p
            className="moderat-bold text-center text-sm"
            style={{color: '#00d58d'}}
          >
            HOURS
          </p>
          <p
            className="moderat-bold text-center text-sm"
            style={{color: '#00d58d'}}
          >
            MONDAY - SUNDAY, 11AM - 7PM
          </p>
        </div>

        <div className="mt-12 w-full flex flex-col gap-3 justify-center items-center">
          <AnimatedButton
            text={'Book with Resy'}
            bgColor={'#00d58d'}
            hoverColor={'#00d58d'}
            textColor={'black'}
            border="#00d58d"
            hoverBorder={'#00d58d'}
            onClick={() => setModalOpen(true)}
            h="48px"
            w="100%"
          />
          <AnimatedButton
            text={'View Menu'}
            bgColor={'#00d58d'}
            hoverColor={'#00d58d'}
            textColor={'black'}
            border="#00d58d"
            hoverBorder={'#00d58d'}
            clickURL={'/menu'}
            h="48px"
            w="100%"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="w-full flex flex-col items-center justify-center py-8 px-4 text-center">
        <p className="w-full p-small-regular-mobile text-black-2">
          {staticData.about_sub.value}
        </p>
      </div>

      {/* Room Cards Section - Mobile Scroll */}
      <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar px-4 pb-8">
        {staticData.about_options.references.nodes.map((item, index) => (
          <div
            key={item.id}
            id={item.header.value}
            className="flex-shrink-0 w-[280px]"
          >
            <RoomCard
              header={item.header.value}
              sub={item.sub?.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
              isMobile={true}
            />
          </div>
        ))}
      </div>

      {/* Find Us Section - Mobile Layout */}
      <div className="h-auto bg-white-2 border-y-1 border-y-white-4 flex flex-col">
        <div
          className="h-[300px] w-full"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${staticData.find_us_image.reference.image.url})`,
          }}
        />
        <div className="flex flex-col justify-center items-center gap-6 text-center p-6">
          <h2 className="h2-mobile w-full">{staticData.find_us_title.value}</h2>
          <p className="w-full p-small-regular-mobile text-black-2">
            {staticData.find_us_sub.value}
          </p>
          <AnimatedButton
            h={'48px'}
            w={'100%'}
            text={staticData.find_us_button.reference.button_text.value}
            bgColor={staticData.find_us_button.reference.color.value}
            hoverColor={staticData.find_us_button.reference.hover_color.value}
            clickURL={staticData.find_us_button.reference?.link.value}
          />
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full flex flex-col items-center justify-center py-8 px-4 text-center">
        <h2 className="h2-mobile mb-4">{staticData.title_header.value}</h2>
        <p className="w-full p-small-regular-mobile text-black-2">
          {staticData.title_sub.value}
        </p>
      </div>

      {/* Title Images - Mobile Carousel */}
      <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar px-4 pb-8 mb-10">
        {staticData.title_images.references.nodes.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] overflow-hidden rounded-xl h-[300px]"
          >
            <Image data={item.image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* As Seen Section */}
      <div className="py-8 border-y-1 border-white-4 my-8 bg-white-2">
        <p className="h2-mobile text-center mb-12">
          {staticData.as_seen_header?.value}
        </p>
        <div className="flex flex-col gap-6 items-center py-4 px-4">
          {staticData.as_seen_images?.references.nodes.map((item, index) => (
            <div key={index} className="h-8 w-full flex justify-center">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterMobile />
    </div>
  );
}

export default HomePageMobile;
