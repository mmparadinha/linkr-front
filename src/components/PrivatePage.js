import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivatePages() {
    const navigate = useNavigate();
    const token = localStorage.getItem('linkr-token');

    useEffect(() => {
        if (token === null) {
            alert('Ooops, something went wrong! Please, try again.');
            localStorage.clear('linkr-token');
            navigate('/');
        }
    }, []);

    return (
        <>
            {token !== null ? <Outlet/> : navigate('/')}
        </>
    );
};

export default PrivatePages;