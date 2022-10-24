import styled from 'styled-components';
import axios from 'axios';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

export default function Likes({postId}) {
    const [isLiked, setIsLiked] = useState(false);

    const URL_BASE = 'http://127.0.0.1:4000';

    useEffect(() => {
        const token = localStorage.getItem('linkr-token');

        const config = {headers: {Authorization: `Bearer ${token}`}}

        const promise = axios.get(
          `${URL_BASE}/likes/${postId}`,
          config
        );

        promise.then((res) => {
          if (res.data) {
            setIsLiked(true);
          }else {
            setIsLiked(false);
          }
        });
    
        promise.catch((error) => {
<<<<<<< HEAD
          alert("An error has occurred");
=======
          // alert("An error has occurred");
>>>>>>> main
        });
    }, []);

    function dislike() {
        console.log("entrei")
        return setIsLiked(false);
    }

    function like() {
        console.log("aoba")
        return setIsLiked(true);
    }

    return (
        <>
            {/* <FiHeartedLike /> */}
            {isLiked ? <FiHeartedLike onClick={dislike} /> : <AllFillHeartedLike onClick={like} />}
        </>
    );
}

const FiHeartedLike = styled(FiHeart)`
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