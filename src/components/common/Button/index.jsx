import React from "react";

const Button = ({ children, className, variant, size, ...rest }) => {
  const variants = {
    primary: "bg-primary-1 text-secondary-1 ",
    secondary: "bg-secondary-1 text-primary-1 ",
  };

  const sizes = {
    sm: "px-4 py-1",
    md: "px-6 py-2",
    lg: "px-12 py-4",
  };

  return (
    <button
      className={` ${className} ${variants[variant]} ${sizes[size]}  rounded-[200px]`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
