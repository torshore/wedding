import React from 'react';

import '../styles/Titles.scss';

 const Titles = (props) => {
    return <div className="titles">
        <h1 className="_main-title">
            {props.mainTitle}
        </h1>

        {props.subTitle
            ? props.subTitle
            : null
        }
    </div>
}

export default Titles;