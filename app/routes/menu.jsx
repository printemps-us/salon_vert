import React, {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import AnimatedButton from '~/components/AnimatedButton';
// import SmoothScroll from './SmoothScroll';
import {Link, useLocation} from '@remix-run/react';
import gsap from 'gsap';
// import {ScrollTrigger} from 'gsap/ScrollTrigger';

function Menu() {
  const data = {
    key: {
      value: 'salon vert menu',
    },
    color: {
      value: '#1e783d',
    },
    background_image: null,
    restaurant_logo: {
      reference: {
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0636/5164/3554/files/SalonVertLogo.png?v=1736465456',
          altText: null,
        },
      },
    },
    resy_button: {
      reference: {
        key: {
          value: 'salon vert resy button',
        },
        button_text: {
          value: 'Book with Resy',
        },
        link: {
          value: 'https://resy.com/cities/new-york-ny/venues/salon-vert',
        },
        color: {
          value: '#000000',
        },
        hover_color: {
          value: '#000000',
        },
        venueId: {
          value: '87092',
        },
        api_key: {
          value: 'z4Ih9aYxtWx3obA8GxX8Rsa33g5mQzKZ',
        },
      },
    },
    resy_out_button: {
      reference: {
        key: {
          value: 'salon vert resy out button',
        },
        button_text: {
          value: 'Book in Resy App',
        },
        link: {
          value: 'https://resy.com/cities/new-york-ny/venues/salon-vert',
        },
        color: {
          value: '#ffffff',
        },
        hover_color: {
          value: '#00cf77',
        },
      },
    },
    content: {
      references: {
        nodes: [
          {
            title: {
              value: 'Brunch & Breakfast',
            },
            link: {
              value: 'lunch-and-breakfast',
            },
            menu_items: {
              references: {
                nodes: [
                  {
                    title: {
                      value: 'Test Item 2',
                    },
                    price: {
                      value: '25',
                    },
                    ingredients: {
                      value: '["Lemon","Gin","Tonic"]',
                    },
                  },
                  {
                    title: {
                      value: 'Test Item 1',
                    },
                    price: {
                      value: '13',
                    },
                    ingredients: {
                      value: '["Scotch","Amaro","Lemon","Grapefruit"]',
                    },
                  },
                ],
              },
            },
            image: {
              reference: {
                image: {
                  url: 'https://cdn.shopify.com/s/files/1/0636/5164/3554/files/pexels-pixabay-262978.jpg?v=1731423497',
                  altText: null,
                },
              },
            },
          },
          {
            title: {
              value: 'Non-Alcoholic Drinks',
            },
            link: {
              value: 'non-alcoholic-drinks',
            },
            menu_items: {
              references: {
                nodes: [
                  {
                    title: {
                      value: 'Test Item 2',
                    },
                    price: {
                      value: '25',
                    },
                    ingredients: {
                      value: '["Lemon","Gin","Tonic"]',
                    },
                  },
                  {
                    title: {
                      value: 'Test Item 1',
                    },
                    price: {
                      value: '13',
                    },
                    ingredients: {
                      value: '["Scotch","Amaro","Lemon","Grapefruit"]',
                    },
                  },
                ],
              },
            },
            image: {
              reference: {
                image: {
                  url: 'https://cdn.shopify.com/s/files/1/0636/5164/3554/files/pexels-wildlittlethingsphoto-696218.jpg?v=1731423498',
                  altText: null,
                },
              },
            },
          },
          {
            title: {
              value: 'Cocktails',
            },
            link: {
              value: 'cocktails',
            },
            menu_items: {
              references: {
                nodes: [
                  {
                    title: {
                      value: 'Test Item 2',
                    },
                    price: {
                      value: '25',
                    },
                    ingredients: {
                      value: '["Lemon","Gin","Tonic"]',
                    },
                  },
                  {
                    title: {
                      value: 'Test Item 1',
                    },
                    price: {
                      value: '13',
                    },
                    ingredients: {
                      value: '["Scotch","Amaro","Lemon","Grapefruit"]',
                    },
                  },
                ],
              },
            },
            image: {
              reference: {
                image: {
                  url: 'https://cdn.shopify.com/s/files/1/0636/5164/3554/files/pexels-chris-f-38966-1283219.jpg?v=1731423499',
                  altText: null,
                },
              },
            },
          },
        ],
      },
    },
  };
  const [currentSection, setCurrentSection] = useState(null);
  const roomsHeaderRef = useRef();
  const location = useLocation();
  const handleClick = () => {
    if (window.resyWidget) {
      resyWidget.openModal({
        venueId: '87092',
        apiKey: 'z4Ih9aYxtWx3obA8GxX8Rsa33g5mQzKZ',
        replace: 'true',
      });
    } else {
      console.error('Resy widget is not available.');
    }
  };

  return (
    <div>
      {data.resy_button && (
        <div
          // ref={fixedDiv}
          className=" overflow-hidden w-screen bg-white border-t-1 border-t-white-4 fixed bottom-0 flex justify-center items-center z-30 py-3"
        >
          <div className="flex gap-3">
            <AnimatedButton
              h={'42px'}
              w={'339px'}
              text={data.resy_button.reference.button_text?.value}
              bgColor={data.resy_button.reference.color?.value}
              border={data.resy_button.reference.button_text?.value}
              hoverColor={data.resy_button.reference.hover_color?.value}
              onClick={handleClick}
            />
            <AnimatedButton
              h={'42px'}
              w={'339px'}
              text={data.resy_out_button.reference.button_text?.value}
              bgColor={data.resy_out_button.reference.color?.value}
              hoverColor={data.resy_out_button.reference.hover_color?.value}
              onClick={() => {
                window.open(
                  'https://resy.com/cities/new-york-ny/venues/salon-vert',
                );
              }}
              arrow
              arrowStart
            />
          </div>
        </div>
      )}
      <div
        className="h-[280px] flex-col flex items-center py-[60px] mb-[60px]"
        style={{
          backgroundImage: data.hero_background
            ? `url(${data.hero_background.reference.image.url})`
            : 'none',
          backgroundColor: data.hero_background
            ? 'transparent'
            : data.color?.value,
          backgroundSize: 'cover', // Ensures the image covers the entire container
          backgroundPosition: 'center', // Centers the image within the container
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="h-[160px] mb-8 flex items-center ">
          <Image
            className="w-auto h-[82px]"
            src={data.restaurant_logo?.reference.image.url}
          ></Image>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[120px] py-[50px] my-[60px]">
        {data.content.references.nodes.map((item, index) => (
          <div
            key={`${item.title.value}_title_${index}`}
            id={item.link.value}
            className="section flex flex-col items-center gap-8"
          >
            <h3 className="h3-desktop pb-3">{item.title.value}</h3>
            {item.menu_items.references.nodes.map((item, index) => (
              <div
                key={`${item.title.value}_item_${index}`}
                className="gap-3 flex flex-col items-center"
              >
                <p className="p-standard-bold-desktop uppercase">
                  {item.title.value}
                </p>
                <div className="flex">
                  {JSON.parse(item.ingredients.value).map(
                    (ingredient, index, array) => (
                      <p
                        key={`${ingredient}_item_${index}`}
                        className="p-small-regular-desktop"
                      >
                        {ingredient}
                        {index < array.length - 1 && '・'}
                      </p>
                    ),
                  )}
                </div>
                <p className="p-small-bold-desktop">${item.price.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
