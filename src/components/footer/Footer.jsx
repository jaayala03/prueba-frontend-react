import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/footer.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {

  return (
    <footer className="footer">
      <div className="foot-container">
        <div className="foot-items">
          <ul>
            <li>
              <Link to="/">FAQs</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="foot-social-networks">
          <a target="_blank" href="https://instagram.com/" rel="noreferrer">
            <InstagramIcon fontSize="large" />
          </a>
          <a target="_blank" href="https://facebook.com/" rel="noreferrer">
            <FacebookIcon fontSize="large" />
          </a>
          <a target="_blank" href="https://twitter.com/" rel="noreferrer">
            <TwitterIcon fontSize="large" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;