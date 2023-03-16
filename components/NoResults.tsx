import React from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8x1'>
        {text === 'No comments yet' 
          ? <MdOutlinePhotoCamera/>
          : <BiCommentX/>
        }

      </p>
      <p className='text-2x1 text-center'>{text}</p> 
    </div>
  )
}

export default NoResults