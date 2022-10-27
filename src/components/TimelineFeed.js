import { useContext } from 'react';
import NewPosts from "./Post";
import UserContext from '../contexts/UserContext';

export default function TimelineFeed() {
  const { posts } = useContext(UserContext);

  if (posts === -1) {
    return (
      <h2>You don't follow anyone yet. Search for new friends!</h2>
    );
  } else if (posts.length === 0) {
    return (
      <h2>No posts found from your friends</h2>
    );
  } else {
    return (
      <>
        {posts.map((a, index) => (
          <NewPosts key={index}
            userId={a.userId}
            photo={a.pictureUrl}
            username={a.username}
            comment={a.comment}
            url={a.url}
            urlTitle={a.urlTitle}
            urlImage={a.urlImage}
            urlDescription={a.urlDescription}
            postId={a.postId}
          />
        ))}
      </>
    );
  }
};