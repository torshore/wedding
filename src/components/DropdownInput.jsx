import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

import '../styles/DropdownInput.scss';

const DropdownInput = (props) => {
    const options = props.options;
    const [ selectedValue, setSelectedValue ] = useState('');

    return <label
        className="dropdown-input"
        data-small={props.small}
    >
        <span className="_selected-value">
            {selectedValue === ''
                ? props.placeholder
                : options[selectedValue].name
            }

            <FaCaretDown className="_icon" />
        </span>

            <select
                value=""
                onChange={(event) => {
                    setSelectedValue(event.target.value);

                    props.onChange(event);
                }}
                name={props.name}
            >
                {options.map((option, optionIndex) =>
                    <option
                        key={optionIndex}
                        value={optionIndex}
                    >
                        { option.name }
                    </option>
                )}
            </select>
    </label>;
}


export default DropdownInput;