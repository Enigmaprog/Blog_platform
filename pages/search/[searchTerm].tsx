import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import PostCard from "@/components/PostCard";
import NoResults from '@/components/NoResults';
import { IUser, Post } from "@/types";
import { BASE_URL } from "@/utils";
import useAuthStore from '@/store/authStore';

const Search = ({ posts }: { posts: Post[] }) => {

    const [isAccounts, setisAccounts] = useState(false)

    const router = useRouter();
    const { searchTerm }: any = router.query;
    const { allUsers } = useAuthStore();

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isPosts = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className='w-full'>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                <p className={`text-xl font-semibold cursor-pointer ${accounts} mt-2`} onClick={() => setisAccounts(true)}>
                    Accounts
                </p>
                <p className={`text-xl font-semibold cursor-pointer ${isPosts} mt-2`} onClick={() => setisAccounts(false)}>
                    Posts
                </p>
            </div>
            {isAccounts ? (
                <div className='md:mt-16'>
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser, idx: number) => (
                            <Link href={`/profile/${user._id}`} key={idx}>
                                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                                    <div>
                                        <Image
                                        width={50}
                                        height={50}
                                        className='rounded-full'
                                        src={user.image}
                                        alt='user-profile'
                                        />
                                    </div>
                                    <div className='hidden xl:block'>
                                        <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                                            {user.userName.replace(/\s+/g, '')}{' '}
                                            <GoVerified className='text-blue-400' />
                                        </p>
                                        <p className='capitalize text-gray-400 text-xs'>
                                            {user.userName}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : <NoResults text={`No accounts results for ${searchTerm}`}/> }
                </div>
            ) : <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                    {posts.length ? (
                        posts.map((post: Post, idx) => (
                            <PostCard post={post} key={idx} />
                        ))

                    ) : <NoResults text={`No posts results for ${searchTerm}`}/>}
                </div>}
        </div>
    )
}

export const getServerSideProps = async ({
    params: { searchTerm }
}: {
    params: { searchTerm: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: { posts: res.data }
    }
}

export default Search