import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-400 to-purple-400 text-white py-8 global-font">
      {/* First Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <h2 className="font-bold text-lg">Shop Description</h2>
          <p>
            Your favorite place to shop the best items with amazing offers.
          </p>
        </div>
        <div>
          <img src="https://prd-static.sf-cdn.com/resources/images/store/2020/global/1140x1140/EMEA/UK/Gifts/1.silo-PDP-mini-square-magnets-1140x1140-uk-20200922.jpg" alt="Magnet" className="w-full" />
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>

      {/* Second Row */}
      <div className="border-t border-white mt-8 pt-4 text-center">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="/refundpolicy" className="text-white underline">
            Refund Policy
          </Link>
          <Link to="/shippinginfo" className="text-white underline">
            Shipping Info
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
