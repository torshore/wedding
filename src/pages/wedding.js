/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import DetailPageLayout from '../components/DetailPageLayout';

import '../styles/wedding.scss';

export default () => (
    <DetailPageLayout>
        <div className="wedding">
            <div className="_title">
                <div className="_image" />

                <span>THE DETAILS</span>
            </div>

            <div className="_details">
                <div className="_column">
                    <span className="_cursive">when</span>
                    <span className="_outline">Oct 22, 2021</span>
                    <span className="_outline">3:00 PM</span>
                    <span>COCKTAIL HOUR, DINNER & DANCING TO FOLLOW</span>
                </div>
                <div className="_column">
                    <span className="_cursive">where</span>
                    <span className="_outline">1260</span>
                    <span className="_outline">GAINSBOROUGH RD</span>
                    <span>LONDON ON</span>
                </div>
            </div>

            <div className="_info">
                <span className="_title">stuff to know</span>
                <ul>
                    <li>If you need to change your RSVP due to the pandemic, simply rsvp again with updated information.</li>
                    <li>If you are staying at Ivey Spencer, a shuttle will take you to and from the venue.  You will find the pick-up times here closer to the wedding date!</li>
                    <li>Bellamere asks that our guests sing a song instead of clinking glasses.  Get your cheesy, karaoke classics ready!</li>
                </ul>
            </div>
        </div>
    </DetailPageLayout>
)
