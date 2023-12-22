import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
    const { loginWithRedirect } = useAuth0();

    async function loginUser() {
        await loginWithRedirect();
    };

    return (
        <div>
            <h1>Magic with Auth0 (Bring Your Own IdP)</h1>
            <button onClick={() => loginUser()}>login via Auth0</button>
        </div>
    );
};

export default Home;
