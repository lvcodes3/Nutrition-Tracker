// dependencies //
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// context //

const NotFoundContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px);
    text-align: center;

    h1 {
        margin: 0;
        padding: 10px 0 10px 0;
    }
    h2 {
        margin: 0;
        padding: 5px 0 5px 0;
        cursor: pointer;
    }
`;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <h1>Page Not Found</h1>
            <h2 onClick={() => {
                navigate('/');
            }}>
                Go Home
            </h2>
        </NotFoundContainer>
    );
};
export default NotFound;