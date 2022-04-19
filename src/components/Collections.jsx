import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

export default class Collections extends React.Component {
  render() {
    const { requestResult, previousArtist } = this.props;
    return (
      requestResult.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
        : (
          <section>
            <h4>
              Resultado de álbuns de:
              {' '}
              { previousArtist }
            </h4>
            {requestResult.map(({ collectionId, artworkUrl100, collectionName }) => (
              <Card
                key={ collectionId }
                id={ collectionId }
                img={ artworkUrl100 }
                albumName={ collectionName }
              />
            ))}
          </section>
        ));
  }
}

Collections.propTypes = {
  requestResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  previousArtist: PropTypes.string.isRequired,
};
