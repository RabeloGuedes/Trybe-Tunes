import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Collections from '../components/Collections';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      currentArtistName: '',
      buttonState: true,
      loading: false,
      requestResult: [],
      previousArtist: '',
    };
    this.ArtistName = this.ArtistName.bind(this);
    this.searchArtitsName = this.searchArtitsName.bind(this);
  }

  ArtistName({ target }) {
    this.setState(
      () => ({ currentArtistName: target.value }),
      () => this.changeButtonState(),
    );
  }

  changeButtonState() {
    const { currentArtistName } = this.state;
    if (currentArtistName.length < 2) {
      this.setState({ buttonState: true });
    } else {
      this.setState({ buttonState: false });
    }
  }

  async searchArtitsName() {
    const { currentArtistName } = this.state;
    this.setState(({
      previousArtist: currentArtistName,
      loading: true,
    }), async () => {
      this.setState({
        currentArtistName: '',
      });
      const collections = await searchAlbumsAPI(currentArtistName);
      this.setState({
        requestResult: collections,
        loading: false,
      });
    });
  }

  render() {
    const {
      currentArtistName,
      buttonState,
      loading,
      requestResult,
      previousArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <fieldset>
            <legend>Banda ou Artista</legend>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ currentArtistName }
              onChange={ this.ArtistName }
              onKeyPress={ (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  this.searchArtitsName();
                }
              } }
            />
            <button
              type="button"
              disabled={ buttonState }
              data-testid="search-artist-button"
              onClick={ this.searchArtitsName }
            >
              Pesquisar
            </button>
          </fieldset>
          { loading ? <Loading />
            : (
              <Collections
                requestResult={ requestResult }
                previousArtist={ previousArtist }
              />)}
        </form>
      </div>
    );
  }
}

export default Search;
