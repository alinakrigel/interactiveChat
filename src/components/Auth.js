import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/App.css";

const cookie = new Cookies();
export const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div className="home">
        <h1>Welcome to Lounge</h1>
        <p>to enter your personal zone :</p>
      </div>
      <p> Sign in with google to continue</p>
      <button onClick={signInWithGoogle}> Sign in with google</button>
    </div>
  );
};
