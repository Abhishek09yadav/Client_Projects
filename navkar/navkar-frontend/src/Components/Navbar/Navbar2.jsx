import React from 'react';
import "./mavbar.css"

const Navbar2 = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-md">
                <a className="navbar-brand text-white" href="#">Navkar E-Store</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end gap-5" id="navbarNav">
                    <ul className="navbar-nav gap-5">
                        <li className="nav-item ">
                            <a className="nav-link text-white vb-qtn-history" aria-current="page" href="#">Quotation
                                History</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-dark rounded-3 text-white" href="#">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;