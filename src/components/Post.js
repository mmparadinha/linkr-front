import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { SlPencil } from "react-icons/sl";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Likes from "./Likes";
import { FaRegComment } from "react-icons/fa";
import img from "../assets/Imagens Teste/teste.jpeg";
import Props_Comments from "./Props_Coments";

export default function NewPosts({
  userId,
  photo,
  username,
  comment,
  url,
  urlTitle,
  urlImage,
  urlDescription,
  postId,
}) {
  const [arrayComments, setCArrayComments] = useState([]);
  const [enviarComent, setEnviarComent] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [openComent, setOpenComent] = useState("none");
  const [newComment, setNewComment] = useState("");
  const [edit, setEdit] = useState("apagar");
  const [edit2, setEdit2] = useState("");
  const [botao, setBotao] = useState("");
  const [botaoComment, setBotaoComment] = useState("");
  const [loader, setLoader] = useState("apagar");
  const [loaderComment, setLoaderComment] = useState("apagar");
  const [modalIsOpen, setIsOpen] = useState("apagar");
  const { setHashtagName, config, userPicture, userUsername } =
    useContext(UserContext);
  const navigate = useNavigate();
  const inputEdit = useRef();
  const [clicado, setClicado] = useState(false);
  const [desativarInput, setDesativarInput] = useState(false);

  const user = JSON.parse(localStorage.getItem("linkr-userId"));

  if (user === userId) setIsUser(true);
  const arr = [1, 2, 3, 4];

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/timeline/comment/${postId}`,
        config
      )
      .then((selecione) => {
        if (selecione.rows.length === 0) {
          setCArrayComments({
            name: " ",
            comment: "",
            img: "",
            follow: "",
            commentUserId: "",
          });
        } else setCArrayComments(selecione.rows);
      });
  }, []);

  function isTagClicked(tag) {
    const hashtag = tag.replace("#", "");
    setHashtagName(hashtag);
    navigate(`/hashtag/${hashtag}`);
  }

  const handleEscape = () => {
    setEdit("apagar");
    setEdit2("");
    setClicado(false);
  };

  const handleSubmit = () => {
    setDesativarInput(true);
    enviar();
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        // 👇️ call submit function here
        handleEscape();
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (newComment !== "") {
          // 👇️ call submit function here
          handleSubmit();
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return  isUser ? (
    <Post className="posts">
      <div className={modalIsOpen}>
        <div className="fundo"></div>
        <Modal>
          <div className="text">Are you sure you want to delete this post?</div>
          <div className="butons">
            <div className="no" onClick={closeModal}>
              No, go back
            </div>
            <div className="yes" onClick={deletePost}>
              <div className={botao}>Yes, delete it</div>
              <div className={loader}>
                <ThreeDots color="#1877f2" height={60} width={60} />
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <Left>
        <Link to={`/user/${userId}`}>
          <Photo src={photo} />
        </Link>
        <Likes postId={postId} />
        <div
          className="coment-icon"
          onClick={() => {
            if (openComent === "none") setOpenComent("inherit");
            else setOpenComent("none");
          }}
        >
          <FaRegComment color="white" fontSize={20} />
          <br />
          <p>100</p> comments
        </div>
      </Left>
      <PostInfo>
        <div className="editIconsPositions">
          <Link to={`/user/${userId}`}>
            <h1>{username}</h1>
          </Link>
          <div className="container-icons">
            <div className="icon" onClick={abrirEdit}>
              <SlPencil color="white" fontSize={15} />
            </div>
            <div className="icon" onClick={abrirModal}>
              <AiTwotoneDelete color="white" fontSize={15} />
            </div>
          </div>
        </div>
        <div className={edit2}>
          <ReactTagify
            colors={"#ffffff"}
            tagClicked={(tag) => {
              isTagClicked(tag);
            }}
          >
            <h2>{comment}</h2>
          </ReactTagify>
        </div>

        <div className={edit}>
          <input
            disabled={desativarInput}
            ref={inputEdit}
            type="text"
            name="newComment"
            placeholder="edit comment"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
            required
          />
        </div>
        <a href={url} target="_blank" rel="noreferrer">
          <Linkr>
            <div>
              <h1>{urlTitle}</h1>
              <h2>{urlDescription}</h2>
              <h3>{url}</h3>
            </div>
            <img alt="" src={urlImage} />
          </Linkr>
        </a>
        <Comments apagado={openComent}>
          <h1>
            Comments:
            <div className="divisao"></div>
          </h1>
          {arrayComments.map((object, index) => (
            <Props_Comments
              key={index}
              name={object.username}
              comment={object.comment}
              img={object.pictureUrl}
              follow={object.follow}
              commentUserId={object.userId}
            />
          ))}

          <input
            type="text"
            name="Comment"
            placeholder="comment"
            onChange={(e) => {
              setEnviarComent(e.target.value);
            }}
            value={enviarComent}
            required
          />
          <div className="enviar">Enviar</div>
        </Comments>
      </PostInfo>
    </Post>
  ) : (
    <Post>
      <div></div>

      <Left>
        <Link to={`/user/${userId}`} state={{ profilePic: photo, username }}>
          <Photo src={photo} />
        </Link>
        <Likes postId={postId} />
        <div
          className="coment-icon2"
          onClick={() => {
            if (openComent === "none") setOpenComent("inherit");
            else setOpenComent("none");
          }}
        >
          <FaRegComment color="white" fontSize={20} />
          <br />
          <p>100</p> comments
        </div>
      </Left>
      <PostInfo>
        <Link to={`/user/${userId}`} state={{ profilePic: photo, username }}>
          <h1>{username}</h1>
        </Link>

        <div className={edit2}>
          <ReactTagify
            colors={"#ffffff"}
            tagClicked={(tag) => {
              isTagClicked(tag);
            }}
          >
            <h2>{comment}</h2>
          </ReactTagify>
        </div>
        <a href={url} target="_blank" rel="noreferrer">
          <Linkr>
            <div>
              <h1>{urlTitle}</h1>
              <h2>{urlDescription}</h2>
              <h3>{url}</h3>
            </div>
            <img alt="" src={urlImage} />
          </Linkr>
        </a>
        <Comments apagado={openComent}>
          <h1>
            Comments:
            <div className="divisao"></div>
          </h1>
          {arrayComments.map((object, index) => (
            <Props_Comments
              key={index}
              name={object.username}
              comment={object.comment}
              img={object.pictureUrl}
              follow={object.follow}
              commentUserId={object.userId}
            />
          ))}

          <input
            type="text"
            name="Comment"
            placeholder="comment"
            onChange={(e) => {
              setEnviarComent(e.target.value);
            }}
            value={enviarComent}
            required
          />
          <div
            className="enviar"
            onClick={() => {
              if (enviarComent !== "") enviarPostComent();
            }}
          >
            <div className={botaoComment}>Enviar</div>
            <div className={loaderComment}>
              <ThreeDots color="white" height={60} width={60} />
            </div>
          </div>
        </Comments>
      </PostInfo>
    </Post>
  );
  function abrirModal() {
    setIsOpen("container-modal");
  }
  function closeModal() {
    setIsOpen("apagar");
  }
  function deletePost() {
    setBotao("apagar");
    setLoader("");
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/timeline/post/delete/${postId}`,
        config
      )
      .then(() => {
        alert("post deletado");
        window.location.reload();
      })
      .catch((error) => {
        alert("post não pode ser deletado", error.message);
        setBotao("");
        setLoader("apagar");
        closeModal();
      });
  }
  function abrirEdit() {
    if (!clicado) {
      setDesativarInput(false);
      setEdit("edit");
      setEdit2("apagar");
      inputEdit.current.focus();
      setClicado(true);
    } else {
      setEdit("apagar");
      setEdit2("");
      setClicado(false);
    }
  }
  function enviar() {
    if (newComment !== "") {
      axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/timeline/post/edit/${postId}`,
          {
            url: url,
            comment: newComment,
          },
          config
        )
        .then(() => window.location.reload())
        .catch(() => {
          alert("não foi possível editar o post");
          setDesativarInput(false);
        });
    } else alert("campo editar está em branco");
  }
  function enviarPostComent() {
    setLoaderComment("");
    setBotaoComment("apagar");
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/timeline/post/comment/${postId}`,
        {
          userId: user,
          comment: enviarComent,
          pictureUrl: userPicture,
          username: userUsername,
        },
        config
      )
      .then(() => window.location.reload())
      .catch((error) => {
        alert("não foi possível enviar o post");
        console.log(error);
      });
  }
}

