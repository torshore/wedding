import React from 'react';
import { useSpring, animated, config } from 'react-spring';

import HeroImage from './HeroImage';
import NavBar from './NavBar';

import '../styles/PageLayout.scss';

const PageLayout = ({children}) => {
    const animationProps = useSpring(
        { opacity: 1, from: { opacity: 0 }, config: config.molasses }
    );

    return <animated.div className="page-layout" style={animationProps}>
        <HeroImage />

        <div className="_content">
            {children}
        </div>

        <NavBar />
    </animated.div>
}

export default PageLayout;