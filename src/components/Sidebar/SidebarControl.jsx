import { LogOut } from "lucide-react";
import { signout } from "../../lib/utils/helpers";
import { Link } from "react-router-dom";

function SidebarControl() {
  return (
    <div className="sidebar-control">
      <div className="logout-btn">
        <Link to={"/"}>
          {" "}
          <LogOut onClick={signout} />{" "}
        </Link>
      </div>
    </div>
  );
}

export default SidebarControl;
