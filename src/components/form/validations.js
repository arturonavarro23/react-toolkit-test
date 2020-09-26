import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

export const resolver = yupResolver(
  yup.object().shape({
    name: yup.string().required(),
    img: yup.string().required(),
    address: yup.string().required(),
    raiting: yup.number().positive().required(),
  })
);

export default resolver;
