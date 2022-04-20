import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { name, player } = this.props;
    return (
      <div>
        <h4>
          { name }
        </h4>
        <audio data-testid="audio-component" src={ player } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
};
