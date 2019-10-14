//Not found
import React from 'react';
import {NotFoundLabel, Error} from './styles';

export default function NotFound() {
  return (
    <div>
        <NotFoundLabel>Não encontramos o que você está buscando... :(</NotFoundLabel>
          <Error>Erro 404!</Error>

    </div>
  );
}
