/* This example requires Tailwind CSS v2.0+ */

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";


import { HiDotsVertical } from "react-icons/hi";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface optionProps {
  children: any;
  isLast?: boolean;
}
export default function Options({ children, isLast }: optionProps) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className=" rounded-full flex items-center text-gray-400 hover:text-gray-600 bg-black p-1 z-10 ">
                      <span className="sr-only">Open options</span>
                      <span className="text-white">
                          
            <HiDotsVertical />
                      </span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={` ${
              isLast ? "origin-bottom-right bottom-8" : "origin-top-right"
            }   z-50 absolute right-0 mt-2 w-[200px] rounded-[15px] shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="py-1">{children}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
