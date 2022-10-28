import styled from "styled-components";
import { useContext } from "react";
import SearchContext from "../../../contexts/SearchContext.js";
import UserSearched from "./UserSearched";
import Loading from "../Loading.js";

export default function SearchResultBox() {
    const { searchResult } = useContext(SearchContext);


    if (!searchResult) {
        return (
            <Box>
                <Loading />
            </Box>
        );
      } else if (searchResult.length === 0) {
        return (
            <Box>
                <p>No results found for your search!</p>
            </Box>
        );
      } else {
        return (
            <Box>
                {searchResult.map((user) => <UserSearched key={user.id} data={user} />)}
            </Box>
        );
      }
}

const Box = styled.div`
    background-color: #E7E7E7;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    padding: 60px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 19px;
    font-weight: 400;
    font-family: var(--font-body);

    @media(max-width: 645px){
        font-size: 17px;
    }
`;