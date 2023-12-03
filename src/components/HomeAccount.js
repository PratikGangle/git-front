import { useState, useEffect } from "react";

function HomeAccount() {

    const [email, setEmail] = useState('');

    const check = async () => {
        try {
            const response = await fetch('/home', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('User is valid. Email:', data.email);
                setEmail(data.email);
            } else if (response.status === 401) {
                console.log('User is not valid. Proceed to error page');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        check();
    }, []);

    const [amount, setAmount] = useState('');
    const [plan, setPlan] = useState('');

    const userInformation = async () => {
        try {
            const response = await fetch(`/homeaccount/${email}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log('User data:', data[0].plan);
                setAmount(data[0].plan);
                if (data[0].plan === 149) {
                    setPlan('Mobile')
                }
                else if (data[0].plan === 199) {
                    setPlan('Basic')
                }
                else if (data[0].plan === 499) {
                    setPlan('Standard')
                }
                else if (data[0].plan === 649) {
                    setPlan('Premium')
                }
            } else if (response.status === 401) {
                console.log('User is not valid. Proceed to error page');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (email.length !== 0) {
            userInformation()
        }
    }, [email])

    return (
        <>
            <div style={{ marginLeft: '50px' }}>
                <h1 style={{ color: 'white', fontFamily: 'NetflixSans' }}>Your Account</h1>
                <br></br>
                <div>
                    <h3 style={{ color: 'white', fontFamily: 'NetflixSans' }}>Email Id: <span style={{ color: '#a1a1a1', fontFamily: 'NetflixSansLite', fontSize: '16px' }}> {email}</span></h3>
                </div>
                <div>
                    <h3 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Plan: <span style={{ color: '#a1a1a1', fontFamily: 'NetflixSansLite', fontSize: '16px' }}> {plan}</span></h3>
                </div>
                <div>
                    <h3 style={{ color: 'white', fontFamily: 'NetflixSansLite' }}>Amount: <span style={{ color: '#a1a1a1', fontFamily: 'NetflixSansLite', fontSize: '16px' }}> ₹{amount}</span></h3>
                </div>
            </div>
        </>
    )
}

export default HomeAccount;