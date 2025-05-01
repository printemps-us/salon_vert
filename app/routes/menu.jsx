import React, {useRef, useState, useEffect} from 'react';
import Logo from '~/components/Logo';
import {
  data,
  useLoaderData,
  defer,
  useNavigate,
  Link,
  useLocation,
} from '@remix-run/react';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import SmoothScroll from '~/components/SmoothScroll';

export async function loader(args) {
  const staticData = await loadStaticData(args);

  return defer({...staticData});
}
export const meta = ({data}) => {
  // pass your SEO object to getSeoMeta()
  return getSeoMeta({
    title: 'Salon Vert - Printemps New York - Menu',
    description:
      "Salon Vert, a Parisian-inspired raw bar by Chef Gregory Gourdet, serves fresh seafood, bold Haitian flavors, and a signature mignonette. ",
    // image: data.staticData.seo?.reference.image?.reference?.image.url,
  });
};
async function loadStaticData({context}) {
  try {
    // Run the query
    const data = await context.storefront.query(MENU_QUERY);
    // Process the result
    const metaobjects = data.metaobjects.nodes[0];
    return {
      staticData: metaobjects,
    };
  } catch (error) {
    console.error('Error in loader:', error);
    // Handle or rethrow the error as needed
    throw new Error('Failed to load static data');
  }
}

