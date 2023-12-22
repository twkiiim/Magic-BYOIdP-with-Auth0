import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Magic } from "magic-sdk";
import { OpenIdExtension } from "@magic-ext/oidc";

const WalletPage = () => {
    const { user, isAuthenticated, getIdTokenClaims } = useAuth0();
    const [ isAuthenticatedWeb3, setAuthenticatedWeb3 ] = useState();
    const [ didToken, setDidToken ] = useState();
    const [ magicMetadata, setMagicMetadata ] = useState();

    const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_API_KEY, {
        extensions: [new OpenIdExtension()],
    });

    useEffect(() => {
        const web3Login = async () => {
            const oidcToken = await getIdTokenClaims();
            console.log(oidcToken);


            const didToken = await magic.openid.loginWithOIDC({
                jwt: oidcToken.__raw,
                providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID,
            });
            setDidToken(didToken);

            const metadata = await magic.user.getInfo();
            setMagicMetadata(metadata);

            const isLoggedIn = await magic.user.isLoggedIn();
            setAuthenticatedWeb3(isLoggedIn);
            
            console.log({ didToken });
            console.log({ metadata });
        };

        if (isAuthenticated) {
            console.log('user is authenticated');
            web3Login();
        }
    }, [isAuthenticated]);

  return (
    isAuthenticated && (
        <div>
            <h2>Authenticated (Web 2)</h2>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>

            <br/><br/><br/><br/><br/>
            

            { !isAuthenticatedWeb3 && (
                <div>
                    <h2>Authenticating... (Web 3)</h2>
                    <p>takes a few seconds... </p>
                </div>
            )}

            { isAuthenticatedWeb3 && magicMetadata && didToken && (
                <div>
                    <h2>Authenticated (Web 3)</h2>
                    <p><strong>DID Token</strong>: {didToken} </p>
                    <p><strong>Issuer</strong>: {magicMetadata.issuer} </p>
                    <p><strong>Public Address</strong>: {magicMetadata.publicAddress} </p>
                </div>
            )}
            
        </div>
      )
  );
};

export default WalletPage;
