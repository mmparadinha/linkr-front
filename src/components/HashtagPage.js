import styled from "styled-components";
import axios from "axios";
import Header from "./commons/Header";
import NewPosts from "./Post";
import {useContext, useEffect} from 'react';
import UserContext from '../contexts/UserContext';
import Hashtags from "./Hashtags";

export default function HashtagPage(){
    const {hashtagName, setHashtagName, hashtagPosts, setHashtagPosts} = useContext(UserContext);

    useEffect(() => {
        if(hashtagName !== ''){
            const promise = axios.get(`${process.env.REACT_APP_BACK_END_URL}/hashtag/${hashtagName}`);
            promise.then(res => {
                setHashtagPosts(res.data);
                console.log(hashtagPosts)
            });
        }
    }, [hashtagName]);

    return (
        <>
            <Header>
                {Header}
            </Header>
            <Body>
                <Title># {hashtagName}</Title>
                <Container>
                    <AlignBox>
                        {hashtagPosts.length === 0 ? <h1>There are no posts yet.</h1>
                            :
                            <>
                                {hashtagPosts.map((a) => <NewPosts userId={a.userId} photo={a.pictureUrl} username={a.username} comment={a.comment} url={a.url} urlTitle={a.urlTitle} urlImage={a.urlImage} urlDescription={a.urlDescription} />)}
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

    h1 {
        
    color: #ffffff;
    font-size: 27px;
    font-weight: 700;
    font-family: var(--font-titles);
    };
`;

const Title = styled.h5`
    color: #ffffff;
    font-size: 43px;
    font-weight: 700;
    font-family: var(--font-titles);
    margin-bottom: 43px;

    @media (max-width: 645px) {
    }
`;

const Publish = styled.div`
    height: 209px;
    width: 611px;
    display: flex;
    border-radius: 16px;
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

    @media(max-width: 645px){
        width: 44px;
        height: 44px;
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
`;

const Input1 = styled.input`        
        height: 30px;
        width: 503px;
        background: #EFEFEF;
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

        &:disabled{
            opacity: 0.7;
        }
`;

const Input2 = styled.input`
    height: 66px;
    width: 503px;
    background: #EFEFEF;
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

    &:disabled{
        opacity: 0.7;
    }
`;

const Button1 = styled.button`
        display: flex;
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;

        font-family: var(--font-body);
        font-size: 14px;
        font-weight: 700;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        color: #FFFFFF;

        margin-top: 5px;
        margin-left: 391px;
        box-sizing: border-box;
        cursor: pointer;
        text-align: center;
        align-items: center;
        justify-content: center;

        border-style: solid;
        border-width: 1px;
        border-color: #1877F2;

        &:disabled{
            opacity: 0.7;
        }
`;

const AlignBox = styled.div`
    width: 611px;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;