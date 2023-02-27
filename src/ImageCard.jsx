import React from 'react';
import { Flex, Img } from '@chakra-ui/react'
import { useState } from 'react'

const ImageCard = ({ image }) => {
  const { urls, alt_description } = image;
  const [showPreview, setShowPreview] = useState(false);

  const handleClick = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div>
      
      <Flex
      flexDir='column'
      className='Images-R'
      onClick={handleClick}
      cursor='pointer'
      justifyContent='center'
      alignItems='center'
      >
        
        <Img
        borderRadius='10'
        onClick={handleClick}
        cursor='pointer'
        src={urls.regular}
        alt={alt_description}
        />
          {image.description && <p className='Paragraph_Card'>Description: {image.description}</p>}
          {/* {image.exif.make && <p className='Paragraph_Card'>hol: {image.exif.make}</p>} */}
          {image.exif?.model&& <p className='Paragraph_Card'>Description: {image.exif?.model}</p>}
        
      </Flex>
    
      
        {showPreview && (
          <Flex
          gap='10'
          w='60vw'
          h='40vw'
          rounded='md'
          className='Preview'
          justifyContent='center'
          alignItems='center'
          >

          <Flex flexDir='column-reverse' m='20' gap='5' p='20' borderRadius='10'>
          
            <img className='Photo' src={urls.regular} alt={alt_description} />
            <a className='Download_Btn' href={image.links?.download} target='_blank'>Download</a>
            <button className='Close_Btn' onClick={handleClick}>Close</button>
          
          </Flex>

          <Flex
          bg='white'
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          >
          {image.user.location && <p className='Paragraph_Card'>Lugar: {image.user.location}</p>}
          {image.description && <p className='Paragraph_Card'>Description: {image.description}</p>}
          </Flex>

        </Flex>
      )}
    </div>
  );
}

export default ImageCard;