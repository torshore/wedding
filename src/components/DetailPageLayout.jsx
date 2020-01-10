import React from 'react';
import { Transition, config } from 'react-spring/renderprops'

import '../styles/DetailPageLayout.scss';

const DetailPageLayout = ({children}) => {
    return <Transition
        items={<div className="_content">
            {children}
        </div>}
        config={config.slow}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
    >
        {item => styles => <div className="detail-page-layout" style={{ ...styles }}>
            {item}
        </div>
        }
    </Transition>
}

export default DetailPageLayout;