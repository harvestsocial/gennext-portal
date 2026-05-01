
import React, { useEffect } from 'react';

const NewSpeaker: React.FC = () => {
    useEffect(() => {
        document.body.classList.add('new-home-body');

        const timer = setTimeout(() => {
            const scriptId = 'gennext-template-script';
            let script = document.getElementById(scriptId) as HTMLScriptElement;
            if (script) {
                script.remove();
            }
            script = document.createElement('script');
            script.id = scriptId;
            script.src = '/assets/js/script.js';
            document.body.appendChild(script);

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
                __html: `{/* Preloader */}
        <div className="site-preloader" id="preloader">
            <div className="animation-preloader">
                <div className="spinner"></div>
                <div className="text-loading">
                    <span data-text-preloader="E" className="letters-loading">E</span>
                    <span data-text-preloader="V" className="letters-loading">V</span>
                    <span data-text-preloader="A" className="letters-loading">A</span>
                    <span data-text-preloader="T" className="letters-loading">T</span>
                    <span data-text-preloader="O" className="letters-loading">O</span>
                    <span data-text-preloader="r" className="letters-loading">r</span>
                </div>
                <p className="loading-text">Loading</p>
            </div>
            <div className="preloader-layer layer-one">
                <div className="overly"></div>
            </div>
            <div className="preloader-layer layer-two">
                <div className="overly"></div>
            </div>
            <div className="preloader-layer layer-three">
                <div className="overly"></div>
            </div>
        </div>

        {/* main header */}
        <header className="main-header white-menu menu-absolute">
            {/*Header-Upper*/}
            <div className="header-upper">
                <div className="container-fluid clearfix">

                    <div className="header-inner rpy-5 rel d-flex align-items-center">
                        <div className="logo-outer">
                            <div className="logo"><a href="/"><img src="/assets/images/logos/logo.png" alt="Logo"
                                        title="Logo" /></a></div>
                        </div>

                        <div className="nav-outer clearfix mx-lg-auto">
                            {/* Main Menu */}
                            <nav className="main-menu navbar-expand-lg">
                                <div className="navbar-header">
                                    <div className="mobile-logo">
                                        <a href="/">
                                            <img src="/assets/images/logos/logo.png" alt="Logo" title="Logo" />
                                        </a>
                                    </div>

                                    {/* Toggle Button */}
                                    <button type="button" className="navbar-toggle" data-bs-toggle="collapse"
                                        data-bs-target=".navbar-collapse">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>

                                <div className="navbar-collapse collapse clearfix">
                                    <ul className="navigation clearfix">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/#about">About</a></li>
                                        <li><a href="/#speakers">Speakers</a></li>
                                        <li><a href="/#program">Program</a></li>
                                        <li><a href="/#location">Location</a></li>
                                    </ul>
                                </div>

                            </nav>
                            {/* Main Menu End*/}
                        </div>

                        {/* Header Number */}
                        <div className="header-number ms-lg-auto">
                            <a href="text">Generation Next - Harare March, 2026</a>
                        </div>

                        {/* Menu Button */}
                        <div className="menu-btns py-10">
                            <a href="/registration" className="theme-btn">Register Here</a>
                        </div>
                    </div>
                </div>
            </div>
            {/*End Header Upper*/}
        </header>


        {/* Page Banner Start */}
        <section className="page-banner-area py-170 rpy-120 rel z-1 bgs-cover text-center"
            style="background-image: url(/assets/images/background/banner-bg.jpg);">
            <div className="container">
                <div className="banner-inner pt-90 text-white">
                    <h2 className="page-title" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">Speaker
                        Details</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center" data-aos="fade-up" data-aos-delay="200"
                            data-aos-duration="1500" data-aos-offset="50">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Speaker Details</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>
        {/* Page Banner End */}


        {/* Speaker Details Area start */}
        <section className="speakers-details-area py-125 rpy-95">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="speaker-details-image rmb-55" data-aos="fade-up" data-aos-duration="1500"
                            data-aos-offset="50">
                            <img src="/assets/images/team/team-member1.png" alt="Speaker" />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="speaker-details-content pt-10 ps-xl-5">
                            <div className="section-title mb-20" data-aos="fade-up" data-aos-duration="1500"
                                data-aos-offset="50">
                                <span className="subtitle mb-15">Founder</span>
                                <h2 className="title">Bishop Dr. Colin Nyathi</h2>
                            </div>
                            <div className="for-animation" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                                <p>Bishop Dr. Colin Nyathi is the Founder and Presiding Bishop of Harvest House
                                    International Church (HHI),
                                    established in Bulawayo, Zimbabwe, in 1995. Along with his wife,
                                    Bishop Dr. Sarah Nyathi, he has grown the ministry from a small home gathering to an
                                    international organization operating in 14 nations. He is a prominent Zimbabwean
                                    church leader,
                                    author, and speaker focused on leadership and revival.
                                </p>
                            </div>
                            <div className="social-style-three mt-30 mb-40" data-aos="fade-left" data-aos-duration="1500"
                                data-aos-offset="50">
                                <a href="https://www.facebook.com/bishopcolinyathi/"><i
                                        className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="https://www.instagram.com/bishopcolinnyathi/"><i
                                        className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-pinterest-p"></i></a>
                            </div>
                            <div className="for-animation" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                                <div className="row pt-20 pb-30 gap-50">
                                    <div className="col-md-6" data-aos="fade-up" data-aos-duration="1500"
                                        data-aos-offset="50">
                                        <div className="skillbar" data-percent="73">
                                            <span className="skillbar-title">Apostolic Leader</span>
                                            <div className="skillbar-bar"></div>
                                            <span className="skill-bar-percent"></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-up" data-aos-duration="1500"
                                        data-aos-offset="50" data-aos-delay="50">
                                        <div className="skillbar" data-percent="60">
                                            <span className="skillbar-title">Author</span>
                                            <div className="skillbar-bar"></div>
                                            <span className="skill-bar-percent"></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-up" data-aos-duration="1500"
                                        data-aos-offset="50">
                                        <div className="skillbar" data-percent="86">
                                            <span className="skillbar-title">Teacher</span>
                                            <div className="skillbar-bar"></div>
                                            <span className="skill-bar-percent"></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-up" data-aos-duration="1500"
                                        data-aos-offset="50" data-aos-delay="50">
                                        <div className="skillbar" data-percent="85">
                                            <span className="skillbar-title">Mentor</span>
                                            <div className="skillbar-bar"></div>
                                            <span className="skill-bar-percent"></span>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="title mb-30" data-aos="fade-up" data-aos-duration="1500"
                                    data-aos-offset="50">
                                    Upcoming Events</h4>
                                <div className="event-two-item style-two" data-aos="fade-up" data-aos-duration="1500"
                                    data-aos-offset="50" data-aos-delay="50">
                                    <div className="content">
                                        <span className="date"><b>16</b> Jul, 2026</span>
                                        <h4 className="title">Celebration Centre, Borrowdale, Harare</h4>
                                    </div>
                                    <a href="/registration" className="theme-btn">Register
                                        Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        {/* Speaker Details Area end */}


        {/* footer area start */}
        <footer className="main-footer bgc-black mt-160 rel z-1">
            <div className="container">
                <div className="footer-top-newsletter">
                    <div className="section-title mb-25 text-center">
                        <span className="subtitle mt-5 mb-15">Stay Connected</span>
                        <h2 className="title">Get Generation Next Updates</h2>
                    </div>
                    <form className="newsletter-form" action="#">
                        <input id="news-email" type="email" placeholder="Email Address" required />
                        <button type="submit" className="theme-btn"><span>Subscribe</span> <i
                                className="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            <div className="widget-area text-white mt-120 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="footer-widget widget-info">
                                <div className="logo mb-30">
                                    <a href="/"><img src="/assets/images/logos/logo.png" alt="Logo" /></a>
                                </div>
                                <p>“...turned the heart of fathers unto sons, and the heart of sons unto their
                                    fathers...” - Malachi 4:6</p>
                                <div className="social-style-one pt-15">
                                    <a href="https://www.facebook.com/gennextoffcial"><i
                                            className="fab fa-facebook-f"></i></a>
                                    <a href="https://www.instagram.com/gennextofficial/"><i
                                            className="fab fa-instagram"></i></a>
                                    <a href="https://www.youtube.com/@gennextofficial/"><i
                                            className="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="footer-widget widget-links ps-xl-3">
                                <h4 className="footer-title text-nowrap">Contact Support</h4>
                                <ul className="list-style-three">
                                    <li><i className="fal fa-phone-volume"></i> <a href="tel:+263777612854">+263 777 612
                                            854</a>
                                    </li>
                                    <li><i className="fal fa-phone-volume"></i> <a href="tel:+263771982116">+263 771 982
                                            116</a>
                                    </li>
                                    <li><i className="fal fa-phone-volume"></i> <a href="tel:+263787963720">+263 787 963
                                            720</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="footer-widget widget-gallery ps-xl-4">
                                <h4 className="footer-title">Image Gallery</h4>
                                <div className="gallery pt-5">
                                    <a href="/assets/images/widgets/gallery1.jpg">
                                        <img src="/assets/images/widgets/gallery1.jpg" alt="Gallery" />
                                    </a>
                                    <a href="/assets/images/widgets/gallery2.jpg">
                                        <img src="/assets/images/widgets/gallery2.jpg" alt="Gallery" />
                                    </a>
                                    <a href="/assets/images/widgets/gallery3.jpg">
                                        <img src="/assets/images/widgets/gallery3.jpg" alt="Gallery" />
                                    </a>
                                    <a href="/assets/images/widgets/gallery4.jpg">
                                        <img src="/assets/images/widgets/gallery4.jpg" alt="Gallery" />
                                    </a>
                                    <a href="/assets/images/widgets/gallery5.jpg">
                                        <img src="/assets/images/widgets/gallery5.jpg" alt="Gallery" />
                                    </a>
                                    <a href="/assets/images/widgets/gallery6.jpg">
                                        <img src="/assets/images/widgets/gallery6.jpg" alt="Gallery" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom bgc-secondary pt-20 pb-5">
                <div className="container">
                    <div className="copyright-text text-white text-center">
                        <p>Copyright 2026 <a href="/">Generation Next</a>. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
        {/* footer area end */}


        {/* Scroll Top Button */}
        <button className="scroll-top scroll-to-target" data-target="html"><i className="far fa-angle-up"></i></button>
    </div>
    `
            }} />
        </>
    );
};

export default NewSpeaker;
