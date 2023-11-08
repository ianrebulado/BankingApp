import SidebarHeader from "./SidebarHeader";
import NavList from "./NavList";
import SidebarControl from "./SidebarControl";

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
