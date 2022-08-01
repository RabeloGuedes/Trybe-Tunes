import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

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
      <setion className="login-container">
        <form>
          <fieldset>
            <legend>Nome</legend>
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.loginInputChange }
              value={ loginInput }
              onKeyPress={ (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  this.sendName();
                }
              } }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ buttonState }
              onClick={ this.sendName }
              style={ {
                backgroundColor: (buttonState
                  ? 'var(--primary-color-variant)' : 'var(--primary-color)'),
              } }
            >
              Entrar
            </button>
          </fieldset>
          {(loading) ? <Loading /> : ''}
          {(isRequestDone) ? <Redirect to="/search" /> : '' }
        </form>
      </setion>
    );
  }
}

export default Login;
