import { useMoralisCloudFunction } from 'react-moralis'
import { format } from 'date-fns';
import {  useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import ChitFundImage from "../../images/chitfund.svg";
import UserImage from "../../images/user.png"
import Notification from '../Notification/Notification';
import PaymentDialog from '../Payment/Payment';
import WidthdrawDialog from '../Withdraw/Withdraw';

import { ccipPaymentContractAddress,ccipPaymentContractABI,usdcContractAddress,usdcContractABI, chitFundAddress, chitFundABI } from '../../contract';
import { useNetwork } from 'wagmi'
import { polygonMumbai } from 'viem/chains';
import { useWalletClient,useAccount } from "wagmi";
import { ethers } from 'ethers';
import { queryChitFunds,insertChitFundPayment,insertChitFundWithdrawal } from '../../tableland/tableland';
import { useSigner } from "../../hooks/useEthersAccounts";

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }  
  export default function HomeFeed() {
    const { chain } = useNetwork()
    const { data: walletClient } = useWalletClient()
    const { address, isConnecting, isDisconnected } = useAccount()
    const signer = useSigner();
   
   const router = useRouter();
    const [chitfunds,setChitFunds] = useState([]);
    const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
    const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
    const [fund,setFund] = useState()
    
    const [amount,setAmount] = useState()
    const [participants,setParticipants] = useState()    // NOTIFICATIONS functions
    const [notificationTitle, setNotificationTitle] = useState();
    const [notificationDescription, setNotificationDescription] = useState();
    const [dialogType, setDialogType] = useState(1);
    const [show, setShow] = useState(false);
    const close = async () => {
      setShow(false);
    };

    const closeWithdrawDialog = () => {
      setOpenWithdrawDialog(false);
    }; 


    const closePaymentDialog = () => {
      setOpenPaymentDialog(false);
    };
  
    const makePayment = async (fund:any,cycle:number) => {
      if (isNaN(cycle)) {
        setDialogType(2); //Error
        setNotificationTitle("Make Payment");
        setNotificationDescription("You have not entered a cycle.");
        setShow(true);
  
        return;
      }

        if (isNaN(fund.amount)) {
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

        if ( fund.amount <= 0  ) {
        setDialogType(2); //Error
        setNotificationTitle("Make Payment");
        setNotificationDescription("You have not entered an amount.");
        setShow(true);
  
        return;
      }
      const usdcContract = new ethers.Contract(
        usdcContractAddress.get(chain.id),
        usdcContractABI,
        signer
      );
      try {


        const amount = ethers.utils.parseUnits(fund.amount.toString(), 18);
        let tx = await usdcContract.callStatic.approve(
          chain.id  == polygonMumbai.id ? chitFundAddress : ccipPaymentContractAddress.get(chain.id),
          amount
        );
  
        let tx1 = await  usdcContract.approve(
          chain.id  == polygonMumbai.id ? chitFundAddress : ccipPaymentContractAddress.get(chain.id),          amount,
          
        );
        await tx1.wait();    

           if(chain.id ==  polygonMumbai.id) // make Payment on Mumbai
           {
              const payContract = new ethers.Contract(
                chitFundAddress,
                chitFundABI,
                signer
               );

               let tx = await payContract.callStatic.makePayment(
                fund.id,cycle,
                
              );
        
              let tx1 = await payContract.makePayment(
                fund.id,cycle,
                  
              );
              await tx1.wait();    
              


           }
           else  //Make Cross Chain Payment
           {
            const payContract = new ethers.Contract(
              ccipPaymentContractAddress.get(chain.id),
              ccipPaymentContractABI,
              signer
             );

             let tx = await payContract.callStatic.sendMessage(
             address, fund.id.cycle,amount
              
            );
      
            let tx1 = await payContract.sendMessage(
              address,fund.id,cycle,amount
                
            );
            await tx1.wait();    
           


           }
           const datepaid = new Date().getTime()

           await insertChitFundPayment(address,fund.name,cycle,parseInt(fund.amount),datepaid)

           setDialogType(1); //Success
           setNotificationTitle("Make Payment");
           setNotificationDescription("Payment successfully made.");
           setShow(true); 

      }
      catch(error)
      {
        if (error.code === "TRANSACTION_REVERTED") {
          console.log("Transaction reverted");
          //let revertReason = ethers.utils.parseRevertReason(error.data);
          setNotificationDescription("Reverted");
        } else if (error.code === "ACTION_REJECTED") {
          setNotificationDescription("Transaction rejected by user");
        } else {
          console.log(error);
          //const errorMessage = ethers.utils.revert(error.reason);
          setNotificationDescription(
            `Transaction failed with error: ${error.reason}`
          );
        }
        setDialogType(2); //Error
        setNotificationTitle("Create ChitFund");
  
        setShow(true);
      }    
    
  
  }

  const makeWithdraw = async (_fund:any,cycle:number) => {
    if (isNaN(cycle)) {
      setDialogType(2); //Error
      setNotificationTitle("Withdraw");
      setNotificationDescription("You have not entered a cycle.");
      setShow(true);

      return;
    }

     

    if (cycle  <= 0) {
      setDialogType(2); //Error
      setNotificationTitle("Withdraw");
      setNotificationDescription("You have not entered a cycle.");
      setShow(true);

      return;
    }

     
    const usdcContract = new ethers.Contract(
      usdcContractAddress,
      usdcContractABI,
      signer
    );
    try {


    
            const payContract = new ethers.Contract(
              XFundAddress,
              XFundABI,
              signer
             );

             
             let tx2 = await payContract.callStatic.withdrawCycleAmount(_fund.id, cycle,
              
             
            );
      
            let tx3 = await payContract.callStatic.withdrawCycleAmount(_fund.id,cycle,
              
              
            );
            await tx3.wait();    
            const datepaid = new Date().getTime()
              await insertXFundWithdrawal(address,_fund.name,cycle,parseInt(_fund.amount),datepaid)
            setDialogType(1); //Success
            setNotificationTitle("Withdraw");
            setNotificationDescription("Payment successfully made.");
            setShow(true); 


         
      

    }
    catch(error)
    {
      if (error.code === "TRANSACTION_REVERTED") {
        console.log("Transaction reverted");
        //let revertReason = ethers.utils.parseRevertReason(error.data);
        setNotificationDescription("Reverted");
      } else if (error.code === "ACTION_REJECTED") {
        setNotificationDescription("Transaction rejected by user");
      } else {
        console.log(error);
        //const errorMessage = ethers.utils.revert(error.reason);
        setNotificationDescription(
          `Transaction failed with error: ${error.reason}`
        );
      }
      setDialogType(2); //Error
      setNotificationTitle("Wtihdraw");

      setShow(true);
    }    
  

}

  function handleClickMakePayment(_fund:any) {
    // insert logic here
    setFund(_fund);
    
    setOpenPaymentDialog(true);
  }

  
  function handleClickWidthdraw(_fund:any) {
    // insert logic here
    setFund(_fund);
    setOpenWithdrawDialog(true);
    
  }

  useEffect(()=>{
    async function getFunds(){
          if(address)

          {
          const _funds = await queryChitFunds(address)
          console.log(_funds)
          let myFunds = [];    
         _funds.forEach((_fund)=>{
          _fund.frequency =  (_fund.frequency == 7 ? "Weekly":"Monthly")
          var  _participants= _fund.participants.split('\n'); // Split text into an array of lines
          _fund.participants = _participants.length
          myFunds.push({..._fund})
          console.log(myFunds)
        })

        setChitFunds(myFunds)
      }
    }
    getFunds()
  },[address])

    return (
        <div className="px-8 mt-8">
    
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {chitfunds.map((chitfund) => (
          <li key={chitfund.id} className="p-6 relative shadow-lg rounded-lg">
            <div    className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-my-green overflow-hidden">
              <img crossorigin src={chitfund.image} alt="" className="object-cover  group-hover:opacity-75" />
             
            </div>
           
                <div className="flex items-center mt-4 ">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img crossOrigin onClick={() => router.push(`/viewprofile/${chitfund.username}`)} className="cursor-pointer ml-2 h-8 w-8 rounded-full" 
                        src={UserImage.src} alt="" />
                      </div>
                      <div className="ml-2 mr-2">
                      <div onClick={() => router.push(`/view/${chitfund.id}`)} className="cursor-pointer text-sm font-medium text-gray-900">{chitfund.name}</div>

                         </div>
                    </div>
                    <div className="ml-12 text-bold cursor-pointer mb-2  text-sm text-gray-900">
  {chitfund.owner.slice(0, 6)}.....{chitfund.owner.slice(-6)}
</div>                           <div className="cursor-pointer mb-2 ml-12 text-sm  text-gray-900"><span className='text-bold'>Participants: </span>{chitfund?.participants ? chitfund.participants:12 }</div>

                    <div className="cursor-pointer mb-2 ml-12 text-sm  text-gray-900"><span className='text-bold'>Frequency: </span>{chitfund.frequency}</div>
                    <div className="cursor-pointer mb-2 ml-12 text-sm  text-gray-900"><span className='text-bold'>Amount:</span> ${chitfund.amount}</div>
                     <div className="ml-12 text-xs text-gray-500"><span className='text-bold'>Start Date:</span> {format(chitfund.startdate,"iii do MMM yyyy")}</div>
                    <br />
                    <div> 
            <button
            type="button"
            onClick={()=> handleClickMakePayment(chitfund)}
            className="cursor-pointer w-full mb-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-my-red hover:bg-my-red-alt6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-red-light"
          >
            Make Payment
          </button>
          </div>
          <div> 
            <button
            type="button"
            onClick={()=> handleClickWidthdraw(chitfund)}
            className="cursor-pointer w-full mb-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-my-red hover:bg-my-red-alt6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-red-light"
          >
            Withdraw
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

<WidthdrawDialog
        open={openWithdrawDialog}
        setOpen={closeWithdrawDialog}
        makeWithdraw={makeWithdraw}
        fund={fund}
        
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