const Post = styled.div`
  width: 611px;
  display: flex;
  border-radius: 16px;
  margin-bottom: 16px;
  padding: 18px;
  background-color: #171717;
  box-sizing: border-box;

  h1 {
    width: 15px;
  }

  .editIconsPositions {
    display: flex;
    justify-content: space-between;
  }

  .icon {
    margin-top: 5px;
    margin-left: 15px;
    margin-right: 8px;
  }
  .container-icons {
    display: flex;
  }

  .container-modal {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
  }
  .fundo {
    width: 100%;
    height: 100vh;
    background-color: white;
    opacity: 0.8;
  }

  .apagar {
    display: none;
  }

  @media (max-width: 645px) {
    width: 100%;
    border-radius: 0;
    padding: 15px;
    padding-top: 9px;
  }
  .edit {
    input {
      width: 503px;
      height: 44px;

      background: #ffffff;
      border-radius: 7px;
      border: 1px solid #d5d5d5;
      background: #ffffff;
      border-radius: 5px;
      outline: none;
      padding-left: 15px;
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;

      color: #4c4c4c;
      margin-bottom: 8px;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .coment-icon {
    margin-top: 20px;
    font-size: 12px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .coment-icon2 {
    margin-top: 20px;
    font-size: 12px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Photo = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 645px) {
    width: 40px;
    height: 40px;
  }
`;

