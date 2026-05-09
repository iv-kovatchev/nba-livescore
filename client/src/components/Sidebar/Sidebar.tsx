import { NavLink } from "react-router-dom";
import {
  FiActivity,
  FiAward,
  FiUsers,
  FiUser,
  FiSun,
  FiMoon,
  FiChevronRight,
  FiChevronLeft,
} from "../Icons";
import "./Sidebar.scss";
import { FiTrendingUp } from "react-icons/fi";

interface SidebarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  collapsed: boolean;
  showToggle: boolean;
  onToggle: () => void;
}

const Sidebar = ({
  theme,
  toggleTheme,
  collapsed,
  showToggle,
  onToggle,
}: SidebarProps) => {
  return (
    <aside
      className={`sidebar ${showToggle && !collapsed ? "sidebar--expanded" : ""}`}
    >
      <div className="sidebar__header">
        <div
          className={`sidebar__logo ${collapsed && "sidebar__logo--collapsed"}`}
        >
          <div className="sidebar__logo-icon">N</div>
          <span className="sidebar__logo-text">
            NBA<span>LIVE</span>
          </span>
        </div>
        {showToggle && (
          <button className="sidebar__toggle" onClick={onToggle}>
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        )}
      </div>

      <nav className="sidebar__nav">
        <span
          className={`sidebar__nav-label ${collapsed && "sidebar__nav-label--collapsed"}`}
        >
          Main
        </span>
        <NavLink
          to="/games"
          className={({ isActive }) =>
            `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
          }
        >
          <FiActivity />
          {!collapsed && <span>Games</span>}
        </NavLink>
        <NavLink
          to="/standings"
          className={({ isActive }) =>
            `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
          }
        >
          <FiAward />
          {!collapsed && <span>Standings</span>}
        </NavLink>
        <NavLink
          to="/playoffs"
          className={({ isActive }) =>
            `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
          }
        >
          <FiTrendingUp />
          {!collapsed && <span>Playoffs</span>}
        </NavLink>

        <span
          className={`sidebar__nav-label ${collapsed && "sidebar__nav-label--collapsed"}`}
        >
          Teams & Players
        </span>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
          }
        >
          <FiUsers />
          {!collapsed && <span>Teams</span>}
        </NavLink>
        <NavLink
          to="/players"
          className={({ isActive }) =>
            `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
          }
        >
          <FiUser />
          {!collapsed && <span>Players</span>}
        </NavLink>
      </nav>

      <div className="sidebar__bottom">
        <button className="sidebar__theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? <FiSun /> : <FiMoon />}
          {!collapsed && (
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
