import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CatApi} from '../utils/api';
import LoadingIndicator from '../hooks/LoadingIndicator';

const Detail = () => {
  const [cat, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    try {
      async function fetchData() {
        const {
          data: {
            0: {
              breeds: {0: cat},
            },
          },
        } = await CatApi.catDetail(`${id}`);
        setCats(cat);
      }
      setIsLoading(true);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(true);
    }
  }, []);
  console.log(cat);
  return (
    <div>
      {!isLoading ? (
        <LoadingIndicator isLoading={isLoading} />
      ) : (
        <div>{cat}</div>
      )}
    </div>
  );
};
export default Detail;