function menu() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const isInitialRender = useRef(true);

  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isBigger =
    width > data.staticData.content?.references.nodes.length * 140;
  const [currentSection, setCurrentSection] = useState(null);
  const roomsHeaderRef = useRef();
  const location = useLocation();
  const handleClick = () => {
    if (window.resyWidget) {
      resyWidget.openModal({
        venueId: data.resy_button?.reference?.venueId?.value,
        apiKey: data.resy_button?.reference?.api_key?.value,
        replace: 'true',
      });
    } else {
      console.error('Resy widget is not available.');
    }
  };
  const handleLinkClick = (e, linkValue) => {
    e.preventDefault(); // Prevent default anchor behavior
    const target = document.querySelector(linkValue);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 220, // Adjust offset as needed
        behavior: 'smooth',
      });
    }
  };
  function organizeMenuItems(data) {
    const result = [];
    let currentArray = [];

    data.forEach((item) => {
      if (item.master_header) {
        // Start a new array for the master header
        currentArray = [item];
        result.push(currentArray);
      } else if (!item.link) {
        // Continue adding items under the current master header
        currentArray.push(item);
      } else {
        // If there's a link, start a new array
        currentArray = [item];
        result.push(currentArray);
      }
    });

    return result;
  }
  const organizedMenuItems = organizeMenuItems(
    data.staticData.content.references.nodes,
  );
  useEffect(() => {
    console.log('useeffect first', location);
    gsap.registerPlugin(ScrollTrigger);
    navigate(location.pathname, {replace: true});
    // Wait for content to be ready
    const initScrollTriggers = () => {
      // Kill any existing ScrollTriggers first
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Room size animations
      gsap.utils.toArray('.room').forEach((room) => {
        gsap.fromTo(
          room,
          {width: '100px', height: '100px'},
          {
            width: '75px',
            height: '75px',
            scrollTrigger: {
              trigger: roomsHeaderRef.current,
              start: '15% 20%',
              end: '45% 20%',
              toggleActions: 'play none none reverse',
              scrub: true,
              onEnterBack: () => setCurrentSection(null),
              immediateRender: false,
            },
          },
        );
      });

      // Section tracking
      gsap.utils.toArray('.section').forEach((section) => {
        console.log(section);
        const sectionId = section.id;
        // Find the corresponding node in data
        const node = data?.staticData.content?.references?.nodes.find(
          (n) => n?.link?.value === sectionId,
        );
        console.log(node);
        if (!node) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: '-100px 25%',
          end: '100% 25%',
          toggleActions: 'play none none reverse',
          onEnter: () => setCurrentSection(section.id),
          onEnterBack: () => setCurrentSection(section.id),
          immediateRender: false,
        });
      });

      // Header border animation
      gsap.fromTo(
        roomsHeaderRef.current,
        {borderBottom: '1px solid #006f43'},
        {
          borderBottom: '1px solid #00d58d',
          scrollTrigger: {
            trigger: roomsHeaderRef.current,
            start: '15% 20%',
            end: '15% 20%',
            toggleActions: 'play none none reverse',
            immediateRender: false,
          },
        },
      );

      // Force a refresh after initialization
      ScrollTrigger.refresh();
    };

    // Delay initialization and add a second refresh
    const timer = setTimeout(() => {
      initScrollTriggers();
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.killAll();
    };
  }, []);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // Skip first render
      console.log('locay', location);
      return;
    }

    if (location.hash) {
      const scrollToTarget = () => {
        const target = document.querySelector(location.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 200,
            behavior: 'smooth',
          });
        }
      };

      const timeout = setTimeout(() => {
        requestAnimationFrame(scrollToTarget);
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [location]);
  // Empty dependency array since we want this to run once on mount
  const nodesWithLinks =
    data?.staticData.content?.references?.nodes?.filter(
      (node) => node?.link?.value,
    )?.length || 0;
  console.log(organizedMenuItems);
  return (
    <SmoothScroll>
      <div
        className="p-14 flex justify-center w-full"
        style={{backgroundColor: '#006f43'}}
      >
        <Link to={'/'} className="responsive-logo">
          <Logo></Logo>
        </Link>
      </div>
      <div
        ref={roomsHeaderRef}
        className="flex gap-8 w-full px-8 sticky hide-scrollbar top-[0px] bg-white py-[18px] z-20 overflow-x-scroll"
        style={{
          paddingLeft: `max((100vw - ${nodesWithLinks * 132}px) / 2, 0px)`,
          backgroundColor: '#006f43'
        }}
      >
        {data?.staticData.content?.references?.nodes?.map((item, index) => (
          <>
            {item?.link?.value && (
              <Link
                key={index}
                className="text-center w-[100px] flex flex-col gap-3 cursor-pointer items-center link"
                to={`#${item?.link?.value}`}
              >
                <div
                  className={`${
                    currentSection == item?.link?.value ? 'border-2' : ''
                  } border-[#00d58d] h-[100px] p-0.5 rounded-full room w-full`}
                >
                  <div className=" rounded-full w-full h-full overflow-hidden ">
                    <Image
                      className="h-full w-full object-cover"
                      src={item?.image?.reference?.image?.url}
                      alt={item?.image?.reference?.image?.altText}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      sizes="(min-width: 2em) 5em, 10em"
                    ></Image>
                  </div>
                </div>
                <span
                  className={`${
                    currentSection == item?.link?.value
                      ? 'p-small-bold-desktop'
                      : 'p-small-regular-desktop'
                  } text-white`}
                >
                  {item?.master_header?.value
                    ? item?.master_header?.value
                    : item?.title?.value}
                </span>
              </Link>
            )}
          </>
        ))}
      </div>

      <div
        className="flex flex-col items-center gap-[120px] pt-[120px] pb-[300px]"
        style={{
          color: 'white',
          backgroundColor: '#006f43',
        }}
      >
        {organizedMenuItems.map((section, section_index) => (
          <div
            key={`${section?.title?.value}_title_${section_index}`}
            id={section[0]?.link?.value}
            className="section flex flex-col items-center gap-8"
          >
            {section.map((item, index) => (
              <div
                key={`${item?.title?.value}_title_${index}`}
                className="flex flex-col items-center gap-8"
              >
                <h3 className="h3-desktop pb-3 moderat-bold text-center">
                  {item?.title?.value}
                </h3>
                {item?.menu_items?.references?.nodes?.map((item, index) => (
                  <div
                    key={`${item?.title?.value}_item_${index}`}
                    className="gap-3 flex flex-col items-center"
                  >
                    <p className="p-standard-bold-desktop uppercase urbanist text-center">
                      {item.title.value}
                    </p>
                    <div className="flex urbanist">
                      {item?.ingredients?.value &&
                        JSON.parse(item?.ingredients?.value).map(
                          (ingredient, index, array) => (
                            <p
                              key={`${ingredient}_item_${index}`}
                              className="p-small-regular-desktop text-center"
                            >
                              {ingredient}
                              {index < array.length - 1 && '・'}
                            </p>
                          ),
                        )}
                    </div>
                    <p className="p-small-bold-desktop text-center">
                      ${item?.price?.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </SmoothScroll>
  );
}

export default menu;

const MENU_QUERY = `query StaticPageContent {
  metaobjects(type: "menu", first: 10) {
    nodes {
      handle
      content: field(key: "content") {
        references(first: 30) {
          nodes {
            ... on Metaobject {
              title: field(key: "title") {
                value
              }
              link: field(key: "link") {
                value
              }
                master_header: field(key: "master_header") {
              value
            }
                image: field(key: "image") {
                      reference {
                        ... on MediaImage {
                          image {
                            url
                            altText
                          }
                        }
                      }
                    }
              menu_items: field(key: "menu_items") {
                references(first: 50) {
                  nodes {
                    ... on Metaobject {
                      title: field(key: "title") {
                        value
                      }
                      price: field(key: "price") {
                        value
                      }
                      ingredients: field(key: "ingredients") {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
