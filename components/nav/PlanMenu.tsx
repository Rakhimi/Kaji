'use client'

import React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

const PlanMenu = () => {


  return (
    <div>
    <NavigationMenu>
    <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-2xl p-4">Kaji Dulu</NavigationMenuTrigger>
      <NavigationMenuContent>
      <ul className="list-none p-0">
        <li className="my-2">
          <a href="/restaurant" className="text-xl p-4 text-sky-600 hover:text-sky-800">
            <NavigationMenuLink>Restaurant</NavigationMenuLink>
          </a>
        </li>
        <li className="my-2">
          <a href="/agriculture" className="text-xl p-4 text-sky-600 hover:text-sky-800">
            <NavigationMenuLink>Agriculture</NavigationMenuLink>
          </a>
        </li>
      </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

export default PlanMenu