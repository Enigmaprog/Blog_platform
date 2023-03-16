import React, { useState, useEffect, useRef} from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types'; // Define Post type in types.ts file
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import TextCutter from './TextCutter';
import ReadingTime from './ReadingTime';

interface IProps {
    post: Post;
}

const PhotoCard: NextPage<IProps> = ({ post: {photo, _id, caption, description, postedBy, likes} }) => {

    const [isHover, setIsHover] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // const assetUrl = post.image?.asset?.url;
    // console.log(assetUrl);

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded" >
                <div className="md:w-16 md:h-16 w-10 h-10">
                    <Link href={`/profile/${postedBy._id}`}>
                        <>                               
                            <Image
                                width={62}
                                height={62}
                                className="rounded-full"
                                src={postedBy?.image}
                                alt="profile phoot"
                                layout="responsive"    
                            />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={`/profile/${postedBy._id}`}>
                        <div className="flex items-center gap-2">
                            <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                                {postedBy?.userName} {` `}
                                <GoVerified className="text-blue-400 text-md"/>
                            </p>
                            <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                                {postedBy?.userName}
                            </p>
                        </div>
                    </Link>
                    <Link href={`/detail/${_id}`}>
                        <div className='flex items-center gap-2'>
                            <p className='mt-2 font-bold text-[17px]'>{caption}</p>
                        </div>
                    </Link>
                    <Link href={`/detail/${_id}`}>
                        <p className='mt-2 font-normal'>
                            <TextCutter text={description} maxLength={150} />
                            <ReadingTime text={description} />
                        </p>
                    </Link>
                </div>
            </div>
           

            <div>
                <Link href={`/detail/${_id}`}>
                    <div style={{ textAlign: "center" }}>
                        <Image
                            width="300"
                            height="200"
                            src={photo.asset.url}
                        />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default PhotoCard;




// const PostCard: NextPage<IProps> = ({ post }) => {

//     const [isHover, setIsHover] = useState(false);
//     const [playing, setPlaying] = useState(false);
//     const [isVideoMuted, setIsVideoMuted] = useState(false);
//     const videoRef = useRef<HTMLVideoElement>(null);

//     const onVideoPress = () => {
//         if(playing) {
//             videoRef?.current?.pause();
//             setPlaying(false);
//         } else {
//             videoRef?.current?.play();
//             setPlaying(true);
//         }
//     }

//     return (
//         <div className="flex flex-col border-b-2 border-gray-200 pb-6">
//             <div>
//                 <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded" >
//                     <div className="md:w-16 md:h-16 w-10 h-10">
//                         <Link href="/">
//                             <>                               
//                                 <Image
//                                     width={62}
//                                     height={62}
//                                     className="rounded-full"
//                                     src={post.postedBy.image}
//                                     alt="profile phoot"
//                                     layout="responsive"    
//                                 />
//                             </>
//                         </Link>
//                     </div>
//                     <div>
//                         <Link href="/">
//                             <div className="flex items-center gap-2">
//                                 <p className="flex gap-2 items-center md:text-md font-bold text-primary">
//                                     {post.postedBy.userName} {` `}
//                                     <GoVerified className="text-blue-400 text-md"/>
//                                 </p>
//                                 <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
//                                     {post.postedBy.userName}
//                                 </p>
//                             </div>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             <div className="lg-ml-20 flex gap-4 relative">
//                 <div
//                     onMouseEnter={() => setIsHover(true)}
//                     onMouseLeave={() => setIsHover(false)}
//                     className="rounded-3x1">
//                     <Link href={`/detail/${post._id}`}>
//                         <video
//                             loop
//                             ref={videoRef}
//                             className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2x1 cursor-pointer bg-gray-100"
//                             src={post.video.asset.url}
//                         >
//                         </video>
//                     </Link>

//                         {isHover && 
//                             <div className = "absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
//                                  {playing ? (
//                                     <button onClick={onVideoPress}>
//                                         <BsFillPauseFill className="text-black text-2x1 lg:text-4x1"/>
//                                     </button>
//                                 ) : (
//                                     <button onClick={onVideoPress}>
//                                         <BsFillPlayFill className="text-black text-2x1 lg:text-4x1"/>
//                                     </button>
//                                 )}
//                                 {isVideoMuted ? (
//                                     <button onClick={() => setIsVideoMuted(false)}>
//                                         <HiVolumeOff className="text-black text-2x1 lg:text-4x1"/>
//                                     </button>
//                                 ) : (
//                                     <button onClick={() => setIsVideoMuted(true)}>
//                                         <HiVolumeUp className="text-black text-2x1 lg:text-4x1"/>
//                                     </button>
//                                 )}
//                             </div>
//                         }
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default PostCard;


// interface Props {
//     posts?: Post[];
// }
  
//   const PostList: React.FC<Props> = ({ posts }) => {
//     return (
//       <div className="post-list">
//         {posts && posts.map((post) => (
//           <div key={post.userId} className="post">
//             <img src={post.imageUrl} alt={post.title} className="post-image" />
//             <div className="post-content">
//               <h2 className="post-title">{post.title}</h2>
//               <h1>
//                 Posts
//               </h1>
//               <p className="post-description">{post.description}</p>
//               <div className="post-author">
//                 <img src={post.author.imageUrl} alt={post.author.name} className="post-author-image" />
//                 <div className="post-author-info">
//                   <p className="post-author-name">{post.author.name}</p>
//                   <p className="post-author-bio">{post.author.bio}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default PostList;