import React from 'react';
import { Post, POSTTYPES } from '../../types';
import { PostCard } from '../Post';
import ComponentWrapper from '../ComponentWrapper/ComponentWrapper';
import NoScrollLink from '../NoScrollLink/NoScrollLink';

interface IProps {
  posts: Post[];
}

export default function LatestPosts({ posts }: IProps): JSX.Element {
  return (
    <ComponentWrapper
      data={{
        title: 'Latest Content...',
        subTitle: 'What I’m up to and more.',
      }}
    >
      <ul className="flex flex-wrap gap-6 flex-row w-full items-start justify-center xl:justify-start">
        {posts.map(({ data }) => {
          return (
            <li key={data.UUID}>
              <PostCard post={data} postType={POSTTYPES.BLOG} />
            </li>
          );
        })}
      </ul>
      <div className="flex gap-1 mt-10 text-lg flex-row lg:text-xl justify-center xl:justify-start flex-wrap">
        <p>Want to read more?</p>
        <span className="font-semibold">
          <NoScrollLink href="/blog">View all posts here</NoScrollLink>
        </span>
      </div>
    </ComponentWrapper>
  );
}
