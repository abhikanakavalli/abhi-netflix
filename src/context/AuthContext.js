import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,
    signOut,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({});
    const navigation = useNavigate();

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUser(user);
        console.log('usder', user);
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('erroe', errorMessage)
             // ..
        });
    //    createUserWithEmailAndPassword(auth, email, password)
    //    .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log('user', user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log('erroe', errorMessage)
    //     // ..
    //   });
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    })
    return (
        <AuthContext.Provider 
        value={{signUp, logIn, logOut, user}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}