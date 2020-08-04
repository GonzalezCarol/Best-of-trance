import config from '../config';

const URL_VERTENTES = `${config.URL}/vertentes`;
function getAllWithVideos() {
  return fetch(`${URL_VERTENTES}?_embed=videos`)
    .then(async (serverResponse) => {
      if (serverResponse.ok) {
        const response = await serverResponse.json();
        return response;
      }
      throw new Error(await serverResponse.json());
    });
}

export default {
  getAllWithVideos,

};
