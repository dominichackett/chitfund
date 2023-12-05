import { useMoralisCloudFunction } from 'react-moralis'
import { format } from 'date-fns';
import {  useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import ChitFundImage from "../../images/chitfund.svg";
import UserImage from "../../images/user.png"
import Notification from '../Notification/Notification';
import PaymentDialog from '../Payment/Payment';
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }  
  export default function HomeFeed() {
   const router = useRouter();
    const [chitfunds,setChitFunds] = useState([{id:123,name:"My Savings",image:ChitFundImage.src,ownerImage:UserImage.src,username:"Dominic Hackett",startdate:new Date(),amount:100,frequency:"Monthly"}
    ,{id:123,name:"My Savings",image:ChitFundImage.src,ownerImage:UserImage.src,username:"Dominic Hackett",startdate:new Date(),amount:100,frequency:"Monthly"},{id:123,name:"My Savings",image:ChitFundImage.src,ownerImage:UserImage.src,username:"Dominic Hackett",startdate:new Date(),amount:100,frequency:"Monthly"},{id:123,name:"My Savings",image:ChitFundImage.src,ownerImage:UserImage.src,username:"Dominic Hackett",startdate:new Date(),amount:100,frequency:"Monthly"},{id:123,name:"My Savings",image:ChitFundImage.src,ownerImage:UserImage.src,username:"Dominic Hackett",startdate:new Date(),amount:100,frequency:"Monthly"},{id:123,name:"My Savings",image:ChitFundImage.src,ownerImage:UserImage.src,username:"Dominic Hackett",startdate:new Date(),amount:100,frequency:"Monthly"}]);
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [fund,setFund] = useState()
    const [amount,setAmount] = useState()
    // NOTIFICATIONS functions
    const [notificationTitle, setNotificationTitle] = useState();
    const [notificationDescription, setNotificationDescription] = useState();
    const [dialogType, setDialogType] = useState(1);
    const [show, setShow] = useState(false);
    const close = async () => {
      setShow(false);
    };

    const closePaymentDialog = () => {
      setOpenPaymentDialog(false);
    };
  
    const makePayment = async (fund:number,cycle:number,_amount:number) => {
      if (isNaN(cycle)) {
        setDialogType(2); //Error
        setNotificationTitle("Make Payment");
        setNotificationDescription("You have not entered a cycle.");
        setShow(true);
  
        return;
      }

        if (isNaN(_amount)) {
        setDialogType(2); //Error
        setNotificationTitle("Make Payment");
        setNotificationDescription("You have not entered an amount.");
        setShow(true);
  
        return;
      }


      if (cycle  <= 0) {
        setDialogType(2); //Error
        setNotificationTitle("Make Payment");
        setNotificationDescription("You have not entered a cycle.");
        setShow(true);
  
        return;
      }

        if ( _amount <= 0  ) {
        setDialogType(2); //Error
        setNotificationTitle("Make Payment");
        setNotificationDescription("You have not entered an amount.");
        setShow(true);
  
        return;
      }
  
  }

  function handleClick(fund:number,_amount:number) {
    // insert logic here
    setFund(fund);
    setAmount(_amount)
    setOpenPaymentDialog(true);
  }

    return (
        <div className="px-8 mt-8">
    
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {chitfunds.map((chitfund) => (
          <li key={chitfund.id} className="relative shadow-lg rounded-lg">
            <div    className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-my-green overflow-hidden">
              <img crossorigin src={chitfund.image} alt="" className="object-cover  group-hover:opacity-75" />
             
            </div>
           
                <div className="flex items-center mt-4 ">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img crossOrigin onClick={() => router.push(`/viewprofile/${chitfund.username}`)} className="cursor-pointer ml-2 h-8 w-8 rounded-full" 
                        src={chitfund.ownerImage} alt="" />
                      </div>
                      <div className="ml-2 mr-2">
                      <div onClick={() => router.push(`/view/${chitfund.id}`)} className="cursor-pointer text-sm font-medium text-gray-900">{chitfund.name}</div>

                         </div>
                    </div>
                    <div onClick={() => router.push(`/viewprofile/${chitfund.username}`)} className="cursor-pointer mb-2 ml-12 text-sm  text-gray-900">{chitfund.username}</div>
                    <div className="cursor-pointer mb-2 ml-12 text-sm  text-gray-900"><span className='text-bold'>Participants: </span>{chitfund?.participants ? chitfund.participants:12 }</div>

                    <div className="cursor-pointer mb-2 ml-12 text-sm  text-gray-900"><span className='text-bold'>Frequency: </span>{chitfund.frequency}</div>
                    <div className="cursor-pointer mb-2 ml-12 text-sm  text-gray-900"><span className='text-bold'>Amount:</span> ${chitfund.amount}</div>
                     <div className="ml-12 text-xs text-gray-500"><span className='text-bold'>Start Date:</span> {format(chitfund.startdate,"iii do MMM yyyy")}</div>
                    <br />
                    <div> 
            <button
            type="button"
            onClick={()=> handleClick(chitfund.id,chitfund.amount)}
            className="cursor-pointer ml-12  mb-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-my-red hover:bg-my-red-alt6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-red-light"
          >
            Make Payment
          </button>
          </div>
           
          </li>
        ))}
      </ul>
      <PaymentDialog
        open={openPaymentDialog}
        setOpen={closePaymentDialog}
        makePayment={makePayment}
        fund={fund}
        amount={amount}
      />
      <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />
      </div>
    )

        }