import React from 'react';

import '../styles/Spinner.scss';

function Spinner(props) {
    return <div className="spinner">
        <div className="_padding">
            <div
                className="_circle"
                data-is-small={props.isSmall}
                data-is-tiny={props.isTiny}
                data-is-blue={props.isBlue}
            ></div>
        </div>
    </div>;
}

export default Spinner;