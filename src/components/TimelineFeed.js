import styled from "styled-components";
import React, { useContext } from 'react';
import NewPosts from "./Post";
import UserContext from '../contexts/UserContext';
import axios from "axios";

export default function TimelineFeed({
  config
}) {
  const { posts } = useContext(UserContext);
  
  //Guardar a página atual, começando pela página 1
  const [ loadPage, setLoadPage ] = React.useState(21);

    //charge, setCharge
    async function load() {
      console.log("Load: ", loadPage)
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/timeline?per_page=10&start=${loadPage}`, config);

        console.log("Oiiiii: ", response.data);
        setLoadPage(loadPage + 10)

      } catch (error) {
        console.error(error.response);
      }
    }

  React.useEffect(() => {
    const intersectObserver = new IntersectionObserver((posts) => {
    //se algum item estiver invisivel estiver entrando ou aparecendo
    if(posts.some((entering) => entering.isIntersecting)) {
      console.log("Estou invisivel");
      load();
      //Onde pego o loadPage em InsideState, o valor real que está dentro do state do react e soma esse valor atual com + 1
    }
  });
    //O intersectObs vai observar o final da página
    intersectObserver.observe(document.querySelector('#endOfPage'));

    //Quando trocar de página esse useEffect desconecta
    return () => intersectObserver.disconnect();
  }, []);

  if (posts === -1) {
    return (
      <h2>You don't follow anyone yet. Search for new friends!</h2>
    );
  } else if (posts.length === 0) {
    return (
      <h2>No posts found from your friends</h2>
    );
  } else {
    return (
      <>
        {posts.map((a, index) => (
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
        {/* Item que estamos monitorando, quando o JS ver, baixar os novos posts da página-sentinela*/}
        <ContainerComponent id="endOfPage"></ContainerComponent>
      </>
    );
  }
};

const ContainerComponent = styled.div`
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