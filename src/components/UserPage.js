import styled from "styled-components";
import { useEffect, useState } from 'react';
import Header from "./commons/header/Header.js";
import NewPosts from "./Post.js";
import Hashtags from "./Hashtags.js";
import { getUserLinkrs } from "../services/linkr.js";
import { useParams, useNavigate } from "react-router-dom";

export default function UserPage({ username, profilePic }) {
    const { id } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const userToken = localStorage.getItem('linkr-token');
    const navigate = useNavigate();

    console.log(userPosts)

    if (!userToken) { 
        alert('Você não está autorizado para esse acesso, faça o login!');
        navigate('/') 
    };

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
                    <img src="{user.pictureUrl}" alt="Profile picture"/>
                    <h1>aa's posts</h1>
                </Title>
                <Container>
                    <AlignBox>
                        {userPosts.length === 0 ? <h2>You haven't posted anything yet.</h2>
                            :
                            <>
                                {userPosts.map((a) => <NewPosts key={a.postId} userId={a.userId} photo={a.pictureUrl} username={a.username} comment={a.comment} url={a.url} urlTitle={a.urlTitle} urlImage={a.urlImage} urlDescription={a.urlDescription} />)}
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
        display: none;
    }
`;

const Container = styled.div`
    width: 937px;
    height: 100%;
    display: flex;
    justify-content: flex-start;

    h2 {
        color: #ffffff;
        font-size: 27px;
        font-weight: 700;
        font-family: var(--font-titles);
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
    }

    h1 {
        color: #ffffff;
        font-size: 43px;
        font-weight: 700;
        font-family: var(--font-titles);
    }

    @media (max-width: 645px) {
    }
`;

const AlignBox = styled.div`
    width: 611px;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;