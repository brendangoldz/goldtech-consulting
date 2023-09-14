import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { TbBrandFiverr, TbBrandUpwork } from 'react-icons/tb';

function Footer() {
    return (
        <div className="footer">
            <div className="icons"> 
                <a href="https://www.linkedin.com/company/goldtech-consulting/" className="footer-link">
                    <FaLinkedin />
                </a>
                <a href="https://www.upwork.com/freelancers/~014de678477c7c319c" className="footer-link">
                    <TbBrandUpwork />
                </a>
                <a href="https://www.fiverr.com/naive__" className="footer-link">
                    <TbBrandFiverr />
                </a>
            </div>
            <div className="copyright"><p>GoldTech Consulting LLC, 2023 &#169;</p></div>
        </div>
    );
}

export default Footer;
