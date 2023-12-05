'use client'
import DashBoardNav from "../components/DashBoardNav/DashBoardNav"
import PaymentList from "../components/PaymentList/PaymentList"
export default function Payment() {

return(<div className="relative h-screen flex overflow-hidden bg-gray-100">

<DashBoardNav ><PaymentList /></DashBoardNav>
  
</div>)

}