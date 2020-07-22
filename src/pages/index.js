import React from 'react';
import { useSpring, animated } from 'react-spring';

import Titles from '../components/Titles';

import '../styles/index.scss';

export default () => {
    const animationProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 300 });

    return <div className="index">
        <Titles
            mainTitle="TORY & MACKY"
            subTitle={
                <animated.div className="_sub-title" style={animationProps}>
                    OCT <span>22</span> 2021
            </animated.div>
            }
        />
    </div>
}
