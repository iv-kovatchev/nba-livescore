import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import useTheme from '../../hooks/useTheme';
import './Layout.scss';

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
