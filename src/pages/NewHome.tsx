
import React, { useEffect } from 'react';

const NewHome: React.FC = () => {
    useEffect(() => {
        // Add a body class to apply specific overrides that counter the global React theme (index.scss)
        document.body.classList.add('new-home-body');

        // Inject the main template script to initialize sliders, AOS, etc. after DOM is ready
        const timer = setTimeout(() => {
            const scriptId = 'gennext-template-script';
            let script = document.getElementById(scriptId) as HTMLScriptElement;
            if (script) {
                script.remove(); // Re-trigger if navigating back
            }
            script = document.createElement('script');
            script.id = scriptId;
            script.src = '/assets/js/script.js';
            document.body.appendChild(script);

            // Dispatch load event to ensure the scripts that bind on window.load fire
            setTimeout(() => window.dispatchEvent(new Event('load')), 300);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.body.classList.remove('new-home-body');
        };
    }, []);

    return (
        <>
            <style>{`
                body.new-home-body {
                    background-color: white !important;
                    color: #0F0E0E !important;
                }
                body.new-home-body h1, 
                body.new-home-body h2, 
                body.new-home-body h3, 
                body.new-home-body h4, 
                body.new-home-body h5, 
                body.new-home-body h6 {
                    color: #01030B !important;
                }
                body.new-home-body .text-white,
                body.new-home-body .text-white h1,
                body.new-home-body .text-white h2,
                body.new-home-body .text-white h3,
                body.new-home-body .text-white h4,
                body.new-home-body .text-white h5,
                body.new-home-body .text-white h6,
                body.new-home-body .bgc-black h1,
                body.new-home-body .bgc-black h2,
                body.new-home-body .bgc-black h3,
                body.new-home-body .bgc-black h4,
                body.new-home-body .bgc-black h5,
                body.new-home-body .bgc-black h6,
                body.new-home-body .bgc-black a,
                body.new-home-body .bgc-black span,
                body.new-home-body .footer-area h1,
                body.new-home-body .footer-area h2,
                body.new-home-body .footer-area h3,
                body.new-home-body .footer-area h4,
                body.new-home-body .footer-area h5,
                body.new-home-body .footer-area h6,
                body.new-home-body .footer-area a {
                    color: white !important;
                }
                body.new-home-body p {
                    color: #0F0E0E;
                }
                body.new-home-body .bgc-black p,
                body.new-home-body .footer-area p {
                    color: #d4d4d4 !important;
                }
                body.new-home-body .slider-btns {
                    display: flex !important;
                    align-items: center !important;
                    gap: 30px !important;
                }
                body.new-home-body .slider-btns .theme-btn {
                    margin: 0 !important;
                }
                body.new-home-body .slider-btns .video-play-text {
                    margin: 0 !important;
                }
                body.new-home-body .event-item p,
                body.new-home-body .event-item .blog-meta li,
                body.new-home-body .event-item .blog-meta li span,
                body.new-home-body .event-item .blog-meta li i {
                    color: #5f5b5b !important;
                }
                body.new-home-body .event-item h4 {
                    color: #01030B !important;
                }
                body.new-home-body .event-item:hover p,
                body.new-home-body .event-item:hover .blog-meta li,
                body.new-home-body .event-item:hover .blog-meta li span,
                body.new-home-body .event-item:hover .blog-meta li i,
                body.new-home-body .event-item:hover h4 {
                    color: white !important;
                }
            `}</style>
            <div className="page-wrapper" dangerouslySetInnerHTML={{
                __html: `

        <!-- Preloader -->
        <div class="site-preloader" id="preloader">
            <div class="animation-preloader">
                <div class="spinner"></div>
                <div class="text-loading">
                    <span data-text-preloader="G" class="letters-loading">G</span>
                    <span data-text-preloader="E" class="letters-loading">E</span>
                    <span data-text-preloader="N" class="letters-loading">N</span>
                    <span data-text-preloader="N" class="letters-loading">N</span>
                    <span data-text-preloader="E" class="letters-loading">E</span>
                    <span data-text-preloader="X" class="letters-loading">X</span>
                    <span data-text-preloader="T" class="letters-loading">T</span>
                </div>
                <p class="loading-text">Loading</p>
            </div>
            <div class="preloader-layer layer-one">
                <div class="overly"></div>
            </div>
            <div class="preloader-layer layer-two">
                <div class="overly"></div>
            </div>
            <div class="preloader-layer layer-three">
                <div class="overly"></div>
            </div>
        </div>

        <!-- main header -->
        <header class="main-header white-menu menu-absolute">
            <!--Header-Upper-->
            <div class="header-upper">
                <div class="container-fluid clearfix">

                    <div class="header-inner rpy-5 rel d-flex align-items-center">
                        <div class="logo-outer">
                            <div class="logo"><a href="/"><img src="/assets/images/logos/logo.png" alt="Logo"
                                        title="Logo"></a></div>
                        </div>

                        <div class="nav-outer clearfix mx-lg-auto">
                            <!-- Main Menu -->
                            <nav class="main-menu navbar-expand-lg">
                                <div class="navbar-header">
                                    <div class="mobile-logo">
                                        <a href="/">
                                            <img src="/assets/images/logos/logo.png" alt="Logo" title="Logo">
                                        </a>
                                    </div>

                                    <!-- Toggle Button -->
                                    <button type="button" class="navbar-toggle" data-bs-toggle="collapse"
                                        data-bs-target=".navbar-collapse">
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>

                                <div class="navbar-collapse collapse clearfix">
                                    <ul class="navigation clearfix">
                                        <li><a href="#home">Home</a></li>
                                        <li><a href="/#about">About</a></li>
                                        <li><a href="#speakers">Speakers</a></li>
                                        <li><a href="#program">Program</a></li>
                                        <li><a href="#location">Location</a></li>
                                    </ul>
                                </div>

                            </nav>
                            <!-- Main Menu End-->
                        </div>

                        <!-- Header Number -->
                        <div class="header-number ms-lg-auto">
                            <a href="text">Generation Next - Harare March, 2026</a>
                        </div>

                        <!-- Menu Button -->
                        <div class="menu-btns py-10">
                            <a href="/registration" class="theme-btn">Register Here</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--End Header Upper-->
        </header>


        <!-- Main Slider Area Start -->
        <section id="home" class="main-slider-area bgc-black text-white rel z-1">
            <!-- Swiper -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide single-slide">
                        <img src="/assets/images/slider/slider-bg1.jpg" alt="Slider Image">
                        <div class="slider-content">
                            <div class="container container-1500">
                                <div class="slider-content-inner">
                                    <span class="subtitle">Generation Next Movement</span>
                                    <h1 class="title">Generation<br/>Next</h1>
                                    <div class="slider-btns">
                                        <a href="/registration" class="theme-btn">Register
                                            Here</a>
                                        <a href="https://youtu.be/zH2LYpje9U0?si=Goe9_8aLpl6D7rBJ"
                                            class="video-play-text" target="_blank"
                                            rel="noopener noreferrer"><span>Watch Intro Video</span></a>
                                    </div>
                                    <div class="conf-text">12-14 MARCH<br>2026</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide single-slide">
                        <img src="/assets/images/slider/slider-bg2.jpg" alt="Slider Image">
                        <div class="slider-content">
                            <div class="container container-1500">
                                <div class="slider-content-inner">
                                    <span class="subtitle">Generation Next Movement</span>
                                    <h1 class="title">Church<br/>Leadership</h1>
                                    <div class="slider-btns">
                                        <a href="/registration" class="theme-btn">Register
                                            Here</a>
                                        <a href="https://youtu.be/zH2LYpje9U0?si=Goe9_8aLpl6D7rBJ"
                                            class="video-play-text" target="_blank"
                                            rel="noopener noreferrer"><span>Watch Intro Video</span></a>
                                    </div>
                                    <div class="conf-text">GRACE CENTRE<br>HARARE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide single-slide">
                        <img src="/assets/images/slider/slider-bg3.jpg" alt="Slider Image">
                        <div class="slider-content">
                            <div class="container container-1500">
                                <div class="slider-content-inner">
                                    <span class="subtitle">Generation Next Movement</span>
                                    <h1 class="title">Prophetic<br/>Anointing</h1>
                                    <div class="slider-btns">
                                        <a href="/registration" class="theme-btn">Register
                                            Here</a>
                                        <a href="https://youtu.be/zH2LYpje9U0?si=Goe9_8aLpl6D7rBJ"
                                            class="video-play-text" target="_blank"
                                            rel="noopener noreferrer"><span>Watch Intro Video</span></a>
                                    </div>
                                    <div class="conf-text">HOST: BISHOP<br>DR. COLIN NYATHI</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide single-slide">
                        <img src="/assets/images/slider/slider-bg4.jpg" alt="Slider Image">
                        <div class="slider-content">
                            <div class="container container-1500">
                                <div class="slider-content-inner">
                                    <span class="subtitle">Generation Next Movement</span>
                                    <h1 class="title">End-time<br/>Mantles</h1>
                                    <div class="slider-btns">
                                        <a href="/registration" class="theme-btn">Register
                                            Here</a>
                                        <a href="https://youtu.be/zH2LYpje9U0?si=Goe9_8aLpl6D7rBJ"
                                            class="video-play-text" target="_blank"
                                            rel="noopener noreferrer"><span>Watch Intro Video</span></a>
                                    </div>
                                    <div class="conf-text">GUEST: BISHOP<br>MOSA SONO</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="slider-object">
                    <div class="slider-progress-wrap">
                        <span class="swiper-counter-wrap">0<span class="swiper-counter"></span></span>
                        <div class="slider-progress-bar">
                            <div id="progress"></div>
                        </div>
                        <span class="total-slide">04</span>
                    </div>
                    <div class="slider-arrows">
                        <button class="arrow-left"><i class="fas fa-chevron-left"></i></button>
                        <button class="arrow-right"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>

            </div>
        </section>
        <!-- Main Slider Area End -->


        <!-- About Us Area start -->
        <section id="about" class="about-us-area py-130 rpy-100 rel z-1">
            <div class="container rel z-2">
                <div class="row align-items-center justify-content-between">
                    <div class="col-lg-6" data-aos="fade-left" data-aos-duration="1500" data-aos-offset="50">
                        <div class="about-left-part rmb-55">
                            <div class="section-title mb-55 rmb-40">
                                <span class="subtitle mb-25 rmb-20">About the Conference</span>
                                <h2 class="title">Generation Next Movement</h2>
                            </div>
                            <div class="image mb-40">
                                <img src="/assets/images/about/about1.jpg" alt="About">
                            </div>
                            <div class="row">
                                <div class="col-xl-9 col-lg-11 col-md-9 col-sm-11">
                                    <p>Generation Next is a leadership and ministry movement focused on advancing
                                        generational continuity in the spirit of Malachi 4:6 through biblical teaching,
                                        fellowship, and practical ministry guidance.</p>
                                </div>
                                <div class="col-xl-4 col-lg-5 col-md-4 col-6 col-small">
                                    <div class="counter-item counter-text-wrap mt-20">
                                        <div class="counting-part">
                                            <span class="count-text" data-speed="3000" data-stop="3">0</span><span>
                                                Days</span>
                                        </div>
                                        <span class="counter-title">Conference Duration</span>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-lg-6 col-md-5 col-6 col-small">
                                    <div class="counter-item counter-text-wrap mt-20">
                                        <div class="counting-part">
                                            <span class="count-text" data-speed="3000"
                                                data-stop="10">0</span><span>+</span>
                                        </div>
                                        <span class="counter-title">Main Sessions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6" data-aos="fade-right" data-aos-duration="1500" data-aos-offset="50">
                        <div class="about-right-part">
                            <img src="/assets/images/about/about2.jpg" alt="About">
                            <div class="row pt-5 no-gap align-items-center">
                                <div class="col-sm-8 pt-30">
                                    <ul class="list-style-one">
                                        <li><i class="far fa-check"></i> Sound doctrine and teaching</li>
                                        <li><i class="far fa-check"></i> Spiritual formation sessions</li>
                                        <li><i class="far fa-check"></i> Leadership alignment and mentorship</li>
                                    </ul>
                                </div>
                                <div class="col-sm-4 pt-30 text-sm-end">
                                    <img src="/assets/images/about/abour-circle-text.png" alt="Circle Text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- About Us Area end -->


        <!-- Contact Info Area start -->
        <section class="contact-info-area rel z-1">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xxl-4 col-xl-5 col-lg-6" data-aos="fade-up" data-aos-duration="1500"
                        data-aos-offset="50">
                        <div class="contact-info-item rmb-30">
                            <div class="icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div class="content">
                                <h6>Venue :</h6>
                                <p>Grace Centre, Tynwald, Harare</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-4 col-xl-5 col-lg-6" data-aos="fade-up" data-aos-duration="1500"
                        data-aos-offset="50" data-aos-delay="50">
                        <div class="contact-info-item">
                            <div class="icon"><i class="fas fa-clock"></i></div>
                            <div class="content">
                                <h6>Date & Time :</h6>
                                <p>March 12-14, 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact Info Area end -->


        <!-- Counter Area start -->
        <div class="counter-area py-100 rpy-70 bgc-lighter mb-130 rmb-100 rel z-1">
            <div class="container rel z-2">
                <div class="counters-wrap">
                    <div class="counter-item counter-text-wrap" data-aos="fade-up" data-aos-duration="1500"
                        data-aos-offset="50">
                        <div class="counting-part">
                            <span class="count-text" data-speed="3000" data-stop="1000">0</span><span>+</span>
                        </div>
                        <span class="counter-title">Leaders Gathered</span>
                    </div>
                    <span class="line"></span>
                    <div class="counter-item counter-text-wrap" data-aos="fade-up" data-aos-duration="1500"
                        data-aos-offset="50" data-aos-delay="50">
                        <div class="counting-part">
                            <span class="count-text" data-speed="3000" data-stop="14">0</span><span>+</span>
                        </div>
                        <span class="counter-title">Lead Speakers</span>
                    </div>
                    <span class="line"></span>
                    <div class="counter-item counter-text-wrap" data-aos="fade-up" data-aos-duration="1500"
                        data-aos-offset="50" data-aos-delay="100">
                        <div class="counting-part">
                            <span class="count-text" data-speed="3000" data-stop="3">0</span>
                        </div>
                        <span class="counter-title">Core Days</span>
                    </div>
                    <span class="line"></span>
                    <div class="counter-item counter-text-wrap" data-aos="fade-up" data-aos-duration="1500"
                        data-aos-offset="50" data-aos-delay="150">
                        <div class="counting-part">
                            <span class="count-text" data-speed="3000" data-stop="1">0</span>
                        </div>
                        <span class="counter-title">Venue</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Counter Area end -->

        <!-- Our Event Area start -->
        <section class="our-event-area bgc-black py-130 rpy-100 rel z-1">
            <div class="container">
                <div class="row pb-30 align-items-end text-white justify-content-between">
                    <div class="col-xl-6 col-lg-7" data-aos="fade-left" data-aos-duration="1500" data-aos-offset="50">
                        <div class="section-title mb-30">
                            <span class="subtitle mb-25 rmb-20">Future Events</span>
                            <h2 class="title">Generation Next 2026 Calendar</h2>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4" data-aos="fade-right" data-aos-duration="1500" data-aos-offset="50">
                        <div class="text mb-40">
                            <p>All attendees must register online to secure their spot and access all sessions.</p>
                        </div>
                    </div>
                </div>
                <div class="event-item">
                    <div class="image">
                        <img src="/assets/images/events/event4.jpg" alt="Event">
                    </div>
                    <div class="content">
                        <ul class="blog-meta">
                            <li>
                                <i class="fal fa-calendar-alt"></i>
                                <span>12 - 14 March, 2026</span>
                            </li>
                            <li>
                                <i class="fal fa-clock"></i>
                                <span>8:30am - 10:00pm</span>
                            </li>
                            <li>
                                <i class="fal fa-map-marker-alt"></i>
                                <span>Grace Centre, Harare</span>
                            </li>
                        </ul>
                        <h4>Generation Next 4th Edition</h4>
                        <p>End-time mantles, prophetic anointing, church growth, church planting, and the top 10
                            mistakes pastors make.</p>
                        <a href="/registration" class="theme-btn">Register Now</a>
                    </div>
                </div>
                <div class="event-item">
                    <div class="image">
                        <img src="/assets/images/events/event1.jpg" alt="Event">
                    </div>
                    <div class="content">
                        <ul class="blog-meta">
                            <li>
                                <i class="fal fa-calendar-alt"></i>
                                <span>May, 2026</span>
                            </li>
                            <li>
                                <i class="fal fa-clock"></i>
                                <span>TBA</span>
                            </li>
                            <li>
                                <i class="fal fa-map-marker-alt"></i>
                                <span>Masvingo</span>
                            </li>
                        </ul>
                        <h4>Generation Next 5th Edition</h4>
                        <p>More details coming soon.</p>
                        <a href="https://www.gennextmovement.com/" class="theme-btn">Coming Soon</a>
                    </div>
                </div>
                <div class="event-item">
                    <div class="image">
                        <img src="/assets/images/events/event2.jpg" alt="Event">
                    </div>
                    <div class="content">
                        <ul class="blog-meta">
                            <li>
                                <i class="fal fa-calendar-alt"></i>
                                <span>July, 2026</span>
                            </li>
                            <li>
                                <i class="fal fa-clock"></i>
                                <span>TBA</span>
                            </li>
                            <li>
                                <i class="fal fa-map-marker-alt"></i>
                                <span>Bulawayo</span>
                            </li>
                        </ul>
                        <h4>Generation Next 6th Edition</h4>
                        <p>More details coming soon.</p>
                        <a href="https://www.gennextmovement.com/" class="theme-btn">Coming Soon</a>
                    </div>
                </div>
            </div>
        </section>
        <!-- Our Event Area end -->

        <!-- Features Area start -->
        <section class="event-bebefits-area pt-130 rpt-100 pb-85 rpb-55 rel z-1">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-8 col-lg-9 text-center" data-aos="zoom-in" data-aos-duration="1500"
                        data-aos-offset="50">
                        <div class="section-title mb-65">
                            <h2 class="title">Reasons to Attend</h2>
                            <p>Join us for impactful gatherings, powerful teachings, and divine connections.</p>
                        </div>
                    </div>
                </div>
                <div class="row gap-40 justify-content-center">
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="feature-item-three style-two" data-aos="fade-up" data-aos-duration="1500"
                            data-aos-offset="50">
                            <div class="icon"><i class="fal fa-user-md-chat"></i></div>
                            <div class="content">
                                <h5 class="title">Anointed Teaching Sessions</h5>
                                <p>Receive sound biblical teaching from trusted ministers focused on doctrine,
                                    leadership, and spiritual maturity.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="feature-item-three style-two" data-aos="fade-up" data-aos-duration="1500"
                            data-aos-offset="50" data-aos-delay="50">
                            <div class="icon"><i class="fal fa-globe"></i></div>
                            <div class="content">
                                <h5 class="title">Prophetic Prayer Encounters</h5>
                                <p>Experience focused moments of prayer, impartation, and prophetic ministry for
                                    personal and ministry activation.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="feature-item-three style-two" data-aos="fade-up" data-aos-duration="1500"
                            data-aos-offset="50" data-aos-delay="100">
                            <div class="icon"><i class="fal fa-fill-drip"></i></div>
                            <div class="content">
                                <h5 class="title">Leadership Development</h5>
                                <p>Gain practical leadership tools for church growth, team building, discipleship, and
                                    long-term ministry health.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-sm-6">
                        <div class="feature-item-three style-two" data-aos="fade-up" data-aos-duration="1500"
                            data-aos-offset="50" data-aos-delay="150">
                            <div class="icon"><i class="fal fa-calendar-alt"></i></div>
                            <div class="content">
                                <h5 class="title">Kingdom Fellowship</h5>
                                <p>Build lasting relationships with pastors, ministry leaders, and believers committed
                                    to advancing God's purpose.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Features Area end -->

        <!-- Our Mentors Area start -->
        <section id="speakers" class="our-team-area bgc-black pt-135 rpt-105 pb-25 rpb-0 rel z-1">
            <div class="container container-1600">
                <div class="row pb-30 align-items-end text-white justify-content-between">
                    <div class="col-xxl-4 col-xl-5 col-lg-6" data-aos="fade-left" data-aos-duration="1500"
                        data-aos-offset="50">
                        <div class="section-title mb-30">
                            <span class="subtitle mb-25 rmb-20">Event Speakers</span>
                            <h2 class="title">Lead Speakers</h2>
                        </div>
                    </div>
                    <div class="col-xxl-3 col-xl-4 col-lg-5" data-aos="fade-right" data-aos-duration="1500"
                        data-aos-offset="50">
                        <div class="text mb-40">
                            <p>Presiding voices bringing biblical teaching, prophetic insight, and leadership alignment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 justify-content-center">
                <div class="col">
                    <div class="team-member-item" data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="50">
                        <div class="image">
                            <img src="/assets/images/team/team-member1.png" alt="Team Member">
                        </div>
                        <div class="content">
                            <div class="social-style-one">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                            <div class="title">
                                <h4 class="name"><a href="/speaker">Bishop Dr. Colin Nyathi</a></h4>
                                <span>Founder</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="team-member-item" data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="50">
                        <div class="image">
                            <img src="/assets/images/team/team-member3.png" alt="Team Member">
                        </div>
                        <div class="content">
                            <div class="social-style-one">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                            <div class="title">
                                <h4 class="name"><a href="/speaker">Bishop Dr. Sarah Nyathi</a></h4>
                                <span>Co-Founder</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="team-member-item" data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="50">
                        <div class="image">
                            <img src="/assets/images/team/team-member5.png" alt="Team Member">
                        </div>
                        <div class="content">
                            <div class="social-style-one">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                            <div class="title">
                                <h4 class="name"><a href="/speaker">Bishop Mosa Sono</a></h4>
                                <span>Guest Speaker</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="team-member-item" data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="50">
                        <div class="image">
                            <img src="/assets/images/team/team-member7.png" alt="Team Member">
                        </div>
                        <div class="content">
                            <div class="social-style-one">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                            <div class="title">
                                <h4 class="name"><a href="/speaker">Apostle Tavonga Vutabwashe</a></h4>
                                <span>Guest Speaker</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="team-member-item">
                        <div class="image">
                            <img src="/assets/images/team/team-member9.png" alt="Team Member">
                        </div>
                        <div class="content">
                            <div class="social-style-one">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                            <div class="title">
                                <h4 class="name"><a href="/speaker">Prophetess Memory Matimbire</a></h4>
                                <span>Guest Speaker</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="team-member-item" data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="50">
                        <div class="image">
                            <img src="/assets/images/team/team-member2.png" alt="Team Member">
                        </div>
                        <div class="content">
                            <div class="social-style-one">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                            <div class="title">
                                <h4 class="name"><a href="/speaker">Apostle Batsirai Java</a></h4>
                                <span>Host</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col" data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="50">
                    <a class="circle-btn mb-100" href="/speaker"><span>View More Guests</span></a>
                </div>
            </div>
        </section>
        <!-- Our Mentors Area end -->


        <!-- Pricing Area start -->
        <section id="pricing" class="pricing-area bgp-center pt-130 rpt-100 pb-100 rpb-70"
            style="background-image: url(/assets/images/background/pricing-bg.png);">
            <div class="container">
                <div class="section-title mb-50 text-center" data-aos="zoom-in" data-aos-duration="1500"
                    data-aos-offset="50">
                    <span class="subtitle mb-10">Compulsory Registration</span>
                    <h2 class="title">All attendees must register online to secure their spot and access all sessions.
                    </h2>
                    <div class="row mt-30 justify-content-center">
                        <div class="col-xl-6 col-lg-8 col-md-10">
                            <p>Complete compulsory registration for Generation Next Harare.</p>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center justify-content-center">
                    <div class="col-lg-6 col-md-8 mb-30" data-aos="fade-right" data-aos-duration="1500"
                        data-aos-offset="50">
                        <img src="/assets/images/about/about2.jpg" alt="Pricing Image"
                            style="width: 100%; border-radius: 10px;">
                    </div>
                    <div class="col-lg-6 col-md-8" data-aos="fade-left" data-aos-duration="1500" data-aos-offset="50">
                        <div class="pricing-plan-item" style="max-width: 100%; margin: 0;">
                            <h4 class="title">General Admission</h4>
                            <div class="text">Registration package for Generation Next 2026 attendees.</div>
                            <span class="price">Free</span>
                            <ul class="list-style-two">
                                <li><i class="far fa-check"></i> Registration Compulsory</li>
                                <li><i class="far fa-check"></i> Name tags will be issued upon entry</li>
                                <li><i class="far fa-check"></i> Access all sessions</li>
                                <li><i class="far fa-check"></i> Light snacks available during lunch break</li>
                                <li><i class="far fa-check"></i> Registration Support Available</li>
                            </ul>
                            <a href="/registration"
                                class="theme-btn style-two mt-15">Register Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Pricing Area end -->


        <!-- Our Event Area start -->
        <section id="program" class="our-event-tab-area pt-110 rpt-80 pb-130 rpb-100 rel z-1">
            <div class="container">
                <div class="row pb-10 align-items-end justify-content-between">
                    <div class="col-lg-6" data-aos="fade-left" data-aos-duration="1500" data-aos-offset="50">
                        <div class="section-title mb-30">
                            <span class="subtitle mb-25 rmb-20">Conference Schedule</span>
                            <h2 class="title">Generation Next 2026 Program</h2>
                        </div>
                    </div>
                    <div class="col-lg-6 text-lg-end" data-aos="fade-right" data-aos-duration="1500"
                        data-aos-offset="50">
                        <ul class="nav tab-style-one mb-30">
                            <li><a href="#day0" data-bs-toggle="tab" class="active">Thursday, Mar 12</a></li>
                            <li><a href="#day1" data-bs-toggle="tab">Friday, Mar 13</a></li>
                            <li><a href="#day2" data-bs-toggle="tab">Saturday, Mar 14</a></li>
                        </ul>
                    </div>
                </div>

                <div class="tab-content">
                    <!-- Thursday Schedule -->
                    <div class="tab-pane fade active show" id="day0">

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event1.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 12, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>18:00 - 20:30</span></li>
                                </ul>
                                <h4>Bishop Dr. Colin Nyathi</h4>
                                <p>Generation Next Opening Session</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                    </div>

                    <!-- Friday Schedule -->
                    <div class="tab-pane fade" id="day1">

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event1.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 13, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>08:00 - 09:00</span></li>
                                </ul>
                                <h4>Prophetess Memory Matimbire</h4>
                                <p>Morning Session</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event2.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 13, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>09:00 - 11:00</span></li>
                                </ul>
                                <h4>Bishop Mosa Sono</h4>
                                <p>Mid-Morning Insights</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event3.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 13, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>11:00 - 13:00</span></li>
                                </ul>
                                <h4>Bishop Mosa Sono</h4>
                                <p>Leadership Intensive</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event1.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 13, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>14:00 - 15:00</span></li>
                                </ul>
                                <h4>Bishop Dr. Sarah Nyathi</h4>
                                <p>Afternoon Session</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event2.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 13, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>15:15 - 16:15</span></li>
                                </ul>
                                <h4>Apostle Batsirai Java</h4>
                                <p>Afternoon Session</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event3.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 13, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>17:30 - 18:00</span></li>
                                </ul>
                                <h4>Pre-Service Prayer</h4>
                                <p>Evening Preparation</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event1.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 13, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>18:00 - 20:30</span></li>
                                </ul>
                                <h4>Bishop Dr. Colin Nyathi</h4>
                                <p>Main Evening Session</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                    </div>

                    <!-- Saturday Schedule -->
                    <div class="tab-pane fade" id="day2">

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event2.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 14, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>Morning Sessions</span></li>
                                </ul>
                                <h4>Morning Power Sessions</h4>
                                <p>Featuring Doctor Innocent Maja, Ntobeko Mhlanga, and Bishop Joshua Nyava</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event3.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 14, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>Afternoon Sessions</span></li>
                                </ul>
                                <h4>Afternoon Empowerment</h4>
                                <p>Featuring Bishop Pride Sibiya, Apostle Evans Bangira, Apostle Augustine Bura, and
                                    Bishop Vukani Dhladhla</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event1.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 14, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>General Session</span></li>
                                </ul>
                                <h4>All Leaders General Question & Answer Segment</h4>
                                <p>Panel discussion and open Q&A</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                        <div class="event-item style-two">
                            <div class="image">
                                <img src="/assets/images/events/event2.jpg" alt="Event">
                            </div>
                            <div class="content">
                                <ul class="blog-meta">
                                    <li><i class="fal fa-calendar-alt"></i> <span>March 14, 2026</span></li>
                                    <li><i class="fal fa-clock"></i> <span>Closing Session</span></li>
                                </ul>
                                <h4>Bishop Dr. Colin Nyathi</h4>
                                <p>Closing Session and Impartation</p>
                                <a href="https://drive.google.com/file/d/1jC9o1R3E0aILNZHeAfGVkk5gPt2BSzSC/view?usp=sharing"
                                    target="_blank" class="theme-btn">Download Program</a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
        <!-- Our Event Area end -->

        <!-- Video Area start -->
        <div class="video-area">
            <div class="container-fluid">
                <div class="video-wrap text-center rel" data-aos="zoom-in" data-aos-duration="1500"
                    data-aos-offset="50">
                    <img src="/assets/images/video/video-bg.jpg" alt="Video">
                    <a href="https://youtu.be/zH2LYpje9U0?si=Goe9_8aLpl6D7rBJ" class="video-play" target="_blank"
                        rel="noopener noreferrer">Play</a>
                </div>
            </div>
        </div>
        <!-- Video Area end -->


        <!-- Marquee Headline Area Start -->
        <div class="marquee-headline-wrap pt-65 rpt-50">
            <span class="marquee-wrap rmb-20">
                <span class="marquee-inner left">
                    <span class="marquee-item"><span>GENERATION</span><i class="fas fa-star-of-life"></i>NEXT</span>
                </span>
                <span class="marquee-inner left">
                    <span class="marquee-item"><span>GENERATION</span><i class="fas fa-star-of-life"></i>NEXT</span>
                </span>
                <span class="marquee-inner left">
                    <span class="marquee-item"><span>GENERATION</span><i class="fas fa-star-of-life"></i>NEXT</span>
                </span>
            </span>
            <span class="marquee-wrap">
                <span class="marquee-inner right">
                    <span class="marquee-item">2026<i class="fas fa-star-of-life"></i><span>HARARE</span></span>
                </span>
                <span class="marquee-inner right">
                    <span class="marquee-item">2026<i class="fas fa-star-of-life"></i><span>HARARE</span></span>
                </span>
                <span class="marquee-inner right">
                    <span class="marquee-item">2026<i class="fas fa-star-of-life"></i><span>HARARE</span></span>
                </span>
            </span>
        </div>
        <!-- Marquee Headline Area end -->

        <!-- Event Location Area Start -->
        <section id="location" class="event-location-area pt-130 rpt-100 pb-100 rpb-70">
            <div class="container text-center">
                <div class="section-title mb-25" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                    <h2 class="title">Event Location</h2>
                </div>
                <ul class="blog-meta-two justify-content-center pb-45" data-aos="fade-up" data-aos-duration="1500"
                    data-aos-offset="50">
                    <li><i class="fal fa-map-marker-alt"></i> Grace Centre, Tynwald, Harare</li>
                    <li><i class="fal fa-clock"></i> 8.00 am - 5.00 pm</li>
                </ul>
            </div>
            <div class="container container-1600">
                <div class="venue-location" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                    <iframe
                        src="https://www.google.com/maps?q=Grace%20Centre%2C%205XH6%2BXR9%2C%20Harare&z=17&output=embed"
                        style="border:0; width: 100%; height: 450px;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div class="container">
                <div class="row features-three-wrap justify-content-center">
                    <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                        <div class="feature-item-three style-three">
                            <div class="icon"><i class="fal fa-calculator"></i></div>
                            <div class="content">
                                <h4 class="title">Single Auditorium</h4>
                                <p>The venue serves as a spiritual hub for large gatherings (Sunday and Midweek
                                    services) as well as specialized leadership and empowerment seminars</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50"
                        data-aos-delay="50">
                        <div class="feature-item-three style-three">
                            <div class="icon"><i class="fal fa-layer-group"></i></div>
                            <div class="content">
                                <h4 class="title">Sitting Arrangement</h4>
                                <p>The space is often configured for theatre-style seating and is managed to
                                    handle high-traffic events with limited-seat registration requirements.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50"
                        data-aos-delay="100">
                        <div class="feature-item-three style-three">
                            <div class="icon"><i class="fal fa-user-chart"></i></div>
                            <div class="content">
                                <h4 class="title">Presentation Facility</h4>
                                <p>The centre regularly hosts high-profile events that utilize audio-visual setups for
                                    leadership training, strategy sessions,
                                    and live impartation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Event Location Area end -->

        <!-- footer area start -->
        <footer class="main-footer bgc-black mt-160 rel z-1">
            <div class="container">
                <div class="footer-top-newsletter">
                    <div class="section-title mb-25 text-center">
                        <span class="subtitle mt-5 mb-15">Stay Connected</span>
                        <h2 class="title">Get Generation Next Updates</h2>
                    </div>
                    <form class="newsletter-form" action="#">
                        <input id="news-email" type="email" placeholder="Email Address" required>
                        <button type="submit" class="theme-btn"><span>Subscribe</span> <i
                                class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            <div class="widget-area text-white mt-120 pb-70">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 col-sm-6">
                            <div class="footer-widget widget-info">
                                <div class="logo mb-30">
                                    <a href="index.html"><img src="/assets/images/logos/logo.png" alt="Logo"></a>
                                </div>
                                <p>"...turned the heart of fathers unto sons, and the heart of sons unto their
                                    fathers..." - Malachi 4:6</p>
                                <div class="social-style-one pt-15">
                                    <a href="https://www.facebook.com/gennextoffcial"><i
                                            class="fab fa-facebook-f"></i></a>
                                    <a href="https://www.instagram.com/gennextofficial/"><i
                                            class="fab fa-instagram"></i></a>
                                    <a href="https://www.youtube.com/@gennextofficial/"><i
                                            class="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-sm-6">
                            <div class="footer-widget widget-links ps-xl-3">
                                <h4 class="footer-title text-nowrap">Contact Support</h4>
                                <ul class="list-style-three">
                                    <li><i class="fal fa-phone-volume"></i> <a href="tel:+263777612854">+263 777 612
                                            854</a>
                                    </li>
                                    <li><i class="fal fa-phone-volume"></i> <a href="tel:+263771982116">+263 771 982
                                            116</a>
                                    </li>
                                    <li><i class="fal fa-phone-volume"></i> <a href="tel:+263787963720">+263 787 963
                                            720</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4 col-sm-6">
                            <div class="footer-widget widget-gallery ps-xl-4">
                                <h4 class="footer-title">Image Gallery</h4>
                                <div class="gallery pt-5">
                                    <a href="/assets/images/widgets/gallery1.jpg">
                                        <img src="/assets/images/widgets/gallery1.jpg" alt="Gallery">
                                    </a>
                                    <a href="/assets/images/widgets/gallery2.jpg">
                                        <img src="/assets/images/widgets/gallery2.jpg" alt="Gallery">
                                    </a>
                                    <a href="/assets/images/widgets/gallery3.jpg">
                                        <img src="/assets/images/widgets/gallery3.jpg" alt="Gallery">
                                    </a>
                                    <a href="/assets/images/widgets/gallery4.jpg">
                                        <img src="/assets/images/widgets/gallery4.jpg" alt="Gallery">
                                    </a>
                                    <a href="/assets/images/widgets/gallery5.jpg">
                                        <img src="/assets/images/widgets/gallery5.jpg" alt="Gallery">
                                    </a>
                                    <a href="/assets/images/widgets/gallery6.jpg">
                                        <img src="/assets/images/widgets/gallery6.jpg" alt="Gallery">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom bgc-secondary pt-20 pb-5">
                <div class="container">
                    <div class="copyright-text text-white text-center">
                        <p>Copyright 2026 <a href="index.html">Generation Next</a>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
        <!-- footer area end -->

        <!-- Scroll Top Button -->
        <button class="scroll-top scroll-to-target" data-target="html"><i class="far fa-angle-up"></i></button>
    ` }} />
        </>
    );
};

export default NewHome;
