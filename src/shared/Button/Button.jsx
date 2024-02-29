import React from "react";

const Button = ({ children, className }) => {
	return <button className={`${className} text-xs`}>{children}</button>;
};

export default Button;
