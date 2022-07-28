import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import User from '../components/User';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userData: {},
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      loading: false,
      userData: userInfo,
    });
    console.log(userInfo);
  }

  render() {
    const { loading, userData } = this.state;
    const { description, name, email, image } = userData;
    return (loading ? (<Loading />) : (
      <fieldset data-testid="page-profile">
        <legend>Perfil</legend>
        <img src={ image } alt={ `Foto de ${name}` } data-testid="profile-image" />
        <Link to="/profile/edit"> Editar perfil</Link>
        <User name={ name } email={ email } description={ description } />
      </fieldset>)
    );
  }
}

export default Profile;
