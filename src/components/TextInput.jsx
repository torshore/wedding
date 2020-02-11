import React, { PureComponent } from 'react';

import '../styles/TextInput.scss';

class TextInput extends PureComponent {
    render() {
        return <label
            className="search-text-input"
        >
            {this.props.type === 'textarea'
                ? <textarea
                    rows="5"
                    name="textInput"
                    placeholder={this.props.placeholder}
                    onChange={(event) => this.props.onChange(event)}
                />
                : <input
                    type={this.props.type || 'text'}
                    name="textInput"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    autoComplete="off"
                    onChange={(event) => this.props.onChange(event)}
                />
            }

        </label>;
    }
}

export default TextInput;