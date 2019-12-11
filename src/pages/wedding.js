/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import HeroImage from '../components/HeroImage.jsx';
import DetailPageLayout from '../components/DetailPageLayout.jsx';

import '../styles/wedding.scss';

export default () => (
    <div className="wedding">
        <HeroImage />

        <DetailPageLayout>
            <div className="wedding__content">
                <div className="_main-title">
                    <h1>
                        We're Getting Married!
                    </h1>
                </div>

                <div className="_details">
                    <div>The wedding will be held May 30, 2020.  We will start with a ceremony outside the gazebo at Bellamere followed by cocktail hour and reception!</div>

                    <div className="_column">
                        <h2>CEREMONY & RECEPTION</h2>
                        <span>3:00PM to 1:00AM</span>
                        <span>Bellamere Winery</span>
                        <span>1260 Gainsborough Rd</span>
                        <span>London, ON</span>
                        <span>N6H 5K8</span>
                    </div>
                </div>
            </div>
        </DetailPageLayout>
    </div>
)