import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      buttonState: true,
      redirecting: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfos = await getUser();
    const { name, email, description, image } = userInfos;
    const checker = (
      name.length === 0
      || email.length === 0
      || description.length === 0
      || image.length === 0
    );
    this.setState({
      name: userInfos.name,
      email: userInfos.email,
      description: userInfos.description,
      image: userInfos.image,
      loading: false,
      buttonState: checker,
    });
  }

  inputChange({ target }) {
    const { name } = target;
    this.setState(
      () => ({ [name]: target.value }),
      () => this.checkingInputs(),
    );
  }

  checkingInputs() {
    const { name, email, description, image } = this.state;
    const checker = (
      name.length === 0
      || email.length === 0
      || !email.includes('@')
      || description.length === 0
      || image.length === 0
    );
    this.setState({
      buttonState: checker,
    });
  }

  async salvingUserInfos() {
    const { name, email, description, image } = this.state;
    const obj = { name, email, description, image };
    this.setState({ loading: true });
    await updateUser(obj);
    this.setState({
      loading: false,
      redirecting: true,
    });
  }

  render() {
    const {
      loading,
      name,
      email,
      description,
      image,
      buttonState,
      redirecting,
    } = this.state;
    return (loading ? (<Loading />) : (
      <div data-testid="page-profile-edit">
        <h2>
          Editar Perfil
        </h2>
        <form>
          <div>
            <label htmlFor={ name }>
              Nome:
              <input
                name="name"
                id={ name }
                type="text"
                value={ name }
                onChange={ (e) => this.inputChange(e) }
                data-testid="edit-input-name"
              />
            </label>
          </div>
          <div>
            <label htmlFor={ email }>
              Email:
              <input
                name="email"
                id={ email }
                type="email"
                value={ email }
                onChange={ (e) => this.inputChange(e) }
                data-testid="edit-input-email"
              />
            </label>
          </div>
          <div>
            <label htmlFor={ description }>
              Descrição:
              <textarea
                name="description"
                id={ description }
                type="text"
                value={ description }
                onChange={ (e) => this.inputChange(e) }
                data-testid="edit-input-description"
              />
            </label>
          </div>
          <div>
            <label htmlFor={ image }>
              Imagem:
              <input
                name="image"
                id={ image }
                type="text"
                value={ image }
                onChange={ (e) => this.inputChange(e) }
                data-testid="edit-input-image"
              />
            </label>
          </div>
          <button
            type="button"
            disabled={ buttonState }
            data-testid="edit-button-save"
            onClick={ () => this.salvingUserInfos() }
          >
            Salvar
          </button>
        </form>
        {redirecting && <Redirect to="/profile" />}
      </div>)
    );
  }
}

export default ProfileEdit;
