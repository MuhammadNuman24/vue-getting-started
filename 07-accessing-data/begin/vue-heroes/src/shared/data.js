import * as axios from 'axios';
import { format } from 'date-fns';
import { inputDateFormat } from './constants';

const getHeros = async function() {
  const responce = await axios.get('api/heroes.json');
  const heroes = responce.data.map(h => {
    h.originDate = format(h.origin, inputDateFormat);
    return h;
  });
  return heroes;
};

export const data = {
  getHeros,
};
