import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Rule } from "../models/rule";
import { Tweet } from "../models/tweet";

type RulesResponse = Rule[];
type TweetsResponse = Tweet[];

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["Rules", "Tweets"],
  endpoints: (build) => ({
    getRules: build.query<RulesResponse, void>({
      query: () => "rules",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Rules" as const, id })),
              { type: "Rules", id: "LIST" },
            ]
          : [{ type: "Rules", id: "LIST" }],
    }),

    getTweets: build.query<TweetsResponse, void>({
        query: () => "tweets",
        providesTags: (result) =>
          result
          ? [
              ...result.map(({ id }) => ({ type: "Tweets" as const, id})),
              { type: "Tweets", id: "LIST"},
          ]
          : [{type: "Tweets", id: "LIST"}],
    }),
    
    addRule: build.mutation<Rule, Partial<Rule>>({
      query: (body) => ({
        url: `rules`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Rules", id: "LIST" }],
    }),
    
    getRule: build.query<Rule, string>({
      query: (id) => `rules/${id}`,
      providesTags: (result, error, id) => [{ type: "Rules", id }],
    }),

    updateRule: build.mutation<void, Pick<Rule, "id"> & Partial<Rule>>({
      query: ({ id, ...patch }) => ({
        url: `rules/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Rules", id }],
    }),
    
    deleteRule: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `rules/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Rules", id }],
    }),
  }),
})

export const {
  useGetRuleQuery,
  useGetRulesQuery,
  useGetTweetsQuery,
  useAddRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} = api