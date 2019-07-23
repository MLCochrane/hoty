import React, { Component } from 'react';

import bg from '../../../EVENT-BG.jpg';

import LandingIntro from './LandingIntro';
import LandingForms from './LandingForms';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      formType: 'login',
    };

    this.handleButtonCallback = this.handleButtonCallback.bind(this);
  }

  handleButtonCallback(type) {
    this.setState({
      formOpen: true,
      formType: type,
    });
  }

  render() {
    const { formOpen, formType } = this.state;
    return (
      <div
        className="landing"
        data-cy="landing"
        style={{
          backgroundImage: `url(${bg})`,
          height: '100vh',
          width: '100%',
        }}
      >
        <div className="landing__content">
          {formOpen
            ? (
              <LandingForms
                formType={formType}
                buttonCallback={this.handleButtonCallback}
              />
            )
            : (
              <LandingIntro
                buttonCallback={this.handleButtonCallback}
              />
            )
          }
        </div>
      </div>
    );
  }
}
export default Landing;
