// General importations
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

// Pages
import Home from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { RegisterForm } from "./pages/RegisterForm.jsx";
import { Login } from "./pages/Login.jsx";
import UserInbox from "./pages/UserInbox.jsx";
import UserSentMessages from "./pages/UserSentMessages.jsx";
import UserDeletedMessages from "./pages/UserDeletedMessages.jsx";
import UserComposeMessage from "./pages/UserComposeMessage.jsx";

//Components
import { Artist } from "./pages/artist";
import { BackendURL } from "./component/backendURL";
import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { GalleryTemplate } from "./pages/gallery_template";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Artist />} path="/artists" />
                        <Route element={<GalleryTemplate />} path="/gallery_template" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<RegisterForm />} path="/register" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<UserInbox />} path="/messages" />
                        <Route element={<UserSentMessages />} path="/messages/sent" />
                        <Route element={<UserDeletedMessages />} path="/messages/trash" />
                        <Route element={<UserComposeMessage />} path="/messages/compose" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
