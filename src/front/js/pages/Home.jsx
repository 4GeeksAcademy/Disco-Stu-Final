import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Carousel } from 'react-bootstrap';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { actions } = useContext(Context)
    const [articles, setArticles] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const articles_response = await actions.getAllArticlesGroupedByGenre();
            setArticles(articles_response);
            //console.log("articles: " + JSON.stringify(articles_response));
        };

        fetchData();
    }, []);

    useEffect(() => {
        let current = 0;
        let autoUpdate = true;
        const timeTrans = 4000;

        const init = (item) => {
            const items = item.querySelectorAll("li");

            const nav = document.createElement("nav");
            nav.className = "nav_arrows";

            const prevbtn = document.createElement("button");
            prevbtn.className = "prev";
            prevbtn.setAttribute("aria-label", "Prev");

            const nextbtn = document.createElement("button");
            nextbtn.className = "next";
            nextbtn.setAttribute("aria-label", "Next");

            const counter = document.createElement("div");
            counter.className = "counter";
            counter.innerHTML = "<span>1</span><span>" + items.length + "</span>";

            if (items.length > 1) {
                nav.appendChild(prevbtn);
                nav.appendChild(counter);
                nav.appendChild(nextbtn);
                item.appendChild(nav);
            }

            items[current].className = "current";
            if (items.length > 1) items[items.length - 1].className = "prev_slide";

            const navigate = (dir) => {
                items[current].className = "";

                if (dir === "right") {
                    current = current < items.length - 1 ? current + 1 : 0;
                } else {
                    current = current > 0 ? current - 1 : items.length - 1;
                }

                const nextCurrent =
                    current < items.length - 1 ? current + 1 : 0;
                const prevCurrent = current > 0 ? current - 1 : items.length - 1;

                // Delay changing opacity and transform
                setTimeout(() => {
                    items[current].className = "current";
                    items[prevCurrent].className = "prev_slide";
                    items[nextCurrent].className = "";
                }, 50); // Adjust the delay as needed

                counter.firstChild.textContent = current + 1;
            };

            item.addEventListener("mouseenter", () => {
                autoUpdate = false;
            });

            item.addEventListener("mouseleave", () => {
                autoUpdate = true;
            });

            setInterval(() => {
                if (autoUpdate) navigate("right");
            }, timeTrans);

            prevbtn.addEventListener("click", () => {
                navigate("left");
            });

            nextbtn.addEventListener("click", () => {
                navigate("right");
            });

            document.addEventListener("keydown", (ev) => {
                const keyCode = ev.keyCode || ev.which;
                switch (keyCode) {
                    case 37:
                        navigate("left");
                        break;
                    case 39:
                        navigate("right");
                        break;
                }
            });

            item.addEventListener("touchstart", handleTouchStart, false);
            item.addEventListener("touchmove", handleTouchMove, false);
            let xDown = null;
            let yDown = null;
            const handleTouchStart = (evt) => {
                xDown = evt.touches[0].clientX;
                yDown = evt.touches[0].clientY;
            };
            const handleTouchMove = (evt) => {
                if (!xDown || !yDown) {
                    return;
                }

                const xUp = evt.touches[0].clientX;
                const yUp = evt.touches[0].clientY;

                const xDiff = xDown - xUp;
                const yDiff = yDown - yUp;

                if (Math.abs(xDiff) > Math.abs(yDiff)) {
                    if (xDiff > 0) {
                        navigate("right");
                    } else {
                        navigate("left");
                    }
                }
                xDown = null;
                yDown = null;
            };
        };

        const sliderElements = document.querySelectorAll(".cd-slider");
        sliderElements.forEach((item) => {
            init(item);
        });
    }, []);

    const createSlides = (albums) => {
        const itemsPerSlide = 5;
        const slides = [];
        for (let i = 0; i < albums.length; i += itemsPerSlide) {
            const slideAlbums = albums.slice(i, i + itemsPerSlide);
            const slide = (
                <Carousel.Item key={i}>
                    <div className="d-flex album-container">
                        {slideAlbums.map((album, albumIndex) => (
                            <div
                                key={i + albumIndex}
                                className="mr-3 album-item"
                                onClick={() => {
                                    // Handle your navigation logic here
                                    // navigate(`/article/${album.id}`);
                                    // localStorage.setItem('currentArticle', JSON.stringify(album));
                                }}
                            >
                                <div className="image-container">
                                    <div
                                        className="img-wrapper"
                                        style={{ backgroundImage: `url(${album.url_imagen})` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            );
            slides.push(slide);
        }
        return slides;
    };

    return (
        <div className="container">
            <div className="cd-slider" style={{ background: "black", height: "400px", marginTop: "20px", marginBottom: "0px" }}>
                <ul>
                    <li>
                        <div
                            className="image"
                            style={{
                                backgroundImage:
                                    "url(https://img.freepik.com/premium-photo/music-mind-music-abstract-art-created-with-generative-ai-technology_545448-15311.jpg)",
                            }}
                        ></div>
                        <div className="content">
                            <h2>
                                <font color="white">Jackets Collection 2017</font>
                            </h2>
                            <button className="btn btn-warning btn-lg">Ver Detalles</button>
                        </div>
                    </li>
                    <li>
                        <div
                            className="image"
                            style={{
                                backgroundImage:
                                    "url(https://st.depositphotos.com/1008244/3066/v/450/depositphotos_30664567-stock-illustration-vinyl-disc-with-music-notes.jpg)",
                            }}
                        ></div>
                        <div className="content">
                            <h2>
                                <font color="white">Jackets Collection 2017</font>
                            </h2>
                            <button className="btn btn-warning btn-lg">Ver Detalles</button>
                        </div>
                    </li>
                    <li>
                        <div
                            className="image"
                            style={{
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&w=1000&q=80)",
                            }}
                        ></div>
                        <div className="content">
                            <h2>
                                <font color="white">Jackets Collection 2017</font>
                            </h2>
                            <button className="btn btn-warning btn-lg">Ver Detalles</button>
                        </div>
                    </li>
                    <li>
                        <div
                            className="image"
                            style={{
                                backgroundImage:
                                    "url(https://variety.com/wp-content/uploads/2022/07/Music-Streaming-Wars.jpg)",
                            }}
                        ></div>
                        <div className="content">
                            <h2>
                                <font color="white">Jackets Collection 2017</font>
                            </h2>
                            <button className="btn btn-warning btn-lg">Ver Detalles</button>
                        </div>
                    </li>
                    <li>
                        <div
                            className="image"
                            style={{
                                backgroundImage:
                                    "url(https://c4.wallpaperflare.com/wallpaper/700/525/104/abstract-flames-music-dark-rainbows-treble-clef-gclef-black-background-1280x1024-entertainment-music-hd-art-wallpaper-preview.jpg)",
                            }}
                        ></div>
                        <div className="content">
                            <h2>
                                <font color="white">Jackets Collection 2017</font>
                            </h2>
                            <button className="btn btn-warning btn-lg">Ver Detalles</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                {Object.entries(articles).map(([genre, albums], index) => (
                    <div key={index}>
                        <h2>{genre}</h2>
                        <Carousel interval={null}>{createSlides(albums)}</Carousel>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Home;
