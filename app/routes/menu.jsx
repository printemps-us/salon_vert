import React from 'react';
import Logo from '~/components/Logo';
import {data, useLoaderData, defer} from '@remix-run/react';

export async function loader(args) {
  const staticData = await loadStaticData(args);

  return defer({...staticData});
}

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
  console.log(useLoaderData());
  return (
    <div>
      <div
        className="p-14 flex justify-center w-full"
        style={{backgroundColor: '#006f43'}}
      >
        <div className="responsive-logo">
          <Logo></Logo>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[120px] py-[50px] my-[60px]">
        {data?.staticData.content?.references?.nodes.map((item, index) => (
          <div
            key={`${item.title.value}_title_${index}`}
            className="section flex flex-col items-center gap-8"
          >
            <h3 className="h3-desktop pb-3">{item.title.value}</h3>
            {item.menu_items?.references.nodes.map((item, index) => (
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
                        className="p-small-regular-desktop text-black-2"
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

export default menu;

const MENU_QUERY = `query StaticPageContent {
  metaobjects(type: "menu", first: 10) {
    nodes {
      handle
      content: field(key: "content") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              title: field(key: "title") {
                value
              }
              menu_items: field(key: "menu_items") {
                references(first: 10) {
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
