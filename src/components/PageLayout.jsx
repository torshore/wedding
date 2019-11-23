import React from 'react';

import Titles from './Titles';

import '../styles/PageLayout.scss';

export default () => (
    <div className="page-layout">
        <div className="_tall-section">
            <Titles
                mainTitle="TORY & MACKY"
                subTitle={
                    <div className="_sub-title">MAY <span>30</span> 2020</div>
                }
            />
        </div>

        <div className="_short-section">
            <div>THE WEDDING</div>
            <div>ACCOMODATIONS</div>
            <div>REGISTRY</div>
            <div>RSVP</div>
            <div>CONTACT US</div>
        </div>
    </div>
)