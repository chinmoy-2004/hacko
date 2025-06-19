import React from 'react';
import PropTypes from 'prop-types';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variantClasses = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/80",
    outline: "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outline', 'secondary']),
  className: PropTypes.string
};
