import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "../utils/DarkMode";
import {
  MenuIcon,
  XIcon,
  ViewGridIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
//import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConnectWallet from "./ConnectWallet";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [colorScheme, setTheme] = DarkMode();
  return (
    <Popover className="relative bg-lg">
      <div className="w-full px-4 mx-auto sm:px-6">
        <div className="flex items-center justify-between pt-6 pb-4 lg:justify-evenly md:space-x-10 ">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link
              to="/"
              className="mr-1 text-base font-bold text-black sm:text-2xl"
            >
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link
                  to="/"
                  className="mr-1 text-base font-bold text-black sm:text-2xl"
                >
                  <div className="flex gap-2">
                    <img
                      className="h-20 w-30 lg:h-15"
                      src="duallogo2.png"
                      alt="dual-logo1"
                    />
                  </div>
                </Link>
              </div>
            </Link>
          </div>
          {/* Navbar(Larger screens) */}
          <Popover.Group
            as="nav"
            className="items-center justify-center hidden space-x-10 font-medium lg:flex text-ld"
          >
            <NavLink exact="true" to="/collection/create">
              Create a collection
            </NavLink>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? "text-indigo-600" : `text-ld`,
                      "group bg-transparent outline-none inline-flex items-center text-base hover:text-white-900"
                    )}
                  >
                    <div className="flex items-center">
                      Gamers
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-ld rotate-180 transform" : "text-ld",
                          "ml-1 lg:ml-2 h-4 w-4 font-bold group-hover:text-white-500 transition-all duration-200 ease-in-out"
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-20 w-full max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                      <div className="overflow-hidden rounded-sm shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 px-2 py-6 bg-white sm:gap-8">
                          <Link to="/signup">
                            <div className="text-[12px] lg:text-base text-gray-900">
                              <Popover.Button>Sign up</Popover.Button>
                            </div>
                          </Link>
                          <Link to="/gamer_challenger">
                            <div className="text-[12px] lg:text-base text-gray-900">
                              <Popover.Button>Gamers</Popover.Button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <NavLink exact="true" to="/meetingroom">
              Meeting Room
            </NavLink>
            <NavLink exact="true" to="/Streamroom">
              Stream Room
            </NavLink>
            <div
              onClick={() => setTheme(colorScheme)}
              className="cursor-pointer"
            >
              {colorScheme === "light" ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="flex items-center justify-center w-10 h-10 text-white bg-gray-700 rounded-full shadow-lg cursor-pointer dark:bg-slate-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="#fff"
                      viewBox="0 0 24 24"
                      stroke="#fff"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="flex items-center justify-center w-10 h-10 text-white bg-gray-700 rounded-full shadow-lg cursor-pointer dark:bg-slate-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="bg-yellow-200"
                      viewBox="0 0 24 24"
                      stroke="#fff"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          </Popover.Group>
          {/* Connect Button*/}
          <div className="flex items-center justify-end gap-4 md:flex-1 lg:w-0">
            {/* <ConnectButton
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              chainStatus="icon"
            /> */}

            <ConnectWallet />
          </div>
          {/*Menu Button(smaller buttons) */}
          <div className="flex items-center gap-2 -my-2 -mr-2 lg:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="w-8 h-8" aria-hidden="true" />
            </Popover.Button>
          </div>
        </div>
      </div>

      {/* Responsive Navbar for smaller phones*/}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-50 p-2 transition origin-top-right transform lg:hidden"
        >
          <div className="divide-y rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-100 dark:bg-slate-800 trans divide-gray-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="w-auto h-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Fillion"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-ld hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="px-4 py-6 space-y-6">
              <div className="flex flex-col items-start text-base font-medium gap-y-4 gap-x-8 font-metro text-ld">
                <NavLink
                  exact="true"
                  to="/collection/create"
                  className="flex items-center w-full gap-2 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <ShoppingCartIcon
                    className="w-6 h-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Create a Collection
                </NavLink>
                <NavLink
                  exact="true"
                  to="/gamer_challenger"
                  className="flex items-center w-full gap-2 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <UserGroupIcon
                    className="w-6 h-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Gamer's
                </NavLink>
                <NavLink
                  exact="true"
                  to="/meetingroom"
                  className="flex items-center w-full gap-2 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <ViewGridIcon
                    className="w-6 h-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Meeting Room
                </NavLink>
                <NavLink
                  exact="true"
                  to="/Streamroom"
                  className="flex items-center w-full gap-2 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <ViewGridIcon
                    className="w-6 h-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  Stream Room
                </NavLink>
                <div
                  onClick={() => setTheme(colorScheme)}
                  className="flex items-center w-full gap-4 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 "
                >
                  {colorScheme === "light" ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 text-white bg-gray-700 rounded-full shadow-lg cursor-pointer dark:bg-slate-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="#fff"
                          viewBox="0 0 24 24"
                          stroke="#fff"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 text-white bg-gray-700 rounded-full shadow-lg cursor-pointer dark:bg-slate-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="bg-yellow-200"
                          viewBox="0 0 24 24"
                          stroke="#fff"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
