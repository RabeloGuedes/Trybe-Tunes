import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MyBestSongs from '../components/MyBestSongs';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loading: false,
      anyFavoriteSong: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      anyFavoriteSong: false,
    });
    const songs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: songs,
      loading: false,
      anyFavoriteSong: true,
    });
  }

  async newFavoriteSongsList() {
    const newSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs: newSongs });
  }

  // async requestingFavoriteSongs() {
  //   this.setState({
  //     loading: true,
  //     anyFavoriteSong: false,
  //   });
  //   const songs = await getFavoriteSongs();
  //   this.setState({
  //     favoriteSongs: songs,
  //     loading: false,
  //     anyFavoriteSong: true,
  //   });
  // }

  render() {
    const { favoriteSongs, loading, anyFavoriteSong } = this.state;
    return (
      <div data-testid="page-favorites">
        {
          loading ? (
            <Loading />
          ) : (anyFavoriteSong
            && (
              <section>
                <h2>
                  Favoritas
                </h2>
                <div>
                  <MyBestSongs
                    songs={ favoriteSongs }
                    updateFunc={ () => this.newFavoriteSongsList() }
                  />
                </div>
              </section>)
          )
        }
      </div>
    );
  }
}

export default Favorites;
