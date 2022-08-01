import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './ProfileEdit.css';

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
    let checker = true;
    if (userInfos.name !== undefined) {
      checker = (
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
        buttonState: checker,
      });
    }
    this.setState({ loading: false });
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
      <section className="profile-edit-container">
        <h2>
          Editar Perfil
        </h2>
        <form>
          <fieldset>
            <legend>Nome</legend>
            <input
              name="name"
              id={ name }
              type="text"
              value={ name }
              onChange={ (e) => this.inputChange(e) }
              data-testid="edit-input-name"
            />
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              name="email"
              id={ email }
              type="email"
              value={ email }
              onChange={ (e) => this.inputChange(e) }
              data-testid="edit-input-email"
            />
          </fieldset>
          <fieldset>
            <legend>Descrição</legend>
            <textarea
              name="description"
              id={ description }
              type="text"
              value={ description }
              onChange={ (e) => this.inputChange(e) }
              columns="30"
              rows="10"
            />
          </fieldset>
          <fieldset>
            <legend>Imagem</legend>
            <input
              name="image"
              id={ image }
              type="text"
              value={ image }
              onChange={ (e) => this.inputChange(e) }
              data-testid="edit-input-image"
            />
          </fieldset>
          <button
            type="button"
            disabled={ buttonState }
            data-testid="edit-button-save"
            onClick={ () => this.salvingUserInfos() }
            style={ { backgroundColor: (buttonState
              ? 'var(--primary-color-variant)' : 'var(--primary-color)') } }
          >
            Salvar
          </button>
        </form>
        {redirecting && <Redirect to="/profile" />}
      </section>)
    );
  }
}

export default ProfileEdit;
