// dependencies //
import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: #4484CE;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>Copyright © 2023 Luis Valencia. All rights reserved.</p>
        </FooterContainer>
    );
}
export default Footer;