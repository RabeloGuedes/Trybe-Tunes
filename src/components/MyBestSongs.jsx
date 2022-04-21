import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

export default class MyBestSongs extends React.Component {
  render() {
    const { updateFunc, songs } = this.props;
    return (
      <section>
        {songs.map((obj) => (<MusicCard
          key={ obj.trackId }
          name={ obj.trackName }
          player={ obj.previewUrl }
          id={ obj.trackId }
          obj={ obj }
          favoriteListUpdate={ updateFunc }
        />))}
      </section>
    );
  }
}

MyBestSongs.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateFunc: PropTypes.func.isRequired,
};
