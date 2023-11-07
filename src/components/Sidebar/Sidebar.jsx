import SidebarHeader from "./SidebarHeader";
import NavList from "./NavList";

function Sidebar({ isOpen, navItems }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <SidebarHeader />
      <NavList items={navItems} />
    </div>
  );
}

export default Sidebar;
