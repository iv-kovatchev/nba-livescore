import { NavLink } from 'react-router-dom';
import { FiActivity, FiAward, FiUsers, FiUser, FiSun, FiMoon } from '../Icons';
import './Sidebar.scss';

interface SidebarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Sidebar = ({ theme, toggleTheme }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">N</div>
        <span className="sidebar__logo-text">NBA<span>LIVE</span></span>
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__nav-label">Main</span>
        <NavLink to="/games" className={({ isActive }) => `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}>
          <FiActivity /> Games
        </NavLink>
        <NavLink to="/standings" className={({ isActive }) => `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}>
          <FiAward /> Standings
        </NavLink>

        <span className="sidebar__nav-label">Teams & Players</span>
        <NavLink to="/teams" className={({ isActive }) => `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}>
          <FiUsers /> Teams
        </NavLink>
        <NavLink to="/players" className={({ isActive }) => `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}>
          <FiUser /> Players
        </NavLink>
      </nav>

      <div className="sidebar__bottom">
        <button className="sidebar__theme-toggle" onClick={toggleTheme}>
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;