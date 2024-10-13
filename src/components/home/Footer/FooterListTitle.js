import React from "react";

const FooterListTitle = ({ title }) => {
  return (
    <h3 className="text-xl font-bodyFont font-semibold mb-6 text-[#007BFF]"> {/* Changed text color */}
      {title}
    </h3>
  );
};

export default FooterListTitle;
