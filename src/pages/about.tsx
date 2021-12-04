import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

const Header: () => JSX.Element = () => {
    return (
        <header className="bg-white">
            <div className="flex items-center justify-between py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    About
                </h1>

                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button type="button"
                    className="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </header>
    );
}

const About: () => JSX.Element = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <Header />
            <Info />
        </div>
    );
}

const Info: () => JSX.Element = () => {
    return (
        <div className="lg:text-center py-6">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Data Zone</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to acquire real-time data
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Data Zone overcomes the struggle on how to effectively acquire twitter data for your next research project.
            </p>
        </div>
    );
}

export default About