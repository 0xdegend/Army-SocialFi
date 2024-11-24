/* This example requires Tailwind CSS v2.0+ */
import { Listbox, Transition } from "@headlessui/react";

import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";
interface selectProps {
  label: string;
  selected: any;
  setSelected: any;
  data: any;
  name?: string;
  height?: string;
  noBorder?: boolean;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function PrimarySelect({
  label,
  selected,
  setSelected,
  data,
  name,
  height,
  noBorder,
}: selectProps) {
  // const [selected, setSelected] = useState(people[3])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className="flex flex-col w-full">
          <Listbox.Label className="block text-sm font-medium text-white font-inconsolata">
            {label && label}
          </Listbox.Label>
          <div className="mt-1 relative w-full">
            <Listbox.Button
              className={`${
                height ? height : "h-[50px] bg-transparent"
              } relative w-full ${
                noBorder
                  ? "border-none outline-none"
                  : "border  border-secondary focus:ring-1 focus:ring-secondary focus:border-secondary shadow-sm"
              }   rounded-md  pl-3 pr-10  text-left cursor-default focus:outline-none  sm:text-sm`}
            >
              <span
                className={` ${
                  noBorder ? "text-white font-inconsolata " : "text-white"
                } block truncate capitalize`}
              >
                {selected?.name ? selected?.name : name}
              </span>
              <span className="absolute inset-y-0 my-auto right-0 flex items-center pr-2 pointer-events-none">
                <IoIosArrowDown
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 w-full bg-primary shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {data?.map((person: any, index: number) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-secondary "
                          : "text-white",
                        "cursor-default select-none relative py-2 pl-8 pr-4  border-b-secondary last:border-none"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected
                              ? "text-medium"
                              : "font-normal capitalize",
                            "block truncate"
                          )}
                        >
                          {person?.name}
                        </span>

                       
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
