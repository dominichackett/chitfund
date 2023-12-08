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
import { queryChitFundWithdrawals } from '../../tableland/tableland';
import { format } from 'date-fns';

const people = [
  {
    name: 'Lindsay Walton',
    datewithdrawn: 1701978822096,
    amount: '$100',
    cycle:1
  },
  {
    name: 'Lindsay Walton',
    datewithdrawn: 1701978822096,
    amount: '$100',
    cycle:1
  },
  // More people...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function EarningsList() {
 
  const { address, isConnecting, isDisconnected } = useAccount()
 const [earnings,setEarnings] = useState([])
  useEffect(()=>{
    async function getEarnings(){
          if(address)

          {
          const _earnings = await queryChitFundWithdrawals(address)
          
        setEarnings(_earnings)
      }
    }
    getEarnings()
  },[address])
  
 

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Earnings</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your earnings made.
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
                      Amount Received
                    </th>
                 
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((fund) => (
                    <tr key={fund.datewithdrawn} >
                     
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                         
                        )}
                      >
                        {format(fund.datewithdrawn,"iii do MMM yyyy")}
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
