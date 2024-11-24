/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface OptionProps {
  children: any;
  isLast?: boolean;
}

export default function Options({ children, isLast }: OptionProps) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-full flex items-center text-gray-400 hover:text-gray-600 bg-black p-1 z-10">
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
            className={classNames(
              "absolute right-0 mt-2 w-[200px] rounded-[15px] shadow-2xl bg-primary",
              "ring-1 ring-primary ring-opacity-5 focus:outline-none z-50"
            )}
          >
            <div className="py-1 z-50">{children}</div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
