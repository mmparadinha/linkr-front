import UserContext from '../contexts/UserContext';
import styled from "styled-components";
import { useEffect, useContext, useState } from 'react';
import Header from "./commons/header/Header.js";
import NewPosts from "./Post.js";
import Hashtags from "./Hashtags.js";
import { getUserData } from "../services/linkr.js";
import { useParams } from "react-router-dom";
import Loading from './commons/Loading';
import axios from 'axios';

export default function UserPage() {
    const { id } = useParams();
    const {follow, setFollow, URL_BASE, config} = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(null);
    let disabled = false;

    useEffect(() => {
        async function getUserPage() {
            try {
                const res = await getUserData(id);
                setUserInfo(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUserPage();
        checkFollower();
    }, [id]);

    async function checkFollower(){
        try {
            const response = await axios.get(`${URL_BASE}/followers/${id}`, config);

            if(response.data.length === 0){
                disabled = false;
                setFollow('Follow');
            }
            if (response.data.length > 0){
                disabled = false;
                setFollow('Unfollow');
            }
        } catch (error) {
            console.error(error);
        }
    }

    function isFollowed(){
        const followData = {
            followedId: id
        }

        const promise = axios.get(`${URL_BASE}/followers/${id}`, config);
        disabled = true;

        promise.then(async res => {
            if(res.data.length === 0){
                await axios.post(`${URL_BASE}/followers/${id}`, {followedId: id}, config);
                checkFollower();
                disabled = false;
            }
            if (res.data.length > 0){            
                await axios.delete(`${URL_BASE}/followers/${id}`, config);
                checkFollower();
                disabled = false;
            }
        })

        promise.catch(res => {
            console.log(res.data);
            alert('Não foi possível processar a solicitação, tente novamente.');
        })
    }

    return (
        <>
            <Header>
                {Header}
            </Header>
            {!userInfo
            ?
            <Body>
                <Loading />
            </Body>
            :
            <Body>
                <Title>
                    <img src={userInfo?.pictureUrl} alt="profile" />
                    <h1>{userInfo?.username}'s posts</h1>
                    {(userId !== id) ? 
                    <Button type={follow} disabled={disabled} onClick={() => isFollowed()}>{follow}</Button> 
                    : 
                    <></>}
                </Title>
                <Container>
                    <AlignBox>
                        {userInfo?.userPosts.length === 0
                        ?
                        <span>This user is oddly quiet. No posts yet...</span>
                        :
                        <>
                            {userInfo?.userPosts.map((a, index) => (
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
            }
        </>
    );
}

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
    position: relative;

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
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    span {
        color: #ffffff;
        font-size: 19px;
        font-weight: 400;
        font-family: var(--font-body);
    }
    
    @media (max-width: 645px) {
    width: 100%;
  }
`;

const collors = {
    blue: "#1877f2",
    white: "#ffffff"
}

const Button = styled.button`
    width: 112px;
    height: 31px;
    background-color: ${props => {
        if(props.type === 'Unfollow'){
            return collors.white
        } else {
            return collors.blue;
        }
    }};
    border-radius: 5px;
    border: 0px;
    color: ${props => {
        if(props.type === 'Unfollow'){
            return collors.blue
        } else {
            return collors.white;
        }
    }};
    position: absolute;
    top: 0;
    right: 0%;;
`;
