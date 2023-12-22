import { Link } from "react-router-dom";

export default function NavLinks({ links, isLinkDisabled }) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.id}
          to={link.path}
          className={isLinkDisabled(link) ? "active" : ""}
        >
          {link.text}
        </Link>
      ))}
    </>
  );
}
