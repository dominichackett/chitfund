'use client' 
import { Fragment,useState ,useEffect} from 'react'
import { Disclosure } from '@headlessui/react'
import { PhotoIcon, XMarkIcon,CurrencyDollarIcon } from '@heroicons/react/24/outline'
import ChitFundImage from "./images/chitfund.svg";
import CameraLogo from "./images/camera.png";
import PolygonIdLogo from "./images/polygonid.png"
import ChainLinkLogo from "./images/chainlinklogo.svg"
import PoweredBy from "./images/powered.png"
import Link from 'next/link'
import FeaturesList from '@/app/components/FeaturesList';

import Footer from '@/app/components/Footer/Footer'; 
const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Features', href: '#', current: true },
  
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Features() {
    return (
      <div className="min-h-full bg-white">
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                    <CurrencyDollarIcon  className="block  h-8 w-auto"/>

          
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'border-my-green text-gray-500'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center px-1 pt-1 border-b-2 font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name} 
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                   
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                   
                  </div>
                </div>
              </div>
  
              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? ' border-my-green text-my-green'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
               </Disclosure.Panel>
            </>
          )}
        </Disclosure>
  
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">Features</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                   <FeaturesList/>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    )
  }
  