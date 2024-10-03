// Footer.js
import React from 'react';
import "../css/footer.css"
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to="/bookdetails">Book Details</Link></li>
                        <li><Link to={"/shoppingcart"}>Cart Page</Link></li>
                        <li><Link>Contack Us</Link></li>
                    </ul>
                </div>
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>© 2024 Online Book Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
