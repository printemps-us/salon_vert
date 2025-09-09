import React, {useState} from 'react';
import IG from '~/assets/SalonVertIG.png';
import {Image} from '@shopify/hydrogen';
function FooterComponent({instagram = false}) {
  const [state, setState] = useState({
    isWaiting: false,
    isSubmitted: false,
    isError: false,
  });
  const [email, setEmail] = useState('');
  const url = 'https://printempsnewyork.activehosted.com/proc.php?jsonp=true';

  async function handleSubmit() {
    try {
      const response = await fetch(
        'https://a.klaviyo.com/client/subscriptions/?company_id=XZQ3Bm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Revision: '2025-01-15', // required by Klaviyo
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                custom_source: 'Salon Vert Website',
                profile: {
                  data: {
                    type: 'profile',
                    attributes: {
                      email,
                      // first_name: firstName,
                      // last_name: lastName,
                    },
                  },
                },
              },
              relationships: {
                list: {
                  data: {
                    type: 'list',
                    id: 'R949bn', // your list ID
                  },
                },
              },
            },
          }),
        },
      );

      if (response.ok) {
        setState({
          isWaiting: false,
          isSubmitted: true,
        });
      } else {
        console.error('Failed to subscribe:', await response.json());
      }
    } catch (err) {
      console.error('Error subscribing:', err);
    }
  }
  // NOTE • Valid Email checker
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );
  return (
    <div className="footer-container relative overflow-hidden">
      <div className="above-footer bg-[#006f43]">
        {instagram && (
          <a
            href="https://urlgeni.us/instagram/maisonpasserellenyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/IG_LOGO.png?v=1736792345"
              alt="Instagram Logo"
              width={42}
            />
          </a>
        )}
        <p className="moderat-bold sign-up-text" style={{color: '#00d58d'}}>
          Salon Vert is part of Printemps new york, For more information sign up
          for our newsletter
        </p>
      </div>
      <div className="footer-area h-[50px] overflow-hidden">
        <p
          className="moderat-bold"
          style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
        >
          {state.isSubmitted ? 'Merci!' : 'Sign up for our newsletter'}
        </p>
        {state.isSubmitted ? (
          <p
            className="moderat-bold"
            style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
          >
            Check your email for updates
          </p>
        ) : (
          <input
            value={email}
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
            className="moderat-bold footer-input bg-white"
            style={{fontSize: '12px'}}
          ></input>
        )}
        {state.isSubmitted ? (
          <p></p>
        ) : (
          <button
            className="footer-button"
            onClick={handleSubmit}
            disabled={!validEmail.test(email)}
            style={{cursor: !validEmail.test(email) ? 'auto' : 'pointer'}}
          >
            <p
              className="moderat-bold"
              style={{fontSize: '12px', color: 'white'}}
            >
              Submit
            </p>
          </button>
        )}
        <div>
          <a
            href="https://urlgeni.us/instagram/salonvertnyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={IG} alt="Instagram Logo" width={50} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterComponent;
