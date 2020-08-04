import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carrousel from '../../components/Carrousel';
import vertentesRepository from '../../repositories/vertentes';
import PageDefault from '../../components/PageDefault';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    vertentesRepository.getAllWithVideos()
      .then((vertentesComVideos) => {
        setDadosIniciais(vertentesComVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(dadosIniciais[0]);
  return (
    <PageDefault>
      {dadosIniciais.length === 0 && (<div>Loading...</div>)}

      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[0].videos[0].titulo}
                url={dadosIniciais[0].videos[0].url}
                videoDescription={dadosIniciais[0].videos[0].description}
              />
              <Carrousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }

        return (
          <Carrousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}

    </PageDefault>
  );
}

export default Home;
