import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  // Regex pattern to detect UUID
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment && !uuidRegex.test(segment)); // Exclude UUID segments

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const to = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;

    return (
      <React.Fragment key={to}>
        <Link
          to="#"
          className={`text-sm ${isLast ? "font-normal" : "capitalize"}`}
        >
          {decodeURIComponent(segment).replace(/-/g, " ")}
        </Link>
        {!isLast && <FaAngleRight  className="mx-2" />}
      </React.Fragment>
    );
  });

  return (
    <nav className="text-[##949495]  flex items-center space-x-2 bg-background  px-4 rounded-md capitalize">
      {pathSegments.length > 0 && <>{breadcrumbItems}</>}
    </nav>
  );
};

export default Breadcrumb;
