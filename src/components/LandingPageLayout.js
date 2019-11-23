import React from 'react';

import '../styles/LandingPageLayout.scss';

export default () => (
    <div className="landing-page-layout">
        <div className="_banner-image" />

        <div className="_content">
            <h1>TORY & MACKY</h1>

            <div className="_date">
                MAY <span>30</span> 2020
            </div>
        </div>

        <div className="_footer">
            <div>THE WEDDING</div>
            <div>ACCOMODATIONS</div>
            <div>REGISTRY</div>
            <div>RSVP</div>
            <div>CONTACT US</div>
        </div>
    </div>
)