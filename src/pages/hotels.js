/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSpring, animated, config } from 'react-spring';

import DetailPageLayout from '../components/DetailPageLayout';

import '../styles/hotels.scss';

export default () => {
    const animationProps = useSpring(
        { to: { opacity: 1 }, from: { opacity: 0 }, config: config.slow }
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

                    <span>We have a block of rooms reserved for Friday May 29th and Saturday May 30th.  Click the picture above to book!</span>
                </div>

                <div className="_column">
                    <span className="_cursive">delta armouries</span>
                    <animated.a
                        className="_link -delta"
                        href="https://www.marriott.com/hotels/travel/yxudl-delta-hotels-london-armouries/"
                        style={animationProps}
                    />

                    <span>Use our code 'w14' to get 20% off if you'd like to stay at the Delta!</span>
                </div>
            </div>
        </div>
    </DetailPageLayout>
}