import Image from "next/image";
import { getAllPost } from "./actions";
import { auth } from "auth";
import Post from "./components/Post";

export default async function Home() {
  const posts = await getAllPost();

  if (!posts) return <p>loanding</p>;

  const session = await auth()

  let userId = null

  if(session) { 
    userId = session.user.userId
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1>NextGram</h1>
      <div>
        {posts && posts.length > 0 ? (
          <div>
            {posts.map((post, index) => (
              <div key={index}>
                  <Post post={post} currentID={userId} />
              </div>
            ))}
          </div>
        ) : (
          <div> Voçê não tem posts</div>
        )}
      </div>
    </div>
  );
}
