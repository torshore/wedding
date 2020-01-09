/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSpring, animated } from 'react-spring';

import DetailPageLayout from '../components/DetailPageLayout';

import '../styles/hotels.scss';

export default () => {
    const animationProps = useSpring(
        { to: { opacity: 1 }, from: { opacity: 0 } }
    );

    return <DetailPageLayout>
        <div className="hotels">
            <div className="_title">
                <div className="_image" />

                <span>HOTELS</span>
            </div>

            <div className="_columns">
                <div className="_column">
                    <span className="_cursive">ivey spencer</span>

                    <animated.a
                        className="_link"
                        href="https://book.passkey.com/go/ShoremanBeltranWedding"
                        style={animationProps}
                    />

                    <span>WE HAVE A BLOCK OF ROOMS RESERVED FOR FRIDAY MAY 29TH AND SATURDAY MAY 30TH.  CLICK THE PICTURE ABOVE TO BOOK!</span>
                </div>

                <div className="_column">
                    <span className="_cursive">delta armouries</span>
                    <animated.a
                        className="_link -delta"
                        href="https://www.marriott.com/hotels/travel/yxudl-delta-hotels-london-armouries/"
                        style={animationProps}
                    />
                    <span>USE OUR CODE 'w14' TO GET 20% IF YOU'D LIKE TO BOOK AT THE DELTA!</span>
                    
                </div>
            </div>
        </div>
    </DetailPageLayout>
}