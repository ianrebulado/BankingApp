import { LayoutDashboard, ArrowRightLeft, ActivitySquare } from "lucide-react"

export function getNavItems(userType){
    let navItems = []

    if (userType === 'admin'){
        navItems = [
            {label: 'Dashboard', icon: <LayoutDashboard className="nav-icon" />}, 
            {label: 'Transactions', icon: <ArrowRightLeft className="nav-icon" />}
          ]
    } else {
        navItems = [
            {label: 'Dashboard', icon: <LayoutDashboard className="nav-icon" />}, 
            {label: 'Expenses', icon: <ActivitySquare className="nav-icon" />}
          ]
    }

    
    return navItems
}