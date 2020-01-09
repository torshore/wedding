import React from 'react';
import { useSpring, animated } from 'react-spring';

import '../styles/Titles.scss';

 const Titles = (props) => {
    const animationProps = useSpring(
        { to: { opacity: 1 }, from: { opacity: 0 }, delay: 300 }
    );

    return <div className="titles">
        <animated.h1 className="_main-title" style={animationProps}>
            {props.mainTitle}
        </animated.h1>

        {props.subTitle
            ? props.subTitle
            : null
        }
    </div>
}

export default Titles;