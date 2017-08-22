import axios from 'axios';

const getCardData = (req, res) => {
  axios.get('https://s3-us-west-1.amazonaws.com/final-fantasy-tcg/fftcg_data')
    .then(result => res.send(result.data))
    .catch(error => res.send(error));
};

export {
  getCardData,
};
