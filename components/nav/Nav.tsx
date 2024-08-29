'use client'

import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import PlanMenu from './PlanMenu'
import UserMenu from './UserMenu'
import { SessionProvider } from "next-auth/react"

const Nav = () => {
  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper>
          <SessionProvider>
            <div className='flex justify-between items-center'>
            <PlanMenu/>
            <UserMenu/>
            </div>
          </SessionProvider>
        </MaxWidthWrapper>
    
    </nav>
  )
}

export default Nav