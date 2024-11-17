import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const FloatingWAButton = () => {
  return (
    <Link>
     <FontAwesomeIcon icon={faWhatsapp} size="2x" />
    </Link>
  );
};
export default FloatingWAButton;
