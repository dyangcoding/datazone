import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { entries } from "../utils/operatorUtils";

const Header: () => JSX.Element = () => {
    return (
        <header className="bg-white">
            <div className="flex items-center justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Help
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

const PageInfo: () => JSX.Element = () => {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Operator
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {entries.map((entry, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap leading-5 font-semibold">
                                            <span className="px-2 py-1 bg-blue-100 rounded-full text-blue-800">{entry.operator}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-wrap">
                                            {entry.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Help: () => JSX.Element = () => {
    return (
        <div className="max-w-screen-lg mx-auto">
            <Header />
            <PageInfo />
        </div>
    );
}

export default Help