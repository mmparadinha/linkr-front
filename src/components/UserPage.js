import styled from "styled-components";
import { useEffect, useState } from 'react';
import Header from "./commons/header/Header.js";
import NewPosts from "./Post.js";
import Hashtags from "./Hashtags.js";
import { getUserLinkrs } from "../services/linkr.js";
import { useParams, useLocation } from "react-router-dom";
import Loading from "./commons/Loading.js";

export default function UserPage() {
    const { id } = useParams();
    const location = useLocation();
    const { profilePic, username } = location.state;
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        getUserLinkrs(id)
            .then(res => setUserPosts(res.data))
            .catch(error => console.log(error));
    }, [id]);

    return (
        <>
            <Header>
                {Header}
            </Header>
            <Body>
                <Title>
                    <img src={profilePic} alt="Profile picture" />
                    <h1>{username}'s posts</h1>
                </Title>
                <Container>
                    <AlignBox>
                        {userPosts && userPosts.length === 0
                        ?
                        <Loading />
                        :
                        <>
                            {userPosts.map((a, index) => (
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
                        }
                    </AlignBox>
                    <Hashtags />
                </Container>
            </Body>

        </>
    );
};

const Body = styled.div`
    height: 100%;
	width: 931px;
    display: flex;
    flex-direction: column;
    margin: 150px auto 30px auto;

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

    @media (max-width: 645px) {
        width: 100%;
    }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 18px;
    margin-bottom: 43px;

    img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        object-fit: cover;
    }

    h1 {
        color: #ffffff;
        font-size: 43px;
        font-weight: 700;
        font-family: var(--font-titles);
    }

    @media (max-width: 645px) {
        font-size: 33px;
        margin-left: 17px;
        margin-bottom: 19px;
    }
`;

const AlignBox = styled.div`
  width: 611px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 645px) {
    width: 100%;
  }
`;