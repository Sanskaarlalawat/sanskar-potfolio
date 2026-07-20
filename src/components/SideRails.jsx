import React from "react";
import "./SideRails.css";

// Editorial side rails: thin frame lines at the edges of the centered reading
// column, with a vertical running label in each margin. Purely decorative;
// hidden on narrower screens where the margins disappear.
const SideRails = ({ left, right }) => (
  <div className="rails" aria-hidden="true">
    <span className="rail-line rail-line--l" />
    <span className="rail-line rail-line--r" />
    <span className="rail-tick rail-tick--tl" />
    <span className="rail-tick rail-tick--tr" />
    <span className="rail-tick rail-tick--bl" />
    <span className="rail-tick rail-tick--br" />
    {left && <span className="rail-text rail-text--l">{left}</span>}
    {right && <span className="rail-text rail-text--r">{right}</span>}
  </div>
);

export default SideRails;
