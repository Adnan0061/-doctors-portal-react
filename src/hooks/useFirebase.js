import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, updateProfile, getIdToken, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')
    const [ isAdmin, setIsAdmin ] = useState(false)
    const [token, setToken] = useState('')

    // const history = useHistory();
    // const location = useLocation();
    // const url = location?.state?.from || '/';

    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();


    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIdToken(user)
                .then(idToken => {
                    setToken(idToken)
                })
            } else {
                setUser({})
            }
            setIsLoading(false)
        });

        fetch(`https://ancient-stream-55775.herokuapp.com/users/${user.email}`)
        .then(res => res.json())
        .then(data => setIsAdmin(data))

    }, [auth, user.email])

    // useEffect(()=>{
        
    // },[user.email])

    // console.log(isAdmin)

    const registerUser = (email, password, name) => {
        setAuthError('');
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                saveUser(email, name, 'POST')
                updateProfile(auth.currentUser, {
                    displayName: name
                  })
                  .then(()=>{

                  }).catch((error)=>{

                  })
                setIsLoading(false)
                alert('Account successfully registered')
            })
            .catch((error) => {
                setAuthError(error.message);
            })
    }

    const LoginUser = (email, password) => {
        // setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     setAuthError('');
        // })
        // .catch((error) => {
        //     setAuthError(error.message);
        // })
        // .finally(()=>{
        //     setIsLoading(false)
        // })
    }


    const googleSignIn = (history, url) => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            setUser(result.user)
            saveUser(result.user.email, result.user.displayName, 'POST')
            history.push(url)
        }).catch((error) => {
            
        });
    }

    const logOutUser = () => {
        signOut(auth).then(() => {
            setAuthError('');
        }).catch((error) => {
            setAuthError(error.message);
        })
    }


    const saveUser = ( email, displayName, method ) => {
        const user = { email, displayName };
        fetch('https://ancient-stream-55775.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
    })
    }

    return {
        user,
        isLoading,
        setIsLoading,
        token,
        authError,
        isAdmin,
        setAuthError,
        registerUser,
        googleSignIn,
        logOutUser,
        LoginUser,
    }

}

export default useFirebase;