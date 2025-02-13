"use client";
import Image from "next/image";
import { useState } from "react";

const SettingsPage = () => {
  // State to keep track of the selected tab
  const [activeTab, setActiveTab] = useState("accounts");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      {/* Nav */}

      <main className="">
        <div className="mx-4 min-h-screen sm:mx-8 xl:mx-auto">
          <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
          <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <div className="relative my-4 w-56 sm:hidden">
              <input
                className="peer hidden"
                type="checkbox"
                name="select-1"
                id="select-1"
              />
              <label
                htmlFor="select-1"
                className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
              >
                Settings
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                <li
                  onClick={() => handleTabClick("theme")}
                  className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
                >
                  Theme
                </li>
                <li
                  onClick={() => handleTabClick("accounts")}
                  className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
                >
                  Accounts
                </li>

                <li
                  onClick={() => handleTabClick("notifications")}
                  className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
                >
                  Notifications
                </li>
              </ul>
            </div>

            <div className="col-span-2 hidden sm:block">
              <ul>
                <li
                  onClick={() => handleTabClick("theme")}
                  className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
                    activeTab === "theme"
                      ? "border-l-blue-700 text-blue-700"
                      : "border-transparent"
                  }`}
                >
                  Theme
                </li>
                <li
                  onClick={() => handleTabClick("accounts")}
                  className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
                    activeTab === "accounts"
                      ? "border-l-blue-700 text-blue-700"
                      : "border-transparent"
                  }`}
                >
                  Accounts
                </li>

                <li
                  onClick={() => handleTabClick("notifications")}
                  className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${
                    activeTab === "notifications"
                      ? "border-l-blue-700 text-blue-700"
                      : "border-transparent"
                  }`}
                >
                  Notifications
                </li>
              </ul>
            </div>

            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
              {activeTab === "accounts" && (
                <div className="pt-4">
                  <h1 className="py-2 text-2xl font-semibold">
                    Account settings
                  </h1>
                  <p className="font- text-slate-600">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <hr className="mt-4 mb-8" />
                  <p className="py-2 text-xl font-semibold">Email Address</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-gray-600">
                      Your email address is{" "}
                      <strong>john.doe@company.com</strong>
                    </p>
                    <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">
                      Change
                    </button>
                  </div>
                  <hr className="mt-4 mb-8" />
                  <p className="py-2 text-xl font-semibold">Password</p>
                  <div className="flex items-center">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                      <label htmlFor="login-password">
                        <span className="text-sm text-gray-500">
                          Current Password
                        </span>
                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                          <input
                            type="password"
                            id="login-password"
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                          />
                        </div>
                      </label>
                      <label htmlFor="login-password-new">
                        <span className="text-sm text-gray-500">
                          New Password
                        </span>
                        <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                          <input
                            type="password"
                            id="login-password-new"
                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                            placeholder="***********"
                          />
                        </div>
                      </label>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </div>
                  <p className="mt-2">
                    Can't remember your current password.{" "}
                    <a
                      className="text-sm font-semibold text-blue-600 underline decoration-2"
                      href="#"
                    >
                      Recover Account
                    </a>
                  </p>
                  <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
                    Save Password
                  </button>
                  <hr className="mt-4 mb-8" />

                  <div className="mb-10">
                    <p className="py-2 text-xl font-semibold">Delete Account</p>
                    <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Proceed with caution
                    </p>
                    <p className="mt-2">
                      Make sure you have taken backup of your account in case
                      you ever need to get access to your data. We will
                      completely wipe your data. There is no way to access your
                      account after this action.
                    </p>
                    <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
                      Continue with deletion
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "theme" && (
                <div className="pt-4">
                  <h1 className="py-2 text-2xl font-semibold">
                    Theme Settings
                  </h1>
                  <p className="font text-slate-600">
                    Customize the appearance of your application to suit your
                    preferences.
                  </p>
                  <hr className="mt-4 mb-8" />

                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between py-4 px-6 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-xl font-semibold">Theme</p>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-4">Light</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only" />
                        <div className="w-11 h-6 bg-gray-300 rounded-full"></div>
                        <div className="absolute w-6 h-6 bg-blue-600 rounded-full transition-transform transform translate-x-0"></div>
                      </label>
                      <span className="text-gray-600 ml-4">Dark</span>
                    </div>
                  </div>

                  <hr className="mt-4 mb-8" />

                  {/* Custom Theme Colors */}
                  <div className="py-4 px-6 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-xl font-semibold">Custom Colors</p>
                    <p className="text-gray-600 mb-4">
                      Select your preferred colors for various elements of the
                      application.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-col space-y-4">
                        <label className="flex items-center">
                          <span className="w-32 text-gray-600">
                            Primary Color
                          </span>
                          <input
                            type="color"
                            className="ml-4 w-16 h-8 border-0 rounded-md cursor-pointer "
                          />
                        </label>
                        <label className="flex items-center">
                          <span className="w-32 text-gray-600">
                            Secondary Color
                          </span>
                          <input
                            type="color"
                            className="ml-4 w-16 h-8 border-0 rounded-md  cursor-pointer"
                          />
                        </label>
                        <label className="flex items-center">
                          <span className="w-32 text-gray-600">
                            Accent Color
                          </span>
                          <input
                            type="color"
                            className="ml-4 w-16 h-8 border-0 rounded-md cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr className="mt-4 mb-8" />

                  {/* Preview */}
                  <div className="py-4 px-6 bg-gray-100 rounded-lg shadow-md">
                    <p className="text-xl font-semibold">Preview</p>
                    <p className="text-gray-600 mb-4">
                      See how your theme changes look with a live preview.
                    </p>
                    <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-700">Live Preview</p>
                    </div>
                  </div>

                  <hr className="mt-4 mb-8" />

                  {/* Save Changes */}
                  <div className="flex justify-end">
                    <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="pt-4">
                  <h1 className="py-2 text-2xl font-semibold">
                    Notification settings
                  </h1>
                  <p className="font- text-slate-600">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                  <div className="w-full p-3 mt-8 bg-white rounded flex">
                    <div
                      tabIndex="0"
                      aria-label="heart icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z"
                          fill="#EF4444"
                        />
                      </svg>
                    </div>
                    <div className="pl-3">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-none"
                      >
                        <span className="text-indigo-700">James Doe</span> has
                        sent you a{" "}
                        <span className="text-indigo-700">
                          completed work message
                        </span>
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                      >
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-3 mt-4 bg-white rounded shadow flex flex-shrink-0">
                    <div
                      tabIndex="0"
                      aria-label="group icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33325 14.6667C1.33325 13.2522 1.89516 11.8956 2.89535 10.8954C3.89554 9.89523 5.2521 9.33333 6.66659 9.33333C8.08107 9.33333 9.43763 9.89523 10.4378 10.8954C11.438 11.8956 11.9999 13.2522 11.9999 14.6667H1.33325ZM6.66659 8.66666C4.45659 8.66666 2.66659 6.87666 2.66659 4.66666C2.66659 2.45666 4.45659 0.666664 6.66659 0.666664C8.87659 0.666664 10.6666 2.45666 10.6666 4.66666C10.6666 6.87666 8.87659 8.66666 6.66659 8.66666ZM11.5753 10.1553C12.595 10.4174 13.5061 10.9946 14.1788 11.8046C14.8515 12.6145 15.2515 13.6161 15.3219 14.6667H13.3333C13.3333 12.9267 12.6666 11.3427 11.5753 10.1553ZM10.2266 8.638C10.7852 8.13831 11.232 7.52622 11.5376 6.84183C11.8432 6.15743 12.0008 5.41619 11.9999 4.66666C12.0013 3.75564 11.7683 2.85958 11.3233 2.06466C12.0783 2.21639 12.7576 2.62491 13.2456 3.2208C13.7335 3.81668 14.0001 4.56315 13.9999 5.33333C14.0001 5.80831 13.8987 6.27784 13.7027 6.71045C13.5066 7.14306 13.2203 7.52876 12.863 7.84169C12.5056 8.15463 12.0856 8.38757 11.6309 8.52491C11.1762 8.66224 10.6974 8.7008 10.2266 8.638Z"
                          fill="#047857"
                        />
                      </svg>
                    </div>
                    <div className="pl-3 w-full">
                      <div className="flex items-center justify-between w-full">
                        <p
                          tabIndex="0"
                          className="focus:outline-none text-sm leading-none"
                        >
                          <span className="text-indigo-700">Sash</span> Gave a
                          bad rating to technician{" "}
                          <span className="text-indigo-700">Belete</span>
                        </p>
                        <div
                          tabIndex="0"
                          aria-label="close icon"
                          role="button"
                          className="focus:outline-none cursor-pointer"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.5 3.5L3.5 10.5"
                              stroke="#4B5563"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M3.5 3.5L10.5 10.5"
                              stroke="#4B5563"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                      >
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-3 mt-4 bg-white rounded flex">
                    <div
                      tabIndex="0"
                      aria-label="post icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
                          fill="#4338CA"
                        />
                      </svg>
                    </div>
                    <div className="pl-3">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-none"
                      >
                        <span className="text-indigo-700">Sarah</span> from
                        depatment Development:{" "}
                        <span className="text-indigo-700">
                          Approved a request
                        </span>
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                      >
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-3 mt-4 bg-red-100 rounded flex items-center">
                    <div
                      tabIndex="0"
                      aria-label="storage icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-red-200 flex items-center flex-shrink-0 justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 2V14C14 14.1768 13.9298 14.3464 13.8047 14.4714C13.6797 14.5964 13.5101 14.6667 13.3333 14.6667H2.66667C2.48986 14.6667 2.32029 14.5964 2.19526 14.4714C2.07024 14.3464 2 14.1768 2 14V2C2 1.82319 2.07024 1.65362 2.19526 1.5286C2.32029 1.40357 2.48986 1.33334 2.66667 1.33334H13.3333C13.5101 1.33334 13.6797 1.40357 13.8047 1.5286C13.9298 1.65362 14 1.82319 14 2ZM3.33333 10.6667V13.3333H12.6667V10.6667H3.33333ZM10 11.3333H11.3333V12.6667H10V11.3333Z"
                          fill="#B91C1C"
                        />
                      </svg>
                    </div>
                    <div className="pl-3 w-full flex items-center justify-between">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-none text-red-700"
                      >
                        Rating's this day are bad: 5/10 rating on average
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xs leading-3 cursor-pointer underline text-right text-red-700"
                      >
                        Manage
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-3 mt-4 bg-white rounded flex">
                    <div
                      tabIndex="0"
                      aria-label="loading icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99992 1.33333C8.17673 1.33333 8.3463 1.40357 8.47132 1.52859C8.59635 1.65361 8.66659 1.82318 8.66659 1.99999V3.99999C8.66659 4.17681 8.59635 4.34638 8.47132 4.4714C8.3463 4.59642 8.17673 4.66666 7.99992 4.66666C7.82311 4.66666 7.65354 4.59642 7.52851 4.4714C7.40349 4.34638 7.33325 4.17681 7.33325 3.99999V1.99999C7.33325 1.82318 7.40349 1.65361 7.52851 1.52859C7.65354 1.40357 7.82311 1.33333 7.99992 1.33333ZM7.99992 11.3333C8.17673 11.3333 8.3463 11.4036 8.47132 11.5286C8.59635 11.6536 8.66659 11.8232 8.66659 12V14C8.66659 14.1768 8.59635 14.3464 8.47132 14.4714C8.3463 14.5964 8.17673 14.6667 7.99992 14.6667C7.82311 14.6667 7.65354 14.5964 7.52851 14.4714C7.40349 14.3464 7.33325 14.1768 7.33325 14V12C7.33325 11.8232 7.40349 11.6536 7.52851 11.5286C7.65354 11.4036 7.82311 11.3333 7.99992 11.3333ZM14.6666 8C14.6666 8.17681 14.5963 8.34638 14.4713 8.4714C14.3463 8.59642 14.1767 8.66666 13.9999 8.66666H11.9999C11.8231 8.66666 11.6535 8.59642 11.5285 8.4714C11.4035 8.34638 11.3333 8.17681 11.3333 8C11.3333 7.82318 11.4035 7.65361 11.5285 7.52859C11.6535 7.40357 11.8231 7.33333 11.9999 7.33333H13.9999C14.1767 7.33333 14.3463 7.40357 14.4713 7.52859C14.5963 7.65361 14.6666 7.82318 14.6666 8ZM4.66659 8C4.66659 8.17681 4.59635 8.34638 4.47132 8.4714C4.3463 8.59642 4.17673 8.66666 3.99992 8.66666H1.99992C1.82311 8.66666 1.65354 8.59642 1.52851 8.4714C1.40349 8.34638 1.33325 8.17681 1.33325 8C1.33325 7.82318 1.40349 7.65361 1.52851 7.52859C1.65354 7.40357 1.82311 7.33333 1.99992 7.33333H3.99992C4.17673 7.33333 4.3463 7.40357 4.47132 7.52859C4.59635 7.65361 4.66659 7.82318 4.66659 8ZM12.7139 12.714C12.5889 12.839 12.4194 12.9092 12.2426 12.9092C12.0658 12.9092 11.8963 12.839 11.7713 12.714L10.3573 11.3C10.2358 11.1743 10.1686 11.0059 10.1701 10.8311C10.1717 10.6563 10.2418 10.4891 10.3654 10.3654C10.489 10.2418 10.6562 10.1717 10.831 10.1702C11.0058 10.1687 11.1742 10.2359 11.2999 10.3573L12.7139 11.7707C12.7759 11.8326 12.8251 11.9061 12.8586 11.987C12.8922 12.068 12.9094 12.1547 12.9094 12.2423C12.9094 12.3299 12.8922 12.4167 12.8586 12.4976C12.8251 12.5786 12.7759 12.6521 12.7139 12.714ZM5.64259 5.64266C5.51757 5.76764 5.34803 5.83785 5.17125 5.83785C4.99448 5.83785 4.82494 5.76764 4.69992 5.64266L3.28659 4.22933C3.16149 4.10432 3.09118 3.93474 3.09112 3.7579C3.09105 3.58105 3.16125 3.41142 3.28625 3.28633C3.41126 3.16123 3.58084 3.09092 3.75768 3.09086C3.93453 3.0908 4.10416 3.16099 4.22925 3.28599L5.64259 4.7C5.76757 4.82501 5.83778 4.99455 5.83778 5.17133C5.83778 5.3481 5.76757 5.51764 5.64259 5.64266ZM3.28659 12.714C3.1616 12.589 3.09139 12.4194 3.09139 12.2427C3.09139 12.0659 3.1616 11.8963 3.28659 11.7713L4.70059 10.3573C4.76208 10.2937 4.83565 10.2429 4.91698 10.2079C4.99832 10.173 5.0858 10.1546 5.17432 10.1538C5.26284 10.1531 5.35062 10.1699 5.43256 10.2034C5.51449 10.237 5.58892 10.2865 5.65152 10.3491C5.71411 10.4117 5.76361 10.4861 5.79713 10.568C5.83065 10.65 5.84752 10.7377 5.84675 10.8263C5.84598 10.9148 5.82759 11.0023 5.79265 11.0836C5.75771 11.1649 5.70693 11.2385 5.64325 11.3L4.22992 12.714C4.168 12.776 4.09448 12.8252 4.01355 12.8587C3.93261 12.8923 3.84586 12.9095 3.75825 12.9095C3.67064 12.9095 3.58389 12.8923 3.50296 12.8587C3.42203 12.8252 3.3485 12.776 3.28659 12.714ZM10.3573 5.64266C10.2323 5.51764 10.1621 5.3481 10.1621 5.17133C10.1621 4.99455 10.2323 4.82501 10.3573 4.7L11.7706 3.28599C11.8956 3.1609 12.0652 3.09059 12.242 3.09053C12.4189 3.09046 12.5885 3.16066 12.7136 3.28566C12.8387 3.41067 12.909 3.58025 12.9091 3.75709C12.9091 3.93394 12.8389 4.10357 12.7139 4.22866L11.2999 5.64266C11.1749 5.76764 11.0054 5.83785 10.8286 5.83785C10.6518 5.83785 10.4823 5.76764 10.3573 5.64266Z"
                          fill="#F59E0B"
                        />
                      </svg>
                    </div>
                    <div className="pl-3">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-none"
                      >
                        Technician belete has sent you a message
                        <span className="text-indigo-700"> on chatting </span>
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                      >
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <h2
                    tabIndex="0"
                    className="focus:outline-none text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-600"
                  >
                    YESTERDAY
                  </h2>
                  <div className="w-full p-3 mt-4 bg-white rounded flex">
                    <div
                      tabIndex="0"
                      aria-label="loading icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99992 1.33333C8.17673 1.33333 8.3463 1.40357 8.47132 1.52859C8.59635 1.65361 8.66659 1.82318 8.66659 1.99999V3.99999C8.66659 4.17681 8.59635 4.34638 8.47132 4.4714C8.3463 4.59642 8.17673 4.66666 7.99992 4.66666C7.82311 4.66666 7.65354 4.59642 7.52851 4.4714C7.40349 4.34638 7.33325 4.17681 7.33325 3.99999V1.99999C7.33325 1.82318 7.40349 1.65361 7.52851 1.52859C7.65354 1.40357 7.82311 1.33333 7.99992 1.33333ZM7.99992 11.3333C8.17673 11.3333 8.3463 11.4036 8.47132 11.5286C8.59635 11.6536 8.66659 11.8232 8.66659 12V14C8.66659 14.1768 8.59635 14.3464 8.47132 14.4714C8.3463 14.5964 8.17673 14.6667 7.99992 14.6667C7.82311 14.6667 7.65354 14.5964 7.52851 14.4714C7.40349 14.3464 7.33325 14.1768 7.33325 14V12C7.33325 11.8232 7.40349 11.6536 7.52851 11.5286C7.65354 11.4036 7.82311 11.3333 7.99992 11.3333ZM14.6666 8C14.6666 8.17681 14.5963 8.34638 14.4713 8.4714C14.3463 8.59642 14.1767 8.66666 13.9999 8.66666H11.9999C11.8231 8.66666 11.6535 8.59642 11.5285 8.4714C11.4035 8.34638 11.3333 8.17681 11.3333 8C11.3333 7.82318 11.4035 7.65361 11.5285 7.52859C11.6535 7.40357 11.8231 7.33333 11.9999 7.33333H13.9999C14.1767 7.33333 14.3463 7.40357 14.4713 7.52859C14.5963 7.65361 14.6666 7.82318 14.6666 8ZM4.66659 8C4.66659 8.17681 4.59635 8.34638 4.47132 8.4714C4.3463 8.59642 4.17673 8.66666 3.99992 8.66666H1.99992C1.82311 8.66666 1.65354 8.59642 1.52851 8.4714C1.40349 8.34638 1.33325 8.17681 1.33325 8C1.33325 7.82318 1.40349 7.65361 1.52851 7.52859C1.65354 7.40357 1.82311 7.33333 1.99992 7.33333H3.99992C4.17673 7.33333 4.3463 7.40357 4.47132 7.52859C4.59635 7.65361 4.66659 7.82318 4.66659 8ZM12.7139 12.714C12.5889 12.839 12.4194 12.9092 12.2426 12.9092C12.0658 12.9092 11.8963 12.839 11.7713 12.714L10.3573 11.3C10.2358 11.1743 10.1686 11.0059 10.1701 10.8311C10.1717 10.6563 10.2418 10.4891 10.3654 10.3654C10.489 10.2418 10.6562 10.1717 10.831 10.1702C11.0058 10.1687 11.1742 10.2359 11.2999 10.3573L12.7139 11.7707C12.7759 11.8326 12.8251 11.9061 12.8586 11.987C12.8922 12.068 12.9094 12.1547 12.9094 12.2423C12.9094 12.3299 12.8922 12.4167 12.8586 12.4976C12.8251 12.5786 12.7759 12.6521 12.7139 12.714ZM5.64259 5.64266C5.51757 5.76764 5.34803 5.83785 5.17125 5.83785C4.99448 5.83785 4.82494 5.76764 4.69992 5.64266L3.28659 4.22933C3.16149 4.10432 3.09118 3.93474 3.09112 3.7579C3.09105 3.58105 3.16125 3.41142 3.28625 3.28633C3.41126 3.16123 3.58084 3.09092 3.75768 3.09086C3.93453 3.0908 4.10416 3.16099 4.22925 3.28599L5.64259 4.7C5.76757 4.82501 5.83778 4.99455 5.83778 5.17133C5.83778 5.3481 5.76757 5.51764 5.64259 5.64266ZM3.28659 12.714C3.1616 12.589 3.09139 12.4194 3.09139 12.2427C3.09139 12.0659 3.1616 11.8963 3.28659 11.7713L4.70059 10.3573C4.76208 10.2937 4.83565 10.2429 4.91698 10.2079C4.99832 10.173 5.0858 10.1546 5.17432 10.1538C5.26284 10.1531 5.35062 10.1699 5.43256 10.2034C5.51449 10.237 5.58892 10.2865 5.65152 10.3491C5.71411 10.4117 5.76361 10.4861 5.79713 10.568C5.83065 10.65 5.84752 10.7377 5.84675 10.8263C5.84598 10.9148 5.82759 11.0023 5.79265 11.0836C5.75771 11.1649 5.70693 11.2385 5.64325 11.3L4.22992 12.714C4.168 12.776 4.09448 12.8252 4.01355 12.8587C3.93261 12.8923 3.84586 12.9095 3.75825 12.9095C3.67064 12.9095 3.58389 12.8923 3.50296 12.8587C3.42203 12.8252 3.3485 12.776 3.28659 12.714ZM10.3573 5.64266C10.2323 5.51764 10.1621 5.3481 10.1621 5.17133C10.1621 4.99455 10.2323 4.82501 10.3573 4.7L11.7706 3.28599C11.8956 3.1609 12.0652 3.09059 12.242 3.09053C12.4189 3.09046 12.5885 3.16066 12.7136 3.28566C12.8387 3.41067 12.909 3.58025 12.9091 3.75709C12.9091 3.93394 12.8389 4.10357 12.7139 4.22866L11.2999 5.64266C11.1749 5.76764 11.0054 5.83785 10.8286 5.83785C10.6518 5.83785 10.4823 5.76764 10.3573 5.64266Z"
                          fill="#F59E0B"
                        />
                      </svg>
                    </div>
                    <div className="pl-3">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-none"
                      >
                        Technician belete has sent you a message
                        <span className="text-indigo-700"> on chatting </span>
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                      >
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-3 mt-4 bg-white rounded flex">
                    <div
                      tabIndex="0"
                      aria-label="post icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
                          fill="#4338CA"
                        />
                      </svg>
                    </div>
                    <div className="pl-3">
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-sm leading-none"
                      >
                        <span className="text-indigo-700">Sarah</span> from
                        depatment Development:{" "}
                        <span className="text-indigo-700">
                          Approved a request
                        </span>
                      </p>
                      <p
                        tabIndex="0"
                        className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                      >
                        2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="w-full p-3 mt-8 bg-green-100 rounded flex items-center">
                    <div
                      tabIndex="0"
                      aria-label="success icon"
                      role="Image"
                      className="focus:outline-none w-8 h-8 border rounded-full border-green-200 flex flex-shrink-0 items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                          fill="#047857"
                        />
                      </svg>
                    </div>
                    <div className="pl-3 w-full">
                      <div className="flex items-center justify-between">
                        <p
                          tabIndex="0"
                          className="focus:outline-none text-sm leading-none text-green-700"
                        >
                          Rating were so good: 8/10 on average
                        </p>
                        <p
                          tabIndex="0"
                          className="focus:outline-none focus:text-indigo-600 text-xs leading-3 underline cursor-pointer text-green-700"
                        >
                          View
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justiyf-between">
                    <p
                      tabIndex="0"
                      className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500"
                    >
                      Thats it for now :)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
