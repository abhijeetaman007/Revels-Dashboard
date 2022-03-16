import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import Layout from '../Layout/Layout';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function displayRazorpay(delegateCardID) {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  console.log('Load Script ', res);
  if (!res) {
    alert('Razorpay SDK failed to load.');
    return;
  }

  //Helps start an order and register order with razorpay
  const resp = await axios.post('/api/user/payment', {
    delCard_id: delegateCardID,
  });

  let data = resp.data.data;
  console.log('POST DATA : ', data);

  const options = {
    key: 'rzp_test_YwEGRlKoqLToxD',
    currency: data.currency,
    amount: String(data.amount),
    order_id: data.orderId, //OrderId generated by backend sent in response in previous get request
    name: data.name, //Name of Ticket/Card
    description: "Revels'22",
    // Logo Image
    image:
      'https://scontent.fixr3-2.fna.fbcdn.net/v/t1.6435-9/81363115_3254316291309114_9119946810595475456_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=z5N4zUOYsqgAX-DZ3CE&_nc_ht=scontent.fixr3-2.fna&oh=00_AT8fP09Jreo-FiZHchIMQKb806mPWPs0rrg-ovT91MFfEQ&oe=622F8575',
    prefill: {
      name: 'userName', //Enter Logged In User details to be prefilled in checkout form
      email: 'test@test.com',
      contact: '919999999999',
    },

    // After Checkout following Handler is called which confirms payment is made to backend
    // Alternatively in production can be done using Razorpay web-hooks -- (Better but can be used only in production) -- backend route for the same is ready
    handler: function (response) {
      console.log('Response Razorpay', response);
      axios
        .post('/api/user/payment/verify', {
          order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        })
        .then((resp) => {
          if (resp.data.success) {
            alert('Payment successful');
          } else {
            alert('Payment Failed');
          }
        });
    },
  };
  console.log('Payment Initiated');

  //Finally opens checkout window and where user pays for registered order
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

function DelegatePage() {
  const [delegateCard, setDelegateCard] = useState([]);

  async function fetchDelegateCards() {
    // To get all types of proshow and non proshow

    //NOT WORKING WITH BASE URL HAD TO PUT BASE AS WELL
    const resp = await axios.get(
      'http://localhost:5000/api/user/delegatecard/getall'
    );
    console.log('DATA ', resp.data);
    setDelegateCard(resp.data.data);
  }

  useEffect(() => {
    fetchDelegateCards();
  }, []);
  const colorArr = ['delcardblue', 'delcardpurple', 'delcardblack'];
  return (
    <Layout activeTab={'delegate-card'}>
      <div className="delegate-container">
        <p className="title">Delegate Cards</p>
        <div className="del-flex">
          {delegateCard.map((x, idx) => (
            <div className={colorArr[idx % 3].toString()}>
              <h1 style={{ color: 'white' }}>{x.name}</h1>
              <div style={{ color: 'white', marginTop: '10px' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took
                <div className="collegetype">
                  <div className="clg">
                    <center> MAHE STUDENTS</center>

                    <center>{x.mahePrice}</center>
                  </div>
                  <div className="clg">
                    NON-MAHE STUDENTS
                    <center>{x.nonMahePrice}</center>
                  </div>
                </div>
                <center>
                  {x.isActive ? (
                    <div style={{ color: 'green', fontWeight: 'bold' }}>
                      ACTIVE
                    </div>
                  ) : (
                    <div style={{ color: 'red', fontWeight: 'bold' }}>
                      INACTIVE
                    </div>
                  )}
                  <button onClick={() => displayRazorpay(x._id)}>
                    BUY NOW
                  </button>
                </center>
              </div>
            </div>
          ))}
        </div>
      </div>
      );
    </Layout>
  );
}

export default DelegatePage;
