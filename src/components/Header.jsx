import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const userInfos = await getUser();
    this.userInfosRequest(userInfos.name);
  }

  async userInfosRequest(name) {
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        <section>
          <nav>
            <Link to="/search" data-testid="link-to-search">Busca</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
          {(loading) ? <Loading />
            : (
              <h3 data-testid="header-user-name">
                { userName }
              </h3>)}
        </section>
      </header>
    );
  }
}
