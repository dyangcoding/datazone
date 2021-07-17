import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Rule } from "../rules/rule";

type RulesResponse = Rule[];
// type TweetsResponse 

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Rule"],
  endpoints: (build) => ({
    getRules: build.query<RulesResponse, void>({
      query: () => "rules",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Rule" as const, id })),
              { type: "Rule", id: "LIST" },
            ]
          : [{ type: "Rule", id: "LIST" }],
    }),
    
    addRule: build.mutation<Rule, Partial<Rule>>({
      query: (body) => ({
        url: `rules`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Rule", id: "LIST" }],
    }),
    
    getRule: build.query<Rule, string>({
      query: (id) => `rules/${id}`,
      providesTags: (result, error, id) => [{ type: "Rule", id }],
    }),

    updateRule: build.mutation<void, Pick<Rule, "id"> & Partial<Rule>>({
      query: ({ id, ...patch }) => ({
        url: `rules/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Rule", id }],
    }),
    
    deleteRule: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `rules/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Rule", id }],
    }),
  }),
})

export const {
  useGetRuleQuery,
  useGetRulesQuery,
  useAddRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} = api