import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { RuleProperties } from "../rules/rule";
import { RuleClient } from "./ajax";

export function useRules<TData = RuleProperties[]>(options?: UseQueryOptions<RuleProperties[], AxiosError, TData>) {
    return useQuery("rules", RuleClient.fetchRules, options);
}