import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import AmiiboOverview from "../AmiiboOverview/AmiiboOverview";
import AmiiboDetails from "../AmiiboDetails/AmiiboDetails";
import About from "../About/About"
import Page404 from "../Page404/Page404";
import MainTemplate from "../../components/MainTemplate/MainTemplate";
import './App.css'

function App() {

    let navLinks = [
        {
            name: "Home",
            link: "/",
            icon: "bi-house",
            show: true,
            jsx: <Home/>
        },
        {
            name: "Amiibo",
            link: "/amiibo",
            icon: "bi-file-person",
            show: true,
            jsx: <AmiiboOverview/>
        },
        {
            name: "Amiibo Details",
            link: "/amiibo-details/:id",
            show: false,
            jsx: <AmiiboDetails/>
        },
        {
            name: "About",
            link: "/about",
            icon: "bi-info-square",
            show: true,
            jsx: <About/>
        },
        {
            name: "*",
            link: "*",
            show: false,
            jsx: <Page404/>
        }
    ];

    const courseDetails = {
        courseName: "Applicazioni Web: Progettazione e Sviluppo",
        courseLink: "https://elearning.unimib.it/course/info.php?id=44672#en",
    }

    return (
        <div>
            <MainTemplate
                navLinks={navLinks}
                footerCourseName={courseDetails.courseName}
                footerCourseLink={courseDetails.courseLink}>
                <Routes>
                    {
                        navLinks.map(({link, jsx}, idx) => (
                            <Route key={idx} path={link} element={jsx}/>
                        ))
                    }
                </Routes>
            </MainTemplate>
        </div>
    );
}

export default App;