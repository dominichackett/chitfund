'use client'
import DashBoardNav from "../components/DashBoardNav/DashBoardNav"
import ChitFunds from "../components/ChitFunds/ChitFunds"
export default function Dashboard() {

return(<div className="relative h-screen flex overflow-hidden bg-gray-100">

<DashBoardNav ><ChitFunds /></DashBoardNav>
  
</div>)

}