import {useParams} from 'react-router-dom';

const Detail = () => {
  const {id} = useParams();
  const myStorage = window.localStorage;
    const breed = localStorage.getItem('breeds')
  console.log(breed[7]);
  return (
    <main>
      <h1> Detail Page</h1>
    </main>
  );
};
export default Detail;
