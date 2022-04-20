import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  render() {
    const { id, img, albumName } = this.props;
    return (
      <section>
        <div>
          <img src={ img } alt={ albumName } />
          <h5>{ albumName }</h5>
        </div>
        <Link
          to={ `/album/${id}` }
          data-testid={ `link-to-album-${id}` }
        >
          Album
        </Link>
      </section>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
};
