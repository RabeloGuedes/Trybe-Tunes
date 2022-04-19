import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginInput: '',
      buttonState: true,
      isRequestDone: false,
      loading: false,
    };
    this.loginInputChange = this.loginInputChange.bind(this);
    this.loginButtonState = this.loginButtonState.bind(this);
    this.sendName = this.sendName.bind(this);
  }

  loginInputChange = ({ target }) => {
    this.setState(
      () => ({ loginInput: target.value }),
      () => this.loginButtonState(),
    );
  };

  loginButtonState = () => {
    const { loginInput } = this.state;
    const minLength = 3;
    if (loginInput.length < minLength) {
      this.setState({ buttonState: true });
    } else {
      this.setState({ buttonState: false });
    }
  };

  async sendName() {
    const { loginInput } = this.state;
    this.setState({ loading: true, isRequestDone: false });
    await createUser({ name: loginInput });
    this.setState({ loading: false, isRequestDone: true });
  }

  render() {
    const { loginInput, buttonState, isRequestDone, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.loginInputChange }
            value={ loginInput }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonState }
            onClick={ this.sendName }
          >
            Entrar
          </button>
          {(loading) ? <Loading /> : ''}
          {(isRequestDone) ? <Redirect to="/search" /> : '' }
        </form>
      </div>
    );
  }
}

export default Login;
