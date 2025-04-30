import { auth, db } from '../firebaseClient';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface UserCredentials {
  fullName: string;
  accountType: 'Nutritionist' | 'Client';
  email: string;
  password: string;
}

export async function registerUser({ fullName, accountType, email, password }: UserCredentials): Promise<void> {
  console.log('registerUser called with:', { fullName, accountType, email });

  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      name: fullName,
      accountType,
      email,
    };

    console.log('Saving user data to Firestore:', userData);
    await setDoc(doc(db, 'users', user.uid), userData);

    console.log('User registered successfully!');
  } catch (error: any) {
    console.error('Error in registerUser:', error.code, error.message);
    throw error;
  }
}

export async function loginUser(email: string, password: string): Promise<void> {
  console.log('loginUser called with:', { email });

  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User logged in successfully:', user.uid);
  } catch (error: any) {
    console.error('Error in loginUser:', error.code, error.message);
    throw error;
  }
}