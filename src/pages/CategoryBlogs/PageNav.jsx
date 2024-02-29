import React from "react";
import { Link } from "react-router-dom";

const PageNav = ({ Category, blogCategories }) => {
  return (
    <nav className="py-8">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-between text-base md:text-xl text-primary font-bold text-center">
        {blogCategories.map((category) => (
          <li
            key={category.subcategory_id}
            className="cursor-pointer bg-gray-100 hover:text-white py-4 hover:bg-primary me-1 mb-1 md:me-0 md:mb-0"
          >
            <Link to={`/category-blogs/${category.subcategory_id}/${category.subcategory_name}`}>
              {category.subcategory_name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageNav;
