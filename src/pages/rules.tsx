import { Fragment, useState } from "react";
import { SearchIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import { useDeleteRuleMutation, useGetRulesQuery } from "../services/api";
import { RuleProperties } from "../models/rule";
import { RuleSearchForm } from "../rules/rule-search-form";
import { OptionsSearchForm } from "../rules/options-search-form";

const Header: () => JSX.Element = () => {
    return (
        <header className="bg-white">
            <div className="flex items-center justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Rules
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

const RenderEditAction = ( {rule} : {rule : RuleProperties}) => {
    const [isEditing, setIsEditing] = useState(false)
    
    return (
        <div className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button className="rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsEditing(true)}>
                Edit
            </button>
        </div>
    )
}

const Rules = () => {
    const { data: rules, isLoading } = useGetRulesQuery()
    const [isEditing, setIsEditing] = useState(false)

    const [deleteRule, { isLoading: isDeleting }] = useDeleteRuleMutation()

    return (
        <Fragment>
            <Header />
            {!rules ? <div>No Rules </div> : undefined}
            <div className="flex flex-col bg-white divide-y divide-gray-200 my-4">
                {rules?.map(rule => (
                    <div key={rule.twitterGenId} className="flex flex-col min-w-full px-4 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <div className="flex-shrink-0 h-6 w-6">
                                    <AdjustmentsIcon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4 text-base font-medium text-gray-900 tracking-wide">
                                    <div className="whitespace-pre-line">
                                        <span className="py-4">{rule.keyword}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={() => setIsEditing(!isEditing)}>
                                        Edit
                                    </button>
                                </div>
                                <div className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        onClick={() => deleteRule(rule.twitterGenId ? rule.twitterGenId : NaN)}>
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {isEditing 
                            ? 
                            <div className="flex">
                                <form className="min-w-full">
                                    <RuleSearchForm rule={rule} />
                                    <OptionsSearchForm options={rule.options} />
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                                                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Reapply
                                        </button>
                                    </div>
                                </form>
                            </div>
                            :
                            undefined
                        }
                    </div>
                ))}
            </div>
            {isLoading ? 'Loading' : null}
        </Fragment>
    );
}

export default Rules