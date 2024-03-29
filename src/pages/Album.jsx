import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      albumName: '',
      artistName: '',
      requestedSong: '',
      loading: false,
    };
    this.requestingSongs = this.requestingSongs.bind(this);
  }

  async componentDidMount() {
    await this.requestingSongs();
    this.filteredRequest();
  }

  async requestingSongs() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const response = await getMusics(id);
    this.setState({ requestedSong: response });
  }

  filteredRequest() {
    const { requestedSong } = this.state;
    const infos = requestedSong.filter(({ wrapperType }) => wrapperType !== 'track');
    this.setState({
      songs: requestedSong.filter(({ kind }) => kind === 'song'),
      albumName: infos[0].collectionName,
      artistName: infos[0].artistName,
      loading: true,
    });
  }

  render() {
    const {
      albumName,
      artistName,
      songs,
      loading,
    } = this.state;
    return (
      <section className="musics-container">
        {(loading)
          ? (
            <div>
              <h2 className="artist-name">{ artistName }</h2>
              <h4 className="album-name">{ albumName }</h4>
              <div className="songs-container">
                {songs.map((obj) => (
                  <MusicCard
                    key={ obj.trackId }
                    name={ obj.trackName }
                    player={ obj.previewUrl }
                    id={ obj.trackId }
                    obj={ obj }
                  />
                ))}
              </div>
            </div>
          ) : ''}
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,

};

export default Album;
