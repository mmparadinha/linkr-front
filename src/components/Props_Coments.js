import { useState } from "react";
import styled from "styled-components";

export default function Props_Comments(props) {
  const [autor, setAutor] = useState("apagar");
  const [seguindo, setSeguindo] = useState("apagar");

  const user = JSON.parse(localStorage.getItem("linkr-userId"));

  if (user === props.commentUserId) setAutor("autor");
  if (user === props.follow) setSeguindo("");

  return (
    <Comment>
      <div className="contentComments">
        <div className="user">
          {props.name}
          <Photo src={props.img} />
        </div>
        <div>
          <div className="top-comment">
            <div className={autor}>post's author</div>
            <div className={seguindo}>following</div>
          </div>
          <div className="comment">{props.comment}</div>
        </div>
      </div>

      <div className="divisao"></div>
    </Comment>
  );
}

const Comment = styled.div`
  width: 100%;
  padding: 4px 0;
  .contentComments {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .user {
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }
  .divisao {
    margin-top: 1.5px;
    width: 470px;
    height: 0.25px;
    background-color: black;
    opacity: 0.2;
  }
  .comment {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
  }
  .autor {
    margin-right: 20px;
  }
  .top-comment {
    display: flex;
    font-size: 12px;
  }
  .apagar {
    display: none;
  }
`;

const Photo = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 3px;

  @media (max-width: 645px) {
    width: 40px;
    height: 40px;
  }
`;
