import styled from "styled-components";
import { useEffect, useContext } from 'react';
import axios from "axios";
import Header from "./commons/header/Header";
import TimelineFeed from "./TimelineFeed";
import Hashtags from "./Hashtags";
import Loading from "./commons/Loading";
import useInterval from 'react-useinterval';
import UserContext from '../contexts/UserContext';
import update from "./../assets/update.png"

export default function Timeline() {
  const { setPostID, postID, count, setCount, config, userPicture, userId, url, setUrl, comment, setComment, loading, setLoading, posts, setPosts } = useContext(UserContext);

  // lógica de criar novos posts
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let newPost = ({
      url: `${url}`,
      comment: `${comment}`,
      userId: `${userId}`
    });

    const commentArray = comment.split(" ");
    const hashtags = commentArray.filter((hashtag) => {
      return hashtag.includes('#');
    });

    try {
      const post = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/timeline`, newPost, config);

      hashtags.map(async (hashtag) => {
        const name = hashtag.replace('#', '');
        const dataHashtag = {
          postId: post.data.postId,
          name
        };
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/hashtags`, dataHashtag, config);
      });

      setLoading(false);
      setUrl("");
      setComment("");
      alert('Post criado com sucesso!');
      newPosts();
    } catch (error) {
      alert('Houve um erro ao publicar seu link.');
      setLoading(false);
      console.log(error.response);
    };
  };

  // lógica das postagens 
  async function newPosts() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/timeline`, config);
      if (!response.data) { return setPosts(-1); }
      if (response.data.length === 0) { return setPosts([]); }
      setPosts(response.data);
      setPostID(response.data[0].postId);
    } catch (error) {
      console.log("An error occured while trying to fetch the posts, please refresh the page");
      console.error(error);
    }
  };

  useEffect(() => {
    newPosts();
  }, []);

  // lógica de atualizar timeline 
  async function countNewPosts() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/timeline/update?postId=${postID}`, config);
      if (response.data.count !== 0) { setCount(Number(response.data.count)) };
    } catch (error) {
      console.log(error.response);
    }
  };

  useInterval(countNewPosts, 15000);

  function updateButton() {
    newPosts();
    setCount(0)
  };

  return (
    <>
      <Header>{Header}</Header>
      <Body>
        <Title>timeline</Title>
        <Container>
          <AlignBox>
            <Publish>
              <Photo src={userPicture} />
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
            {count === 0 ? <></> : <Update onClick={updateButton} >
              <h1>{count} new posts, load more!</h1>
              <img alt="" src={update} />
            </Update>}

            {posts ? <TimelineFeed /> : <Loading />}

          </AlignBox>
          <Hashtags />
        </Container>
      </Body>
    </>
  );
};

const Update = styled.div`

    width: 611px;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 17px;
    cursor: pointer;

    h1 {

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;

    };

    img {
        width: 22px;
        height: 16px;
        margin-left: 14px;
    }
    
`

const Body = styled.div`
  width: 931px;
  display: flex;
  flex-direction: column;
  margin: 150px auto 30px auto;
  box-sizing: border-box;

  @media (max-width: 645px) {
    width: 100%;
    margin: 80px 0 20px 0;
  }
`;

const Container = styled.div`
  width: 937px;
  height: 100%;
  display: flex;
  justify-content: flex-start;

  h1 {
    color: #ffffff;
    font-size: 27px;
    font-weight: 700;
    font-family: var(--font-titles);
  }

  @media (max-width: 645px) {
    width: 100%;
  }
  h1 {
    font-size: 17px;
    font-family: var(--font-body);
  }
`;

const Title = styled.h5`
  color: #ffffff;
  font-size: 43px;
  font-weight: 700;
  font-family: var(--font-titles);
  margin-bottom: 43px;

  @media (max-width: 645px) {
    font-size: 33px;
    margin-left: 17px;
    margin-bottom: 19px;
  }
`;

const Publish = styled.div`
  height: 209px;
  width: 611px;
  display: flex;
  border-radius: 16px;
  margin-bottom: 29px;
  padding-top: 18px;
  padding-left: 16px;
  background-color: white;
  box-sizing: border-box;

  @media (max-width: 645px) {
    width: 100%;
    height: 164px;
    border: none;
    border-radius: 0px;
    padding: 0px;
    margin-bottom: 16px;
    position: relative;
  }
`;

const Photo = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 645px) {
    display: none;
  }
`;

const PublishContent = styled.div`
  padding-top: 10px;
  padding-left: 18px;
  font-family: var(--font-body);
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0em;
  text-align: left;
  color: #707070;

  @media (max-width: 645px) {
    width: 100%;
    padding: 15px;
    font-size: 17px;
    display: flex;
    flex-direction: column;

    p {
      text-align: center;
    }
  }
`;

const Input1 = styled.input`
  height: 30px;
  width: 503px;
  background: #efefef;
  margin-top: 10px;
  padding-left: 5px;

  border-radius: 5px;
  border-style: none none solid;
  border-width: 1px;
  border-color: #000 #000 hsla(0, 0%, 100%, 0.7);

  box-sizing: border-box;
  cursor: pointer;

  ::placeholder {
    font-family: var(--font-body);
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

  @media (max-width: 645px) {
    width: 100%;
    height: 30px;

    ::placeholder {
      font-size: 13px;
    }
  }
`;

const Input2 = styled.input`
  height: 66px;
  width: 503px;
  background: #efefef;
  margin-top: 5px;
  padding-left: 5px;

  border-radius: 5px;
  border-style: none none solid;
  border-width: 1px;
  border-color: #000 #000 hsla(0, 0%, 100%, 0.7);

  box-sizing: border-box;
  cursor: pointer;

  ::placeholder {
    font-family: var(--font-body);
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

  @media (max-width: 645px) {
    width: 100%;
    height: 47px;

    ::placeholder {
      font-size: 13px;
    }
  }
`;

const Button1 = styled.button`
  display: flex;
  width: 112px;
  height: 31px;
  background: #1877f2;
  border-radius: 5px;

  font-family: var(--font-body);
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

  @media (max-width: 645px) {
    margin-left: 0;
    height: 22px;
    position: absolute;
    bottom: 12px;
    right: 15px;
  }
`;

const AlignBox = styled.div`
  width: 611px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  h2 {
    color: #ffffff;
    font-size: 19px;
    font-weight: 400;
    font-family: var(--font-body);
  }

  @media (max-width: 645px) {
    width: 100%;
  }
`;