const PostInfo = styled.div`
  margin-left: 18px;

  h1 {
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 8px;
  }

  h2 {
    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 8px;
  }

  @media (max-width: 645px) {
    margin-left: 14px;
    width: 100%;
    h1 {
      font-size: 17px;
      margin-bottom: 7px;
      width: 100%;
    }
    h2 {
      font-size: 15px;
      margin-bottom: 13px;
      width: 100%;
    }
  }
`;

const Linkr = styled.div`
  display: flex;
  width: 503px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-left: 19px;
    text-align: left;

    h1 {
      width: 249.98px;
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #cecece;
      margin-bottom: 20px;
      word-break: normal;
    }

    h2 {
      width: 302.82px;
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #9b9595;
      word-break: normal;
    }

    h3 {
      font-family: "Lato", sans-serif;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      color: #cecece;
      word-break: break-all;
    }
  }

  img {
    width: 154px;
    height: 154px;
    border-radius: 0px 11px 11px 0px;
    margin-left: 26px;
    object-fit: cover;
  }

  @media (max-width: 645px) {
    width: 100%;
    padding-top: 0;
    padding-left: 11px;

    div {
      margin: 0;
      width: 100%;

      h1 {
        font-size: 11px;
        margin: 0;
        margin-bottom: 12px;
        margin-top: 7px;
        width: 100%;
      }

      h2 {
        font-size: 8px;
        margin: 0;
        margin-bottom: 4px;
        width: 100%;
      }

      h3 {
        font-size: 9px;
        margin: 0;
        width: 100%;
        margin-bottom: 4px;
      }
    }

    img {
      width: 95px;
      height: 115px;
      margin: 0;
    }
  }

  @media (max-width: 350px) {
    img {
      display: none;
    }
  }
`;

const Modal = styled.div`
  z-index: 1;
  position: fixed;

  width: 597px;
  height: 262px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #333333;
  border-radius: 50px;

  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;

  color: #ffffff;

  .text {
    width: 350px;
    height: 82px;
  }
  .butons {
    margin-top: 47px;
    display: flex;
  }
  .no {
    width: 134px;
    height: 37px;
    margin-right: 27px;

    background: #ffffff;
    border-radius: 5px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: #1877f2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yes {
    width: 134px;
    height: 37px;

    background: #ffffff;
    border-radius: 5px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: #1877f2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .apagar {
    display: none;
  }
`;

const Comments = styled.div`
  display: ${(props) => props.apagado};
  margin-top: 20px;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 8px 15px 8px 15px;
  h1 {
    color: black;
  }
  .divisao {
    margin-top: 3px;
    width: 470px;
    height: 0.25px;
    background-color: black;
  }
  input {
    margin-top: 4px;
    width: 100%;
    height: 44px;

    background: #d5d5d5;
    border-radius: 7px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    outline: none;
    padding-left: 15px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: black;
    margin-bottom: 8px;
  }
  .enviar {
    margin-top: -2px;
    width: 100%;
    height: 44px;
    background: black;
    color: #d5d5d5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
