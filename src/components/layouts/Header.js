import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header text-white text-base flex items-center justify-center gap-x-10 p-5 mb-10">
      <NavLink
        to={""}
        className={({ isActive }) => (isActive ? "text-primary active" : "")}
      >
        TV Series
      </NavLink>
      <NavLink
        to={"movies"}
        className={({ isActive }) => (isActive ? "text-primary active" : "")}
      >
        Movies
      </NavLink>
    </header>
  );
}
export default Header;
