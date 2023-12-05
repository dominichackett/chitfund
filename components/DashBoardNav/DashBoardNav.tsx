import {  Fragment, useState,useEffect } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  BellIcon,

  CogIcon,
  PlusCircleIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  XMarkIcon,
  UserIcon,
  CalendarIcon,
  BellAlertIcon,
  FilmIcon,
  PresentationChartLineIcon,CreditCardIcon
} from '@heroicons/react/24/outline'
import {
  
  
  ChevronDownIcon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from "next/navigation";

//import UserImage from './images/user.png';
const navigation = [
  { name: 'Home', icon: HomeIcon, current: true ,href:'/dashboard'},
  { name: 'Create Chit Fund', icon: PlusCircleIcon, current: true ,href:'/createchitfund'},
  { name: 'Payment History', icon: CreditCardIcon, current: false,href:'/payments' },

  //{ name: 'Profile', icon: UserIcon, current: false,href:'/profile' },
  //{ name: 'Notifications', icon: BellAlertIcon, current: false,href:'/myevents' },

  { name: 'Earnings', icon: CurrencyDollarIcon, current: false,href:'/earnings' },
  { name: 'Credit Rating', icon: PresentationChartLineIcon, current: false,href:'/creditscore' },

]
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]
const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
]
const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
]
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashBoardNav(props:any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter();

  const [userName,setUserName] = useState("")
  
  const logoutMenu = () => {
  //logout();
  router.push("/");
 
  };

  const profileMenu = () => {
    
    router.push(`/viewprofile/${user?.get("username")}`);
   
  };

  // if(!isAuthenticated)
    //router.push("/");
/*useEffect(() => {
  //let firstname = (user?.get("firstname") ? user.get("firstname") : "");
  //let lastname = (user?.get("lastname") ? user.get("lastname") : "");
  setUserName(firstname+" "+lastname);   

}, [user])*/

  return (<Fragment> 
  <Transition.Root show={sidebarOpen} as={Fragment}>
    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
     <Transition.Child
       as={Fragment}
       enter="transition-opacity ease-linear duration-300"
       enterFrom="opacity-0"
       enterTo="opacity-100"
       leave="transition-opacity ease-linear duration-300"
       leaveFrom="opacity-100"
       leaveTo="opacity-0"
     > 
       <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
     </Transition.Child>
     <Transition.Child
       as={Fragment}
       enter="transition ease-in-out duration-300 transform"
       enterFrom="-translate-x-full"
       enterTo="translate-x-0"
       leave="transition ease-in-out duration-300 transform"
       leaveFrom="translate-x-0"
       leaveTo="-translate-x-full"
     >
       <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-my-red">
         <Transition.Child
           as={Fragment}
           enter="ease-in-out duration-300"
           enterFrom="opacity-0"
           enterTo="opacity-100"
           leave="ease-in-out duration-300"
           leaveFrom="opacity-100"
           leaveTo="opacity-0"
         >
           <div className="absolute top-0 right-0 -mr-12 pt-2">
             <button
               type="button"
               className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
               onClick={() => setSidebarOpen(false)}
             >
               <span className="sr-only">Close sidebar</span>
               <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
             </button>
           </div>
         </Transition.Child>
         <div className="flex-shrink-0 flex items-center px-4">

         <div
           className={classNames(
                               'rounded-lg inline-flex p-1 ring-4 ring-black'
           )}
         >  

       <CurrencyDollarIcon className="h-8 w-8 text-black" />
    </div>
    <div>
   <h1 className="px-4 text-2xl tracking-tight font-extrabold text-white sm:text-2xl md:text-2xl">

   ChitFund
   </h1>

  </div>
      
         </div>
         <nav className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
           <div className="px-2 space-y-1">
             {navigation.map((item) => (
               <Link
                 key={item.name}
                 href={item.href}
                 className={classNames(
                router.pathname == item.href ? 'bg-black text-white' : 'text-black hover:text-white hover:bg-black',
                   'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                 )}
                 aria-current={(router.pathname == item.href ? true :false)}
               >
                 <item.icon className="mr-4 flex-shrink-0 h-6 w-6 " aria-hidden="true" />
                 {item.name}
               </Link>
             ))}
           </div>
           <div className="mt-6 pt-6">
             <div className="px-2 space-y-1">
               {secondaryNavigation.map((item) => (
                 <a
                   key={item.name}
                   href={item.href}
                   className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-black"
                 >
                   <item.icon className="mr-4 h-6 w-6 " aria-hidden="true" />
                   {item.name}
                 </a>
               ))}
             </div>
           </div>
         </nav>
       </div>
     </Transition.Child>
     <div className="flex-shrink-0 w-14" aria-hidden="true">
       {/* Dummy element to force sidebar to shrink to fit close icon */}
     </div>
   </Dialog>
  </Transition.Root>

  {/* Static sidebar for desktop */}
   <div className="hidden lg:flex lg:flex-shrink-0">
   <div className="flex flex-col w-64">
     {/* Sidebar component, swap this element with another sidebar if you like */}
     <div className="flex flex-col flex-grow bg-my-red-alt7 pt-5 pb-4 overflow-y-auto">
  <div className="flex items-center flex-shrink-0 px-4 "  >
 
       <div
           className={classNames(
                               'rounded-lg inline-flex p-1 ring-4 ring-black'
           )}
         >  

       <CurrencyDollarIcon className="h-8 w-8 text-black" />
    </div>
    <div>
   <h1 className="px-4 text-2xl tracking-tight font-extrabold text-white sm:text-2xl md:text-2xl">

ChitFund   </h1>

  </div>
        
    </div>
       <nav className="mt-5 flex-1 flex flex-col divide-y divide-my-red-light overflow-y-auto" aria-label="Sidebar">
         <div className="px-2 space-y-1">
           {navigation.map((item) => (
             <Link
               key={item.name}
               href={item.href}
               className={classNames(
                router.pathname == item.href  ? 'bg-black text-white' : 'text-black hover:text-white hover:bg-black',
                 'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
               )}
               aria-current={(router.pathname == item.href ? true :false)}
               >
               <item.icon className="mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
               {item.name}
             </Link>
           ))}
         </div>
         <div className="mt-6 pt-6">
           <div className="px-2 space-y-1">
             {secondaryNavigation.map((item) => (
               <a
                 key={item.name}
                 href={item.href}
                 className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-black"
               >
                 <item.icon className="mr-4 h-6 w-6 " aria-hidden="true" />
                 {item.name}
               </a>
             ))}
           </div>
         </div>
       </nav>
     </div>
   </div>
 </div>

 <div className="flex-1 overflow-auto focus:outline-none">
   <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
     <button
       type="button"
       className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
       onClick={() => setSidebarOpen(true)}
     >
       <span className="sr-only">Open sidebar</span>
       <XMarkIcon className="h-6 w-6" aria-hidden="true" />
     </button>
     {/* Search bar */}
     <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
       <div className="flex-1 flex">
         <form className="w-full flex md:ml-0" action="#" method="GET">
           <label htmlFor="search-field" className="sr-only">
             Search
           </label>
           <div className="relative w-full text-gray-400 focus-within:text-gray-600">
             <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
               <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
             </div>
             <input
               id="search-field"
               name="search-field"
               className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
               placeholder="Search transactions"
               type="search"
             />
           </div>
         </form>
       </div>
       <div className="ml-4 flex items-center md:ml-6">
         <button
           type="button"
           className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
         >
           <span className="sr-only">View notifications</span>
           <BellIcon className="h-6 w-6" aria-hidden="true" />
         </button>

        <ConnectButton />
       </div>
     </div>
   </div>
    {props.children}    
 </div>
     </Fragment>
 
)
}
