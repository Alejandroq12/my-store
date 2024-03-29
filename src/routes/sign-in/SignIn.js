import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../assets/utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up/sign-up-form.component';
const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
