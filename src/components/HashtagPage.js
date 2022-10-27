import styled from "styled-components";
import axios from "axios";
import Header from "./commons/header/Header";
import NewPosts from "./Post";
import {useContext, useEffect} from 'react';
import UserContext from '../contexts/UserContext';
import Hashtags from "./Hashtags";
import {useParams} from 'react-router-dom';
import Loading from "./commons/Loading";

export default function HashtagPage(){
    const {hashtagName, hashtagPosts, setHashtagPosts, config, setHashtagName} = useContext(UserContext);
    const {hashtag} = useParams();

    useEffect(() => {
        if(hashtagName !== ''){
            const promise = axios.get(`${process.env.REACT_APP_BACK_END_URL}/hashtag/${hashtagName}`, config);
            promise.then(res => {
                setHashtagPosts(res.data);
            });
            promise.catch(res => {
                console.log(res.data);
            });
        }
    }, [hashtagName]);

    useEffect(() => {
        setHashtagName(hashtag);
    }, []);

    return (
        <>
            <Header>
                {Header}
            </Header>
            <Body>
                <Title># {hashtagName}</Title>
                <Container>
                    <AlignBox>
                        {hashtagPosts.length === 0 ? <Loading />
                            :
                            <>
                                {hashtagPosts.map((a, index) => <NewPosts key={index} userId={a.userId} photo={a.pictureUrl} username={a.username} comment={a.comment} url={a.url} urlTitle={a.urlTitle} urlImage={a.urlImage} urlDescription={a.urlDescription} />)}
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
	width: 931px;
    display: flex;
    flex-direction: column;
    margin: 150px auto 30px auto;
    box-sizing: border-box;

    @media (max-width: 645px) {
        width: 100%;
        margin: 99px 0 20px 0;
    }
`;

const Container = styled.div`
    width: 937px;
    display: flex;
    justify-content: flex-start;

    h1 {
    color: #ffffff;
    font-size: 27px;
    font-weight: 700;
    font-family: var(--font-titles);
    };

    @media (max-width: 645px) {
        width: 100%;
    }
    h1{
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

const AlignBox = styled.div`
    width: 611px;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media (max-width: 645px) {
        width: 100%;
    }
`;