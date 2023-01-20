import React, { useEffect, useState } from "react";
import { IPost, useGetPostsQuery, useAddPostMutation } from "../services/post";
import { Card, Typography, Button, Skeleton } from "antd";
import ".././App.css";

const { Title } = Typography;

export default function Post() {
  const [post, setPost] = useState("");
  const [totalPosts, setTotalPosts] = useState<IPost[]>([]);
  const { data = [], isLoading } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();

  useEffect(() => {
    if (data?.length > 0) {
      setTotalPosts(data);
    }
  }, [data]);

  const onAddPost = async () => {
    const p: IPost = {
      title: post,
      body: post,
      userId: data?.length + 1,
      id: data?.length + 1,
    };
    await addPost(p);
    setTotalPosts([p, ...totalPosts]);
  };

  return (
    <Skeleton loading={isLoading}>
      <div>
        <Title style={{ marginBottom: "30px" }}>Posts : Card</Title>
        <div className="posts_data">
          {totalPosts &&
            totalPosts.map((item) => (
              <Card
                className="card-content"
                loading={isLoading}
                key={item.id}
                title={`${item.title.slice(0, 15)}...`}
              >
                <p>{`${item.body.slice(0, 20)}...`}</p>
              </Card>
            ))}
          <Card className="card-content" loading={isLoading} title={"Add Post"}>
                      <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column', gap:'10px' }}>
                      <input
              type="text"
              value={post}
              onChange={(event) => setPost(event.target.value)}
            />
            <Button onClick={onAddPost}>Add Post</Button>
            </div>
          </Card>
        </div>
      </div>
    </Skeleton>
  );
}
