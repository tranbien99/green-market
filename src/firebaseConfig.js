import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCQ8mlUH4FOdBZYWWky4HLnIiO2l1-siuw",
  authDomain: "green-market-266e4.firebaseapp.com",
  projectId: "green-market-266e4",
  storageBucket: "green-market-266e4.appspot.com",
  messagingSenderId: "403620381516",
  appId: "1:403620381516:web:791dc01a6e208bd3e305e9",
  measurementId: "G-1X5TH8CQ7H"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider()

const signInWithGoogle = async () => {
	try {
		const res = await auth.signInWithPopup(googleProvider)
		const user = res.user
		const query = await db
			.collection('users')
			.where('uid', '==', user.uid)
			.get()
		if (query.docs.length === 0) {
			await db.collection('user').add({
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		alert(err.message)
	}
}

const signInWithEmailAndPassword = async (email, password) => {
	try {
		await auth.signInWithEmailAndPassword(email, password)
	} catch (err) {
		alert(err.message)
	}
}

const registerWithEmailAndPassword = async (name, email, password) => {
	try {
		const res = await auth.createUserWithEmailAndPassword(email, password)
		const user = res.user
		await db.collection('users').add({
			uid: user.uid,
			name,
			authProvider: 'local',
			email,
		})
	} catch (err) {
		alert(err.message)
	}
}

const logout = () => {
	auth.signOut()
}

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
}