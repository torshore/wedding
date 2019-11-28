import React from 'react';
import { useSpring, animated, config } from 'react-spring';

import '../styles/HeroImage.scss';

const HeroImage = () => {
    const animationProps = useSpring(
        {opacity: 1, from: { opacity: 0 }, config: config.molasses  }
    );

    return <animated.div className="hero-image" style={animationProps}/>;
}

export default HeroImage;