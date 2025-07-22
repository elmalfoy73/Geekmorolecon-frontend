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

function App() {

  const router = createBrowserRouter([
    {path: "/", element: <MainPage />},
    {path: "/signIn", element: <SignInPage />},
    {path: "/signUp", element: <SignUpPage />},
    {path: "/games", element: <GamesPage />},
  ]);

  return(
      <ChakraProvider value={defaultSystem}>
          {Header()}
                <RouterProvider router={router} />
          {Footer()}
      </ChakraProvider>
  )
}

export default App;
