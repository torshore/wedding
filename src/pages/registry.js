/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSpring, animated, config } from 'react-spring';

import DetailPageLayout from '../components/DetailPageLayout';

import '../styles/registry.scss';

export default () => {
    const animationProps = useSpring(
        { to: { opacity: 1 }, from: { opacity: 0 }, config: config.slow }
    );

    return <DetailPageLayout>
        <div className="registry">
            <div className="_title">
                <div className="_image" />

                <span>REGISTRY</span>
            </div>

            <div className="_columns">
                <div className="_column">
                    <animated.a
                        className="_link"
                        href="https://registry.thebay.com/registry/view-registry/tory_and_macky"
                        style={animationProps}
                    />
                </div>

                <div className="_column">
                    <animated.a
                        className="_link -amazon"
                        href="https://www.amazon.ca/wedding/tory-shoreman-macky-beltran-london-on-may-2020/registry/ZHIO94GSILFT"
                        style={animationProps}
                    />
                </div>
            </div>
        </div>
    </DetailPageLayout>
}