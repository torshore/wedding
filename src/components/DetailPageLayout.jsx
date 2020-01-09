import React from 'react';

import '../styles/DetailPageLayout.scss';

const DetailPageLayout = ({children}) => {
    return <div className="detail-page-layout">
        <div className="_content">
            {children}
        </div>
    </div>;
}

export default DetailPageLayout;