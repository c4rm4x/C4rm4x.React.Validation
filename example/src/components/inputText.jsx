import React from 'react';
import {Component} from 'c4rm4x-react-validation';

class InputText extends Component {
  constructor(props) {
    super(props);

    this.blur = this.blur.bind(this);
  }

  blur = (e) =>{
    const { onBlur } = this.props;

    e.preventDefault();

    this.validate();

    if (onBlur) onBlur(e);
  };

  render() {    
    const { validators, onBlur, ...rest } = this.props;
    const { errors = [] } = this.state;
    const errorText = errors.map((_, i) => <li key={i}>{_}</li>);

    return (
      <div>
        <input {...rest} onBlur={this.blur} />
        <div style={{ color: 'red' }}>
          <ul>{errorText}</ul>
        </div>
      </div>
    );
  }
}

export default InputText;