// General importations
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

import { PrivateRoutes } from "./store/PrivateRoutes.jsx";

// Pages
import Home from "./pages/Home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { UserProfileEdit } from "./pages/UserProfileEdit.jsx"
import { ChangePassword } from "./pages/passChange.jsx";
import { AdminPanel } from "./pages/AdminPanel.jsx";
import { AdminInbox } from "./pages/AdminInbox.jsx"
import { Contact } from "./pages/Contact.jsx"
import { About } from "./pages/About.jsx";
import UserInbox from "./pages/UserInbox.jsx";
import UserSentMessages from "./pages/UserSentMessages.jsx";
import { UserDeletedMessages } from "./pages/UserDeletedMessages.jsx";
import { UserComposeMessage } from "./pages/UserComposeMessage.jsx";

import Explorer from './pages/Explorer.jsx'
import Article from "./pages/Article.jsx";
import ArticleDetails from "./pages/ArticleDetails.jsx";
import Offers from './pages/Offers.jsx'

//Components
import { Artist } from "./pages/artist";
import { BackendURL } from "./component/backendURL";
import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";

import { Footer } from "./component/footer";
import { GalleryTemplate } from "./pages/gallery_template";
import { AdminApprovals } from "./pages/AdminApprovals.jsx";


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
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<PrivateRoutes />}>
                            <Route element={<AdminPanel />} path="/admin-panel" />
                            <Route element={<AdminInbox />} path="/admin-inbox" />
                            <Route element={<AdminApprovals />} path="/approvals" />
                            <Route element={<UserProfile />} path="/user-profile" />
                            <Route element={<UserProfileEdit />} path="/edit-user" />
                            <Route element={<ChangePassword />} path="/update-password" />
                            <Route element={<UserInbox />} path="/messages" />
                            <Route element={<UserSentMessages />} path="/messages/sent" />
                            <Route element={<UserDeletedMessages />} path="/messages/trash" />
                            <Route element={<UserComposeMessage />} path="/messages/compose" />
                        </Route>
                        <Route element={<About />} path="/about" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<Artist />} path="/artists" />
                        <Route element={<GalleryTemplate />} path="/gallery_template" />
                        <Route element={<Article mode='edit' />} path="/articles/edit/:id" />
                        <Route element={<Article />} path="/articles/add" />
                        <Route element={<ArticleDetails />} path="/article/:id" />
                        <Route element={<Explorer />} path='/explorer' />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Offers />} path="/offers" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
