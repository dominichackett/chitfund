/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useRef, useState } from 'react'
import { useWalletClient,useAccount } from "wagmi";
import { ethers } from 'ethers';
import { chitFundABI,chitFundAddress } from '../../contract';
import { queryChitFundPayments } from '../../tableland/tableland';
import { format } from 'date-fns';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PaymentList() {
    const { address, isConnecting, isDisconnected } = useAccount()
    const [payments,setPayments] = useState([ ])

    useEffect(()=>{
      async function getPayments(){
            if(address)
  
            {
            const _payments = await queryChitFundPayments(address)
          if(_payments.length > 0)  
          setPayments(_payments)
        }
      }
      getPayments()
    },[address])
    
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Payments</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your payments made.
          </p>
        </div>
      
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
           
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                  
                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cycle
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount Paid
                    </th>
                 
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {payments.map((fund) => (
                    <tr key={fund.datepaid} >
                     
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                         
                        )}
                      >
                       {format(fund.datepaid,"iii do MMM yyyy")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fund.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fund.cycle}</td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fund.amount}</td>
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
