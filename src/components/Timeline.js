import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./commons/Header";

import { NewPosts } from "./Post";
import profilePicture from "./../assets/Imagens Teste/teste.jpeg";
import { Link } from "react-router-dom";

export default function Timeline() {
  // const { user } = useContext(UserContext);
  // user.name user.pictureUrl
  // const user = localStorage.getItem("token");

  // lógica de publicação
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let newPost = {
      url: `${url}`,
      comment: `${comment}`,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/timeline`,
        newPost
      );
      setLoading(false);
      setUrl("");
      setComment("");
      alert("Post criado com sucesso!");
      // newPosts();
    } catch (error) {
      alert("Houve um erro ao publicar seu link.");
      setLoading(false);
      console.log(error.response);
    }
  }

  // lógica das postagens
  const [posts, setPosts] = useState([]);

  // async function newPosts() {
  //     try {
  //         const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/timeline`);
  //         setPosts(response.data);
  //     } catch (error) {
  //         alert('An error occured while trying to fetch the posts, please refresh the page');
  //         console.log(error.response);
  //     };
  // };

  // useEffect(() => {
  //     newPosts();
  // }, []);

  return (
    <>
      <Header>{Header}</Header>
      <Body>
        <Container>
          <Title>timeline</Title>
          <Publish>
            <Photo src={profilePicture} />
            <PublishContent>
              <p>What are you going to share today?</p>
              <form onSubmit={handleSubmit}>
                <Input1
                  disabled={loading}
                  type="text"
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="http://..."
                  value={url}
                  required
                ></Input1>
                <Input2
                  disabled={loading}
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Awesome article about #javascript"
                  value={comment}
                ></Input2>
                <Button1 disabled={loading} type="submit">
                  {loading === true ? "Publishing" : "Publish"}
                </Button1>
              </form>
            </PublishContent>
          </Publish>
          {posts.length === 0 ? (
            <h1>There are no posts yet.</h1>
          ) : (
            <>
              {/* {posts.map((a) => <NewPosts photo={a.pictureUrl} username={a.username} comment={a.comment} url={a.url} urlTitle={a.urlTitle} urlImage={a.urlImage} urlDescription={a.urlDescription} />)} */}
            </>
          )}
        </Container>
      </Body>
    </>
  );
}

const Body = styled.div`
  margin-top: 150px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 611px;
  height: 100%;

  h1 {
    color: #ffffff;
    font-size: 27px;
    font-weight: 700;
    font-family: var(--font-titles);
  }
`;

const Title = styled.h5`
  color: #ffffff;
  font-size: 27px;
  font-weight: 700;
  font-family: var(--font-titles);

  @media (max-width: 600px) {
  }
`;

const Publish = styled.div`
  height: 209px;
  width: 611px;
  display: flex;
  border-radius: 16px;
  margin-top: 48px;
  margin-bottom: 48px;
  padding-top: 18px;
  padding-left: 16px;
  background-color: white;
  box-sizing: border-box;
`;

const Photo = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;

  @media (max-width: 500px) {
    width: 44px;
    height: 44px;
  }
`;

const PublishContent = styled.div`
  padding-top: 10px;
  padding-left: 18px;
  font-family: Lato;
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0em;
  text-align: left;
  color: #707070;
`;

const Input1 = styled.input`
  height: 30px;
  width: 503px;
  background: #efefef;
  margin-top: 10px;
  padding-left: 13px;

  border-radius: 5px;
  border-style: none none solid;
  border-width: 1px;
  border-color: #000 #000 hsla(0, 0%, 100%, 0.7);

  box-sizing: border-box;
  cursor: pointer;

  ::placeholder {
    font-family: Lato;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    padding-left: 13px;
    color: #949494;
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const Input2 = styled.input`
  height: 66px;
  width: 503px;
  background: #efefef;
  margin-top: 5px;
  padding-left: 13px;

  border-radius: 5px;
  border-style: none none solid;
  border-width: 1px;
  border-color: #000 #000 hsla(0, 0%, 100%, 0.7);

  box-sizing: border-box;
  cursor: pointer;

  ::placeholder {
    font-family: Lato;
    font-size: 15px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    padding-left: 13px;
    color: #949494;
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const Button1 = styled.button`
  display: flex;
  width: 112px;
  height: 31px;
  background: #1877f2;
  border-radius: 5px;

  font-family: Lato;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #ffffff;

  margin-top: 5px;
  margin-left: 391px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;

  border-style: solid;
  border-width: 1px;
  border-color: #1877f2;

  &:disabled {
    opacity: 0.7;
  }
`;
