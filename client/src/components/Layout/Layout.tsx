import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import useTheme from "../../hooks/useTheme";
import "./Layout.scss";
import { useEffect, useState } from "react";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setCollapsed(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout">
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        collapsed={isMobile && collapsed}
        showToggle={isMobile}
        onToggle={() => setCollapsed((prev) => !prev)}
      />
      {isMobile && !collapsed && (
        <div className="layout__overlay" onClick={() => setCollapsed(true)} />
      )}
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
