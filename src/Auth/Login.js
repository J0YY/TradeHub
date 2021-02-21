import React from 'react';
import "./Login.css";
import { Button } from "@material-ui/core"
import { auth, provider, firestore } from "../api/firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import Nav from "../Header/nav";

function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = async () => {
        await auth
            .signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
                if (!result.additionalUserInfo.isNewUser) {
                    alert("Welcome back, " + result.user.displayName + "!");
                }
                else {
                    const uid = result.user.uid;
                    // alert(uid);
                    let db = firestore.collection("user").doc("temp").collection(uid).doc("freestock");
                    db.set({
                        shares: 1,
                        ticker: "TRADEHUB"
                    });
                    firestore.collection("accountValue").doc(result.user.uid).set({ cash: 10000 });
                    alert("Welcome, " + result.user.displayName + "! Since you're new, we've provided you with a free $10,000 of buying power to begin your investing journey, as well as a free share of TRADEHUB stock. Enjoy your stay at TradeHub :D");
                }
                console.log(result.user);
            })
            .catch(error => alert(error.message));
    };
    return (
        <div className="login">
            <Nav />
            <div className="welcome-container">
                <div className="welcome-top-content">
                    <h1>Login</h1>
                    <h3> Don't worry, your data is not going anywhere!</h3>
                    <h3>As a platform designed to host public investment portfolios, it's essential that everyone signs in. </h3>
                </div>
                <div className="welcome-content">
                    <div className="welcome-button-div" onClick={signIn}>
                        Let's Go!
                        </div>
                </div>
            </div>

        </div>

    );
}

export default Login;