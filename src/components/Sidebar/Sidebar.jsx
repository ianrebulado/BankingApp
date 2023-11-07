import SidebarHeader from "./SidebarHeader";
import NavList from "./NavList";
import SidebarControl from "./SidebarControl";

function Sidebar({ isOpen, navItems }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <SidebarHeader />
      <NavList items={navItems} />
      <SidebarControl />
    </div>
  );
}

export default Sidebar;
