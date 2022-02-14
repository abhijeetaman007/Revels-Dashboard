import { useEffect, useState } from 'react';
import React from 'react';
const axios = require('axios');

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
    const res = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js'
    );
    console.log('Load Script ', res);

    if (!res) {
        alert('Razorpay SDK failed to load.');
        return;
    }

    const resp = await axios.post('http://localhost:5000/api/user/payment', {
        delCard_id: delegateCardID,
    });
    let data = resp.data.data;
    console.log('POST DATA : ', data);

    const options = {
        key: 'rzp_test_YwEGRlKoqLToxD',
        currency: data.currency,
        amount: String(data.amount),
        order_id: data.orderId,
        name: "Revels'22 Delegate Card",
        description: 'Thanks!',
        image: './revels20.jpeg',
        handler: function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
            console.log('Response Razorpay', response);
        },
        prefill: {
            name: 'userName', //Enter Logged In User details
            email: 'test@test.com',
            contact: '919999999999',
        },
    };
    console.log('Payment Initiated');
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

function DelegateCard() {
    async function fetchDelegateCards() {
        let resp = await axios.get(
            'http://localhost:5000/api/user/delegatecard/getall'
        );
        console.log('DATA ', resp.data);
        setDelegateCard([...resp.data.data]);
    }
    const [delegateCard, setDelegateCard] = useState([
        {
            name: '',
            isProShow: '',
            mahePrice: '',
            nonMahePrice: '',
            isActive: '',
            description: '',
            _id: '',
        },
    ]);
    useEffect(() => {
        fetchDelegateCards();
    }, []);

    return (
        <div>
            {delegateCard.map((delCard) => {
                let {
                    name,
                    isProShow,
                    mahePrice,
                    nonMahePrice,
                    isActive,
                    description,
                    _id,
                } = delCard;
                return (
                    <div>
                        <p>
                            Name : {name} <br />
                            isProShow : {isProShow} <br />
                            MAHE-Price: {mahePrice} <br />
                            NON-MAHE Price : {nonMahePrice} <br />
                            description : {description} <br />
                            <button onClick={() => displayRazorpay(_id)}>
                                BUY
                            </button>
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default DelegateCard;
