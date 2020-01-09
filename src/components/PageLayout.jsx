import React from 'react';

import HeroImage from './HeroImage';
import NavBar from './NavBar';

import '../styles/PageLayout.scss';

const PageLayout = ({children}) => {

    return <div className="page-layout">
        <HeroImage />

        <div className="_content">
            {children}
        </div>

        <NavBar />
    </div>
}

export default PageLayout;