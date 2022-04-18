import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      links: [
        { name: 'Login', url: '/' },
        { name: 'Busca', url: '/search' },
        { name: 'Album', url: '/album/:id' },
        { name: 'Favoritas', url: '/favorites' },
        { name: 'Perfil', url: '/profile' },
        { name: 'Editar Perfil', url: '/profile/edit' },
      ],
    };
  }

  render() {
    const { links } = this.state;
    return (
      <section>
        <nav>
          { links.map(({ name, url }) => (
            <Link key={ name } to={ url }>
              { name }
            </Link>
          ))}
        </nav>
      </section>
    );
  }
}

export default Header;
