import { Flex, Input, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { ImageList } from "./ImageList";
import { debounce } from "lodash";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query) return;
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=XicuzJd8tSFkwwQpC_qYtenI2cKzemt8mMWSe-jQjBA&query=${query}&per_page=20&page=${page}`
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setHasMore(response.data.results.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setImages([]);
    setPage(1);
    setHasMore(true);
  };

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight
    ) {
      handleSubmit({ preventDefault: () => {} });
    }
  }, 500);

  const handleResetPage = () => {
    setPage(1);
  };

  return (
    <>
    <div>
      <form onSubmit={(event) => {
        handleResetPage();
        handleSubmit(event);
      }}>
        
        <Flex className='Header'
        justifyContent='center'
        alignItems='center'
        position='sticky'
        w='100vw'
        gap='10'
        >
          <Text fontSize='1rem' fontFamily='arial'>Search</Text>
          
          <Input
          className='input_search'
          p='10'
          placeholder='search for a picture'
          type='text'
          value={query}
          onChange={handleSearch}
          />
      
        <button className='btn_search' type='submit'>Search</button>
        <button className='btn_clear' type='reset' onClick={handleClear}>Clear</button>
        
        </Flex>
      </form>
      
      <InfiniteScroll
        dataLength={images.length}
        next={handleScroll}
        hasMore={hasMore}
      >
          <ImageList images={images} />
      </InfiniteScroll>
    </div>
    </>
  );
};

export default Search;