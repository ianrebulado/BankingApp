import SidebarHeader from "./SidebarHeader";
import SidebarControl from "./SidebarControl";
import NavList from "./NavList";

function Sidebar({ isOpen, navItems, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <SidebarHeader />
      <NavList items={navItems} toggleSidebar={toggleSidebar} />
      <SidebarControl />
    </div>
  );
}

export default Sidebar;
