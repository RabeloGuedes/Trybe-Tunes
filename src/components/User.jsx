import React from 'react';
import PropTypes from 'prop-types';

export default class User extends React.Component {
  render() {
    const { name, email, description } = this.props;
    return (
      <section className="user-infos-container">
        <div>
          <h3>Nome</h3>
          <p>{ name }</p>
        </div>
        <div>
          <h3>Email</h3>
          <p>{ email }</p>
        </div>
        <div>
          <h3>Descrição</h3>
          <p>{ description }</p>
        </div>
      </section>
    );
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
