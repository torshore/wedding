import React from 'react';
import { useSpring, animated } from 'react-spring';

import Titles from './Titles';

import '../styles/PageLayout.scss';

const PageLayout = () => {
    const animationProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 300 });

    return <div className="page-layout">
        <div className="_tall-section">
            <Titles
                mainTitle="TORY & MACKY"
                subTitle={
                    <animated.div className="_sub-title" style={animationProps}>
                        MAY <span>30</span> 2020
                    </animated.div>
                }
            />
        </div>

        <div className="_short-section">
            <div>THE WEDDING</div>
            <div>HOTELS</div>
            <div>REGISTRY</div>
            <div>RSVP</div>
            <div>CONTACT US</div>
        </div>
    </div>
}

export default PageLayout;