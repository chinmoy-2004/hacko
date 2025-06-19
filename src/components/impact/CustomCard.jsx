import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
