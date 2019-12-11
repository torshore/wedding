import React from 'react';

import HeroImage from '../components/HeroImage.jsx';
import PageLayout from '../components/PageLayout.jsx';

import '../styles/index.scss';

export default () => (
    <div className="index">
        <HeroImage />
        
        <PageLayout />
    </div>
)
