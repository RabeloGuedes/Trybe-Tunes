import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checking: false,
    };
  }

  async componentDidMount() {
    await this.requestingFavoriteSongs();
  }

  async addingToFavoriteSongs(obj) {
    this.setState({ loading: true });
    await addSong(obj);
    this.setState({ loading: false });
  }

  async removingFromFavoriteSongs(obj) {
    this.setState({ loading: true });
    await removeSong(obj);
    this.setState({ loading: false });
  }

  async requestingFavoriteSongs() {
    const { id } = this.props;
    const songs = await getFavoriteSongs();
    const checkingForFavorite = songs.some(({ trackId }) => trackId === id);
    this.setState({ checking: checkingForFavorite });
  }

  checking({ target: { checked } }) {
    const { favoriteListUpdate } = this.props;
    if (checked) {
      this.setState({ checking: true });
      this.adding(checked);
      this.requestingFavoriteSongs();
    } else {
      this.setState({ checking: false });
      this.removing(checked);
    }
    favoriteListUpdate();
  }

  adding(checked) {
    const { obj } = this.props;
    if (checked) {
      this.addingToFavoriteSongs(obj);
    }
  }

  removing(checked) {
    const { obj } = this.props;
    if (!checked) {
      this.removingFromFavoriteSongs(obj);
    }
  }

  render() {
    const { name, player, id } = this.props;
    const { checking, loading } = this.state;
    return (
      loading ? <Loading />
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
                id={ id }
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
  id: PropTypes.number.isRequired,
  obj: PropTypes.shape({}).isRequired,
  favoriteListUpdate: PropTypes.func,
};

MusicCard.defaultProps = {
  favoriteListUpdate: () => console.log(),
};
