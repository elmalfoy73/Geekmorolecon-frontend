import React, {useEffect, useState} from 'react';
import './App.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {ChakraProvider, defaultSystem, Spinner} from "@chakra-ui/react";
import {MainPage} from "./pages/MainPage";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {SignInPage} from "./pages/SignInPage";
import {SignUpPage} from "./pages/SignUpPage";
import {GamesPage} from "./pages/GamesPage";
import {receiveAndUpdateCurrentUser} from "./utils/auth/ReceiveAndUpdateCurrentUser";
import {User} from "./model/user/User";
import {AccountPage} from "./pages/AccountPage";
import {GamePage} from "./pages/GamePage";
import {GameCreationPage} from "./pages/GameCreationPage";
import {EditGamePage} from "./pages/EditGamePage";

function App() {

    let [loading, setLoading] = useState(true)
    let [currentUser, setCurrentUser] = useState<User>()
    useEffect(() => receiveAndUpdateCurrentUser(
        (user) => setCurrentUser(user),
        () => setLoading(false),
    ), []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root currentUser={currentUser}/>,
            children: [
                {index: true, element: <MainPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>},
                {path: "/signIn", element: <SignInPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>},
                {path: "/signUp", element: <SignUpPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>},
                {path: "/games", element: <GamesPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>},
                {path: "/account", element: <AccountPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>},
                {path: "/createGame", element: <GameCreationPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>},
                {path: "/game/:id", element: <GamePage currentUser={currentUser} setCurrentUser={setCurrentUser}/>,},
                {path: "/editGame/:id", element: <EditGamePage currentUser={currentUser} setCurrentUser={setCurrentUser}/>,},
            ]
        },
    ]);

    return <RouterProvider router={router}/>
}

function Root(props: { currentUser: User | undefined }) {
    return (
        <ChakraProvider value={defaultSystem}>
            {Header({currentUser: props.currentUser})}
            <main>
                <Outlet/>
            </main>
            {Footer()}
        </ChakraProvider>
    )
}

export default App;
