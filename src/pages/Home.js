import './Home.scss';
import {Link} from 'react-router-dom';

import {useCallback, useMemo, useState} from 'react';
import {catApiUrl, catHeaders} from '../utils/api';

import LoadingIndicator from '../hooks/LoadingIndicator';
import HeaderButtonGroup from '../hooks/handleButtonGroup';
import {useFetch} from '../hooks/useFetch';
import {useLocalStorage} from '../hooks/useLocalStorage';

const Cats = () => {
  const [storedBreeds, storeBreeds] = useLocalStorage('breeds', []);
  const [storedPages, storePages] = useLocalStorage('fetchedPgaes', []);
  const [like, setLike] = useLocalStorage('likes', []);
  const [currentPage, setCurrentPage] = useState(
    storedPages.length !== 0 ? storedPages[storedPages.length - 1] : 1
  );

  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 10,
    }),
    [currentPage]
  );

  const {
    data: breeds,
    isLoading,
    hasError,
    error,
  } = useFetch(
    catApiUrl,
    params,
    catHeaders,
    storedBreeds,
    (newData) => {
      storeBreeds(storedBreeds.concat(newData));
    },
    () => {
      const hasFetched = storedPages.includes(currentPage);
      if (!hasFetched) {
        storePages(storedPages.concat(currentPage));
      }
      return !hasFetched;
    }
  );

  const handlePreviousPage = useCallback(() => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage((previousPage) => previousPage - 1);
    storePages(storedPages.concat(currentPage));
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((previousPage) => previousPage + 1);
    // storePages(storedPages.concat(currentPage))
  }, [currentPage]);

  //   useEffect(() => {
  //     const fetchBreeds = async () => {
  //       setIsLoading(true);
  //       const breeds = await getCatBreeds(currentPage, 10);

  //       if (breeds.length === 0) {
  //         setIsLoading(false);
  //         return;
  //       }

  //       setBreeds((prevBreeds) => prevBreeds.concat(breeds));
  //       setIsLoading(false);
  //     };

  //     fetchBreeds();
  //   }, [currentPage]);
  return (
    <div className="Cats">
      {!isLoading ? (
        <>
          <p>현재 페이지 : {currentPage}</p>
          <HeaderButtonGroup
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />

          <div className="container">
            {breeds.map((breed, index) => (
              <div
                className="Cat"
                key={`${breed.id}-${index}`}
                style={{
                  backgroundImage: `url(${
                    breed.image ? breed.image.url : null
                  })`,
                }}
              >
                <Link className="name" to={`/cat/${breed.id}`}>
                  {breed.name}
                </Link>
                <button
                  onClick={() =>
                    like&&!like.includes(breed.id)&&setLike(like.concat(`${breed.id}`))
                  }
                >
                  Like
                </button>
              </div>
            ))}
          </div>
          <HeaderButtonGroup
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      ) : (
        <LoadingIndicator isLoading={isLoading} />
      )}
    </div>
  );
};

export default Cats;
