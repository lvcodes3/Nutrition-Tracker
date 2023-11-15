// dependencies //
import { useContext } from 'react';
// context //
import { AuthContext } from '../context/AuthContext';
// pages //
import AuthHome from './AuthHome';
import UnauthHome from './UnauthHome';

const Home = () => {
    const { consumer, setConsumer } = useContext(AuthContext);

    return (
        <>
        {
            consumer.authenticated ? (
                <AuthHome />
            ) : (
                <UnauthHome />
            )
        }
        </>
    );
};
export default Home;