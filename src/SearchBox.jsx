import { useState } from 'react'
import { Button, Input, Flex, Box, } from '@chakra-ui/react'
import axios from "axios";

const SearchBox = () => {

    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState('');

    const buscarResultados = async () => {
      try {
          const API_KEY = 'XicuzJd8tSFkwwQpC_qYtenI2cKzemt8mMWSe-jQjBA';
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&page=${pages}&client_id=${API_KEY}`
        );
        setImages([...images, ...response.data.results]);
        console.log(images)
      } catch (error) {
        console.log(error);
      }
    };

    const handleReset = () => {
      setQuery("");
      setImages([]);
      setPages(1);
    };

  return(

    <>
    
    <Flex className='search__box' m='auto' p='10px' marginTop='1rem' backgroundColor='black'>
   
      <Input
        className='search__box--input'
        placeholder='Buscar imagenes'
        onChange={e => setQuery(e.target.value)}
        w='80%'
        p='10px'
        outline='none' />

      <Button
        cursor='pointer'
        className='search__box--btn'
        bg='orange'
        p='10px'
        w='20%'
        color='white'
        onClick={() => buscarResultados()}
      >
        Buscar
      </Button>
      <Button
      onClick={handleReset}
      >
        Limpiar
      </Button>
      
    </Flex>
    
    <Box className='main__content' mt='20'>
    <Box className='main__content--grid'>
        {
        images.map((elemento, indice) => {
          return (
              <img key={indice} src={elemento.urls.regular} />
          )
          
        })
      }
      </Box>
      </Box>
      </>
  )
}

export default SearchBox;