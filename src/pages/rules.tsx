import { Fragment, useState } from "react";
import { SearchIcon, ChatAltIcon, EmojiSadIcon, AdjustmentsIcon, TrashIcon } from "@heroicons/react/outline";
import { useDeleteRuleMutation, useGetRulesQuery } from "../services/api";
import { RuleProperties } from "../models/rule";
import { RuleSearchForm } from "../rules/rule-search-form";
import { OptionsSearchForm } from "../rules/options-search-form";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

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

const PageInfo: () => JSX.Element = () => {
    return (
        <div className="lg:text-center py-6 border rounded-lg">
            <div className="flex items-center justify-center px-2 py-4 text-center"><AdjustmentsIcon className="text-gray-500 h-12 w-12" aria-hidden="true" /></div>
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">No Rules</h2>
            <p className="text-lg text-gray-500">
                Get Started by creating a new Rule
            </p>
            <div className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button className="rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    Create Rule
                </button>
            </div>
        </div>
    );
}

const RuleInfo: () => JSX.Element = () => {
    return (
        <Fragment>
            <div className="flex justify-between">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ChatAltIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="text-lg leading-6 font-medium text-gray-900">
                                    Editing Rule
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        A new Rule would be created and applied to the filtered Stream every time when editing a existing rule.
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="text-lg leading-6 font-medium text-gray-900">
                                    Deleting Rule
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        A new Rule would be created and applied to the filtered Stream every time when editing a existing rule.
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const ErrorInfo = ({ error } : {error: FetchBaseQueryError | SerializedError }) => {
    return (
        <div className="lg:text-center py-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="flex items-center justify-center px-2 py-4 text-center"><EmojiSadIcon className="text-red-500 h-12 w-12" aria-hidden="true" /></div>
            <h2 className="text-2xl text-red-600 font-semibold tracking-wide uppercase">Oops, I think you're lost.</h2>
            <p className="text-lg text-red-500">
                Sorry, we could't not get what you are looking for ...
            </p>
            <div className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                Check Connection OR refresh the Page
            </div>
        </div>
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
    const { data: rules, error, isLoading } = useGetRulesQuery()
    const [isEditing, setIsEditing] = useState(false)
    const [deleteRule, { isLoading: isDeleting }] = useDeleteRuleMutation()
    return (
        <Fragment>
            <Header />
            <RuleInfo />
            {error ? <ErrorInfo error={error} /> : null}
            {!error && (!rules || !rules.length) ? <PageInfo /> : null}
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
                                        onClick={() => deleteRule(rule.twitterGenId ? rule.twitterGenId : NaN)} disabled={isDeleting}>
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