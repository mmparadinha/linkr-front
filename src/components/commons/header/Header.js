import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { useContext, useState, useRef, useEffect } from "react";
import SearchResultsBox from "./SearchResultsBox.js";
import { getSearchedUsers } from "../../../services/linkr";
import SearchContext from "../../../contexts/SearchContext.js";
import UserContext from "../../../contexts/UserContext.js";
import Logout from './HeaderLogout';

export default function Header() {
  const { userPicture, userId } = useContext(UserContext);
  const [searching, setSearching] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { setSearchResult } = useContext(SearchContext);
  const navigate = useNavigate();
  const wrapperRef1 = useRef(null);
  const wrapperRef2 = useRef(null);

  const [logout , setLogout] = useState(false);

  function useOutsideSearchBox(ref1, ref2) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          (ref1.current && !ref1.current.contains(event.target))
          &&
          (ref2.current && !ref2.current.contains(event.target))
        ) {
          setSearchBox(false);
          stopSearch();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref1, ref2]);
  }

  useOutsideSearchBox(wrapperRef1, wrapperRef2);

  function stopSearch() {
    setSearching(false);
    setSearchText('');
    setSearchResult(null);
  }

  async function getSearch(e) {
    e.preventDefault();
    setSearchText(e.target.value);
    setSearching(true);
    setSearchBox(true);
    try {
      const res = await getSearchedUsers(e.target.value);
      setSearchResult(res.data);
      setSearching(false);
    } catch (error) {
      console.error(error);
      stopSearch();
    }
  }

    return (
        <>
            <Container>
                <Title onClick={() => navigate("/timeline")}>linkr</Title>
                <SearchBox ref={wrapperRef1}>
                    <SearchBar
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="Search for people and friends"
                        disabled={searching}
                        type='text'
                        onChange={getSearch}
                        value={searchText}
                    />
                    <SearchIcon onClick={getSearch} />
                    {searchBox ? <SearchResultsBox /> : ''}
                </SearchBox>
                <AlignItems >
                    <ProfileIcon onClick={() => {setLogout(!logout)}} logout={logout}/>
                    <Photo src={userPicture} alt="profile" onClick={() => navigate(`/user/${userId}`)}/>
                </AlignItems>
            </Container>

            {logout ? <Logout setLogout={setLogout}/> : ''}

            <SearchBoxMobile ref={wrapperRef2}>
                <SearchBar
                    minLength={3}
                    debounceTimeout={300}
                    placeholder="Search for people and friends"
                    disabled={searching}
                    type='text'
                    onChange={getSearch}
                    value={searchText}
                />
                <SearchIcon onClick={getSearch} />
                {searchBox ? <SearchResultsBox /> : ''}
            </SearchBoxMobile>
        </>
    );
}

const Container = styled.div`
  width: 100%;
  height: 72px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Title = styled.h3`
  color: #ffffff;
  font-size: 49px;
  font-weight: 700;
  font-family: var(--font-linkr);
  letter-spacing: 3px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 645px) {
    font-size: 45px;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 50%;

  @media (max-width: 645px) {
    display: none;
  }
`;

const SearchBar = styled(DebounceInput)`
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 19px;
  font-weight: 400;
  color: #000000;
  font-family: var(--font-body);
  background-color: ${(props) => (props.disabled ? "#E7E7E7" : "#FFFFFF")};

  &::placeholder {
    color: #c6c6c6;
  }

  @media (max-width: 645px) {
    font-size: 17px;
  }
`;

const SearchIcon = styled(IoSearchOutline)`
  font-size: 24px;
  position: absolute;
  top: 11px;
  right: 17px;
  color: #c6c6c6;

  &:hover {
    cursor: pointer;
  }
`;

const SearchBoxMobile = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 82px auto;
  position: relative;
  z-index: 1;

  @media (min-width: 646px) {
    display: none;
  }
`;

const AlignItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  object-fit: cover;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 645px) {
    width: 41px;
    height: 41px;
  }
`;

const ProfileIcon = styled(IoChevronDownOutline)`
    color: #ffffff;
    font-size: 30px;
    margin-right: 12px;
    transform: rotate(${props => props.logout ? 180:0}deg);

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 645px) {
    font-size: 26px;
  }
`;
