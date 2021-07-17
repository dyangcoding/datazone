import { Fragment } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { useGetRulesQuery } from "../services/api";

const Header: () => JSX.Element = () => {
    return (
        <header className="bg-white">
            <div className="flex items-center justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    History
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

const SearchHistory = () => {
    const { data: rules, isLoading } = useGetRulesQuery()
    return (
        <Fragment>
            <Header />
            {!rules ? <div>No Rules </div> : undefined}
            <ul>
                {rules?.map(rule => (
                    <li key={rule.id}>{rule.keyword}</li>
                ))}
            </ul>
            {isLoading ? 'Loading' : null}
        </Fragment>
    );
}

export default SearchHistory