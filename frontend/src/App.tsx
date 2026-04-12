import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import axios from "axios";


function App() {
  const [click, setClick] = useState<number>(0);

  const animalApi = axios.get("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(animalApi);

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center'>
          <h1 className='text-green-500 text-5xl'>{click}</h1>
          <div className='flex flex-row gap-1'>
            <Button onClick={() => setClick(click + 1)}>+</Button>
            <Button onClick={() => setClick(click - 1)}>-</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
