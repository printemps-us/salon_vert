import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money, getSeoMeta} from '@shopify/hydrogen';
import Logo from '~/components/Logo';
import IG from '~/assets/SalonVertIG.png';
import RestaurantModal from '~/components/RestaurantModal';
import AnimatedButton from '~/components/AnimatedButton';
import logo from '~/assets/SV_LOGO_031025.png';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {HOME_QUERY} from '~/components/query/homeQuery';
import StoreInfo from '~/components/StoreInfo';
import RoomCard from '~/components/RoomCard';
import useIsMobile from '~/components/functions/isMobile';
import HomePageMobile from '~/components/mobile/HomePageMobile';
import SmoothScroll from '~/components/SmoothScroll';
/**
 * @param {LoaderFunctionArgs} args
 */
export const loader = createStaticDataLoader(HOME_QUERY);

export const meta = ({data}) => {
  return getSeoMeta({
    title: data?.staticData?.seo?.reference?.title?.value,
    description: data?.staticData?.seo?.reference?.description?.value,
    image: data?.staticData?.seo?.reference?.image?.reference?.image?.url,
  });
};

export default function Homepage() {
  const [modalOpen, setModalOpen] = useState(false);

  /** @type {LoaderReturnData} */
  const {staticData, isMobile} = useLoaderData();
  const isMobileActive = useIsMobile(isMobile);

  // If mobile, render the mobile version
  if (isMobileActive) {
    return <HomePageMobile staticData={staticData} />;
  }
  console.log(staticData);
  // Desktop version
  return (
    <SmoothScroll>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87092'}
        link={'https://resy.com/cities/new-york-ny/venues/salon-vert'}
        api_key={'z4Ih9aYxtWx3obA8GxX8Rsa33g5mQzKZ'}
      ></RestaurantModal>
      <div className="bg-[#006f43] flex flex-col items-center gap-2 py-[100px]">
        <Image
          className="logo"
          src={logo}
          width={'250px'}
          sizes="(min-width: 35em) 60vw, 70vw"
          alt="Salon Vert Logo"
        ></Image>
        <div className='mt-4'>
          <p className="moderat-bold text-center" style={{color: '#00d58d'}}>
            HOURS
          </p>
          <p className="moderat-bold text-center" style={{color: '#00d58d'}}>
            MONDAY - SUNDAY, 11AM - 8PM
          </p>
        </div>

        <div className="mt-16  h-auto w-full flex max-[835px]:flex-col gap-3 justify-center items-center">
          <AnimatedButton
            text={'Book with Resy'}
            bgColor={'#006f43'}
            hoverColor={'#006f43'}
            textColor={'#00d58d'}
            border="#00d58d"
            hoverBorder={'#00d58d'}
            onClick={() => setModalOpen(true)}
            h="42px"
            w="90%"
          />
          <AnimatedButton
            text={'View Menu'}
            bgColor={'#006f43'}
            hoverColor={'#006f43'}
            textColor={'#00d58d'}
            border="#00d58d"
            hoverBorder={'#00d58d'}
            clickURL={'/menu'}
            h="42px"
            w="90%"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center h-[200px] text-center my-6">
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.about_sub.value}
        </p>
      </div>
      <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar h-[550px] no-overscroll px-8">
        {staticData.about_options?.references.nodes.map((item, index) => (
          <div key={item.id} id={item.header.value} className="flex-1">
            <RoomCard
              header={item.header.value}
              sub={item.sub?.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
            />
          </div>
        ))}
      </div>

      <div className="h-[500px] bg-white-2 border-y-1 border-y-white-4 flex">
        <div
          className="flex-1 rounded-br-[300px]"
          style={{
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image within the container
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            backgroundImage: `url(${staticData.find_us_image.reference.image.url})`,
          }}
        ></div>
        <div className="flex-1 flex-col flex justify-center items-center gap-6 text-center">
          <h2 className="h2-desktop w-[220px]">
            {staticData.find_us_title.value}
          </h2>
          <p className="w-[450px] p-standard-medium-desktop text-black-2">
            {staticData.find_us_sub.value}
          </p>
          <AnimatedButton
            h={'42px'}
            w={'339px'}
            text={staticData.find_us_button.reference.button_text.value}
            bgColor={staticData.find_us_button.reference.color.value}
            hoverColor="#006f43"
            clickURL={staticData.find_us_button.reference?.link.value}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center h-[120px] text-center my-12">
        <h2 className="h2-desktop">{staticData.title_header.value}</h2>
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.title_sub.value}
        </p>
      </div>
      <div className="flex gap-4 px-6 mb-10">
        {staticData.title_images.references.nodes.map((item, index) => (
          <div key={index} className="overflow-hidden flex-1 rounded-xl h-[450px]">
            <Image data={item.image} className="w-full h-full object-cover">
              {/* your content here */}
            </Image>
          </div>
        ))}
      </div>
      {/* <StoreInfo data={staticData.icons} bgColor={'#AF4145'}></StoreInfo> */}

      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image?.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="py-10 border-y-1 border-white-4 my-14 bg-white-2">
        <p className="h2-desktop text-center">
          {staticData.as_seen_header?.value}
        </p>
        <div className="pt-12 flex gap-10 items-center overflow-x-auto py-4 justify-center">
          {staticData.as_seen_images?.references.nodes.map((item, index) => (
            <div key={index} className="h-10 flex-shrink-0">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <FooterComponent></FooterComponent>
    </SmoothScroll>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
