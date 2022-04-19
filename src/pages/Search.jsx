import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      currentArtistName: '',
      buttonState: true,
    };
    this.searchArtistName = this.searchArtistName.bind(this);
  }

  searchArtistName({ target }) {
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

  render() {
    const { currentArtistName, buttonState } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <input
            type="text"
            placeholder="Banda ou Artista"
            data-testid="search-artist-input"
            value={ currentArtistName }
            onChange={ this.searchArtistName }
          />
          <button
            type="button"
            disabled={ buttonState }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
