import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';

export default function Likes({ postId }) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('linkr-token');
        const config = { headers: { Authorization: `Bearer ${token}` } }

        const promise = axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
            config
        );

        promise.then((res) => {
            if (res.data.length > 0) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        });

        promise.catch((error) => {
            //   alert("An error has occurred")
        });
    }, []);

    function toggleLike() {
        const token = localStorage.getItem('linkr-token');
        const config = {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
            {},
            config
        );

        promise.then((response) => {
            setIsLiked(!isLiked);

            promise.catch((error) => {
                alert("Não foi possível interagir com o post");
            });
        });

        promise.catch((error) => {
            alert("Não foi possível interagir com o post");
        });
    }

    return (
        <>
            {isLiked ? <FiHeartedLike onClick={toggleLike} /> : <AllFillHeartedLike onClick={toggleLike} />}
        </>
    );
}

const FiHeartedLike = styled(AiOutlineHeart)`
    margin-top: 20px;
    width: 20px;
    height: 20px;
    color: white;
    cursor: pointer;
`;

const AllFillHeartedLike = styled(AiFillHeart)`
    margin-top: 20px;
    width: 20px;
    height: 20px;
    color: red;
    cursor: pointer;
`;