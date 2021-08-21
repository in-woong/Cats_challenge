import {useParams} from 'react-router-dom';
import { CatApi } from '../utils/api';

const Detail = async () => {
  const {id} = useParams();
  const myStorage = window.localStorage;
  const breed = localStorage.getItem('breeds');
  const {data:{0:{breeds:{0: cat}}}} = await CatApi.catDetail("beng")
  console.log(cat)
  return <h1>Detail</h1>;
};
export default Detail;
