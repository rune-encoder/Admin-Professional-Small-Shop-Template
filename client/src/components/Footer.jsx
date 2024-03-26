import React from "react";
import footerContent from "../content/footerContent.js";

export default function Footer(props) {
  const { footerText, socialLinks } = footerContent;
  return (
    <footer>
      <div className="footer-links-group">
        {props.children}
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            title={`Visit Christian's ${link.name}`}
            data-descr={link.name}
          >
            {React.createElement(link.icon, { className: "icon" })}
          </a>
        ))}
      </div>
      <h5 className="footer-text">Footer Placeholder</h5>
    </footer>
  );
}
