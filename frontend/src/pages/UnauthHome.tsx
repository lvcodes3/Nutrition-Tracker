// dependencies //
import styled from 'styled-components';

const UnauthHomeContainer = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #D9D9D9;
    text-align: center;

    #unauth-header-div {
        h1 {
            margin: 0;
            padding: 10px 0 10px 0;
        }
    }

    #unauth-content-div {
        
    }
`;

const UnauthHome = () => {
    return (
        <UnauthHomeContainer>
            <div id='unauth-header-div'>
                <h1>Welcome to Nutrition Tracker!</h1>
            </div>
            <div id='unauth-content-div'>
                <p>Do you want to keep track of your meals' nutritional facts?</p>
                <p>If so, please login or create an account so you can start tracking today!</p>
            </div>
        </UnauthHomeContainer>
    );
}
export default UnauthHome;