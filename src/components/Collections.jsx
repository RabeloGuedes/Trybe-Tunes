import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './Collections.css';

export default class Collections extends React.Component {
  render() {
    const { requestResult, previousArtist } = this.props;
    return (
      requestResult.length === 0 ? (
        <h2
          className="no-albuns-title"
        >
          Nenhum álbum foi encontrado
        </h2>)
        : (
          <section>
            <h4 className="albuns-search-result">
              <span>Resultado de álbuns de</span>
              <span>
                { previousArtist }
              </span>
            </h4>
            <section className="albuns-container">
              {requestResult.map(({ collectionId, artworkUrl100, collectionName }) => (
                <Card
                  key={ collectionId }
                  id={ collectionId }
                  img={ artworkUrl100 }
                  albumName={ collectionName }
                />
              ))}
            </section>
          </section>
        ));
  }
}

Collections.propTypes = {
  requestResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  previousArtist: PropTypes.string.isRequired,
};
