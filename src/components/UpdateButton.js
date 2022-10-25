import styled from "styled-components";
import update from "./../assets/update.png"

export default function UpdateButton() {

    return (
        <Update>
            <h1>12 new posts, load more!</h1>
            <img alt="" src={update} />
        </Update>
    );
};

const Update = styled.div`

    width: 611px;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 17px;    

    h1 {

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;

    };

    img {
        width: 22px;
        height: 16px;
        margin-left: 14px;
    }
    
`