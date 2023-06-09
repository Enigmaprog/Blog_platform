import type { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery } from '@/utils/queries';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "GET") {
    const { searchTerm } = req.query;
    
    const postsQuery = searchPostsQuery(searchTerm);

    const posts = await client.fetch(postsQuery);

    res.status(200).json(posts)
    
  }
}
