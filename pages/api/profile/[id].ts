import type { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const query = singleUserQuery(id);
    const userPhotosQuery = userCreatedPostsQuery(id);
    const userLikedPhotosQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userPhotos = await client.fetch(userPhotosQuery);
    const userLikedPhotos = await client.fetch(userLikedPhotosQuery);

    const data = { user: user[0], userPhotos, userLikedPhotos };

    res.status(200).json(data); 
  }
}
