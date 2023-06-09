import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import PostCard from "@/components/PostCard";
import NoResults from '@/components/NoResults';
import { IUser, Post } from "@/types";
import { BASE_URL } from "@/utils";

interface IProps {
    data: {
        user: IUser,
        userPosts: Post[],
        userLikedPosts: Post[],
    }
}

const Profile = ({ data }: IProps) => {
    const [ showUserPosts, setShowUserPosts ] = useState(true);
    const [ postsList, setPostsList ] = useState<Post[]>([]);

    const { user, userPosts, userLikedPosts } = data;

    const posts = showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';

    console.log(postsList)

    useEffect(() => {
    const fetchPosts = async () => {
        if (showUserPosts) {
            setPostsList(userPosts);
        } else {
            setPostsList(userLikedPosts);
        }
    };

    fetchPosts();
    }, [showUserPosts, userLikedPosts, userPosts]);

    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image
                      width={34}
                      height={34}
                      className='rounded-full'
                      src={user.image}
                      alt='user-profile'
                      layout='responsive'
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase'>
                        {user.userName.replace(/\s+/g, '')}{' '}
                    <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize md:text-xl text-gray-400 text-xs'>
                        {user.userName}
                    </p>
                </div>
            </div>

            <div>
                <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                    <p className={`text-xl font-semibold cursor-pointer ${posts} mt-2`} onClick={() => setShowUserPosts(true)}>
                        Posts
                    </p>
                    <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserPosts(false)}>
                        Liked
                    </p>
                </div>

                <div className='flex gap-6 flex-wrap md:justify-start'>
                    {postsList?.length > 0 ? (
                        postsList.map((post: Post, idx: number) => (
                            <PostCard post={post} key={idx}/>
                    ))
                    ) : (
                        <NoResults
                            text={`No ${showUserPosts ? '' : 'Liked'} Posts Yet`}
                    />
                    )}
                </div>  

            </div>

        </div>
    )
}

export const getServerSideProps = async ({
    params: { id }
}: {
    params: { id: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: { data: res.data }
    }
}

export default Profile;


// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { GoVerified } from 'react-icons/go';
// import axios from 'axios';

// import PostCard from '@/components/PostCard';
// import NoResults from '@/components/NoResults';
// import { IUser, Post } from '@/types';
// import { BASE_URL } from '@/utils';

// interface IProps {
//   data: {
//     user: IUser;
//     userVideos: Post[];
//     userLikedVideos: Post[];
//   };
// }

// const Profile = ({ data }: IProps) => {
//   const [showUserPosts, setShowUserPosts] = useState<Boolean>(true);
//   const [postsList, setPostsList] = useState<Post[]>([]);

//   const { user, userPosts, userLikedPosts } = data;

//   const posts = showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';
//   const liked = !showUserPosts ? 'border-b-2 border-black' : 'text-gray-400';

//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (showUserPosts) {
//         setPostsList(userPosts);
//       } else {
//         setPostsList(userLikedPosts);
//       }
//     };

//     fetchPosts();
//   }, [showUserPosts, userLikedPosts, userPosts]);

//   return (
//     <div className='w-full'>
//       <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
//         <div className='w-16 h-16 md:w-32 md:h-32'>
//           <Image
//             width={34}
//             height={34}
//             layout='responsive'
//             className='rounded-full'
//             src={user.image}
//             alt='user-profile'
//           />
//         </div>

//         <div>
//           <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
//             <span>{user.userName.replace(/\s+/g, '')} </span>
//             <GoVerified className='text-blue-400 md:text-xl text-md' />
//           </div>
//           <p className='text-sm font-medium'> {user.userName}</p>
//         </div>
//       </div>
//       <div>
//         <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
//           <p className={`text-xl font-semibold cursor-pointer ${posts} mt-2`} onClick={() => setShowUserPosts(true)}>
//             Posts
//           </p>
//           <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserPosts(false)}>
//             Liked
//           </p>
//         </div>

//         <div className='flex gap-6 flex-wrap md:justify-start'>
//           {postsList.length > 0 ? (
//             postsList.map((post: Post, idx: number) => (
//               <PostCard key={idx} post={post} />
//             ))
//           ) : (
//             <NoResults
//               text={`No ${showUserPosts ? '' : 'Liked'} Posts Yet`}
//             />
//           )}
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps = async ({
//   params: { userId },
// }: {
//   params: { userId: string };
// }) => {
//   const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

//   return {
//     props: { data: res.data },
//   };
// };
// export default Profile;
