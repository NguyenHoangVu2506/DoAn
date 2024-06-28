import React, { useEffect } from 'react';
// import 'https://cdn.jsdelivr.net/npm/mdb-ui-kit@7.2.0/js/mdb.es.min.js';
import './style.css';

function HeaderTest() {
    useEffect(() => {
        const initializeMDB = () => {
            const sidebarMenu = document.getElementById('sidebarMenu');
            if (window.MDBootstrap && sidebarMenu) {
                window.MDBootstrap.initialize(sidebarMenu);
            }
        };

        initializeMDB();
    }, []);

    return (
        <>
            <header>
                <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link text-dark" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-dark" href="#">Categories</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-dark" href="#">Hot offers</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-dark" href="#">Gift boxes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-dark" href="#">Projects</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-dark" href="#">Menu item</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-dark" href="#">Menu name</a>
                                </li>

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                        Others
                                    </a>

                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <a class="dropdown-item" href="#">Action</a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#">Another action</a>
                                        </li>
                                        <li>
                                            <hr class="dropdown-divider" />
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#">Something else here</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu"
                            aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation" onClick={() => {
                                document.getElementById('sidebarMenu').classList.toggle('show');
                            }}>
                            <i className="fas fa-bars"></i>
                        </button>

                        <a className="navbar-brand" href="#">
                            <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="25" alt="" loading="lazy" />
                        </a>
                        <form class="d-none d-md-flex input-group w-auto my-auto">
                            <input autocomplete="off" type="search" class="form-control rounded"
                                placeholder='Search (ctrl + "/" to focus)' style={{ minWidth: '225px' }} />
                            <span class="input-group-text border-0"><i class="fas fa-search"></i></span>
                        </form>

                        {/*<!-- Right links -->*/}
                        <ul class="navbar-nav ms-auto d-flex flex-row">
                            {/*<!-- Notification dropdown -->*/}
                            <li class="nav-item dropdown">
                                <a class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink"
                                    role="button" data-mdb-dropdown-init aria-expanded="false">
                                    <i class="fas fa-bell"></i>
                                    <span class="badge rounded-pill badge-notification bg-danger">1</span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item" href="#">Some news</a></li>
                                    <li><a class="dropdown-item" href="#">Another news</a></li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else</a>
                                    </li>
                                </ul>
                            </li>

                            {/*<!-- Icon -->*/}
                            <li class="nav-item">
                                <a class="nav-link me-3 me-lg-0" href="#">
                                    <i class="fas fa-fill-drip"></i>
                                </a>
                            </li>
                            {/*<!-- Icon  -->*/}
                            <li class="nav-item me-3 me-lg-0">
                                <a class="nav-link" href="#">
                                    <i class="fab fa-github"></i>
                                </a>
                            </li>

                            {/*<!-- Icon dropdown -->*/}
                            <li class="nav-item dropdown">
                                <a class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow" href="#" id="navbarDropdown" role="button"
                                    data-mdb-dropdown-init aria-expanded="false">
                                    <i class="united kingdom flag m-0"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="united kingdom flag"></i>English
                                            <i class="fa fa-check text-success ms-2"></i></a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="poland flag"></i>Polski</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="china flag"></i>中文</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="japan flag"></i>日本語</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="germany flag"></i>Deutsch</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="france flag"></i>Français</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="spain flag"></i>Español</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="russia flag"></i>Русский</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"><i class="portugal flag"></i>Português</a>
                                    </li>
                                </ul>
                            </li>

                            {/*<!-- Avatar -->*/}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#"
                                    id="navbarDropdownMenuLink" role="button" data-mdb-dropdown-init aria-expanded="false">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg" class="rounded-circle" height="22"
                                        alt="" loading="lazy" />
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item" href="#">My profile</a></li>
                                    <li><a class="dropdown-item" href="#">Settings</a></li>
                                    <li><a class="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {/*<!-- Container wrapper -->*/}
                </nav>
                {/* <!-- Navbar --> */}
            </header>



        </>
    );
}
export default HeaderTest;