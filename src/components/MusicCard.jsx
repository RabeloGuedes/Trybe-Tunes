import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      requestingSong: false,
      checking: false,
    };
  }

  async requestingFavoritesSongs(obj) {
    // const { loading } = this.props;
    this.setState({ requestingSong: true });
    await addSong(obj);
    this.setState({ requestingSong: false });
  }

  checking({ target: { checked } }) {
    if (checked) {
      this.setState({ checking: true });
      this.adding(checked);
    } else {
      this.setState({ checking: false });
    }
  }

  adding(target) {
    const { obj } = this.props;
    if (target) {
      this.requestingFavoritesSongs(obj);
    }
  }

  render() {
    const { name, player, id } = this.props;
    const { checking, requestingSong } = this.state;
    return (
      requestingSong ? <Loading />
        : (
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
            <label htmlFor={ id }>
              Favorita
              <input
                name={ id }
                type="checkbox"
                data-testid={ `checkbox-music-${id}` }
                onChange={ (e) => this.checking(e) }
                checked={ checking }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  obj: PropTypes.arrayOf(PropTypes.object).isRequired,
};
