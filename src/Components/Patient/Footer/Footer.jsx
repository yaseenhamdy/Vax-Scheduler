import React from 'react'
import amazonImg from '../../../Images/amazon1.88ec6c49877ff812455f.png'
import americanExpress from '../../../Images/americanExpress.8e8c8c471f03caa7d1a3.png'
import masterCard from '../../../Images/masterCard.9a944b84eb1d7a7a8ca1.png'
import paypal from '../../../Images/paypal.094f70a042c1bba937c4.png'
import appStore from '../../../Images/appStore.png'
import googlePlay from  '../../../Images/google-play.282dcbeaa4af842e660f.png'
export default function Footer() {
    return (
        <>
            <footer className="footer bg-main-light w-100 mt-5 ">
                <div className="container px-5 pt-5">
                    <h3>Get the Vaccine app</h3>
                    <p>We will send you a link, open it in your phone to download the app.</p>
                    <div className="row">
                        <div className="col-md-9 my-3">
                            <div className="footer-input">
                                <input type="email" className='form-control' placeholder='Email ...' />
                            </div>
                        </div>
                        <div className="col-md-3 my-3 ">
                            <div className="footer-button mb-4 w-100">
                                <button className='btn bg-nav text-white w-100'>Share App Link</button>
                            </div>
                        </div>
                        <div className='border-bottom mt-3'></div>
                    </div>
                    <div className="row d-flex align-items-center m-auto">
                        <div className="col-md-2">
                            <div className="payment-method  my-2">
                                <span >Payment Partners</span>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="payment-method my-2">
                                <img src={amazonImg} className='ps-1' alt="amazon payment" width={80} />
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="payment-method my-2">
                                <img src={americanExpress} className='' alt="american Express payment" width={80} />
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="payment-method my-2">
                                <img src={masterCard} className='' alt="master Card payment" width={60} />
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="payment-method my-2">
                                <img src={paypal} className='' alt="paypal payment" width={60} />
                            </div>
                        </div>
                        <div className="col-md-3 second-side">
                            <div className="payment-method ms-5 my-2">
                                <span>Get deliveries with FreshCart</span>
                            </div>
                        </div>
                        <div className="col-md-1 col-app-store">
                            <div className="payment-method my-2">
                                <img src={appStore} className='app-store' alt="app Store Logo" width={100} />
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="payment-method my-2 ">
                                <img src={googlePlay} className='ms-4 google-play' alt="google Play logo" width={110} />
                            </div>
                        </div>
                    </div>
                    <div className='border-top mt-4 pb-4'>
                        <h6 className='text-center mt-5 '>Copyright 2023 © Dev/ by Yaseen Hamdy. All rights reserved</h6>
                    </div>
                </div>
            </footer>

        </>
    )
}
