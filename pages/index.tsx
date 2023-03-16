import axios from 'axios';
import type { NextPage } from 'next';
import NoResult from '@/components/NoResults';
import PhotoCard from '@/components/PostCard';
import { Post } from '../types';
import { BASE_URL } from '@/utils';

interface IProps {
  photos: Post[]
}

const Home = ({ photos }: IProps) => {
  
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {photos.length ? photos?.map((photo: Post) => (
          <PhotoCard post={photo} key={photo._id} />
        ))
       : 
        <NoResult text={'No posts'}/> 
      }
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string }
}) => {
  let response = null;
  
  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);  
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);  
  }

  return {
    props: {
      photos: response.data
    }
  }
}

export default Home