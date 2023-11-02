import { LayoutDashboard, ArrowRightLeft, ActivitySquare, Wallet } from "lucide-react"

export function getNavItems(userType){
    let navItems = []

    if (userType === 'admin'){
        navItems = [
            {
                label: 'Dashboard', 
                icon: <LayoutDashboard className="nav-icon" />,
                link: '/dashboard'
            }, 
            {
                label: 'Transactions', 
                icon: <ArrowRightLeft className="nav-icon" />,
                link: '/transactions'
            }
          ]
    } else {
        navItems = [
            {
                label: 'Account', 
                icon: <Wallet className="nav-icon" />,
                link: '/account' 
            }, 
            {
                label: 'Expenses', 
                icon: <ActivitySquare className="nav-icon" />,
                link: '/expenses'
            }
          ]
    }

    
    return navItems
}