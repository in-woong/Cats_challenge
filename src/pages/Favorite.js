import { waitForElementToBeRemoved } from "@testing-library/react";
import { useEffect, useState } from "react";

const Favourite = () => {
  const [Breeds,setBreeds] = useState([])
  const [LikeCat, setLikeCat] = useState([])

  useEffect(()=>{
    const Like = localStorage.getItem('likes');
    const BreedsJSON = localStorage.getItem('breeds')
    const Breeds = JSON.parse(BreedsJSON)
    const LikeCat = JSON.parse(Like)
    setBreeds(Breeds)
    setLikeCat(LikeCat)
  },[])
  
  return (

    <div>
      {LikeCat.map((cat, index)=>(
        Breeds.map(breed=> breed.id === cat?
        <div key = {index}>
        <h2>{breed.name}</h2>
        <span>{breed.description}</span>
        </div>: null
        )
      ))}
    </div>

  );
};
export default Favourite;