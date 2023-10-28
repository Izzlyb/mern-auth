import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";

import { signInSuccess } from "../redux/user/userSlice";

import { app } from "../firebase";

export default function OAuth() {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {

    try {

      console.log("<<<Going for the Google Sign In>>>");

      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);
      console.log(auth);

      const result = await signInWithPopup(auth, provider);

        const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      });

      const data = await res.json();

      dispatch(signInSuccess(data));

    } catch( error ) {
      console.log("error using the google login UI.");
    }

  }

  return (
    <button type="button" 
          onClick={handleGoogleClick}
          className="bg-orange-300 text-black rounded-lg p-3 uppercase hover:opacity-95">
      Continue using the Google Login
    </button>
  );

}
