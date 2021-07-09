import axios, { AxiosResponse } from "axios";
import { RuleProperties } from "../rules/rule";

const instance = axios.create({
	baseURL: "http://localhost:8080",
	timeout: 15000,
  headers: {
    "Content-type": "application/json"
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const RuleClient = {
  // necessary because all the Rules will be displayed on the history page 
  getRules: (): Promise<RuleProperties[]> => requests.get("rules"),
  getRuleById: (id: number): Promise<RuleProperties> => requests.get(`rules/${id}`),
  // Get a RuleProperties back because the Id of Rule will be generated from backend
  createRule: (rule: RuleProperties): Promise<RuleProperties> => 
    requests.post("rules", rule),
  updateRule: (rule: RuleProperties, id: number): Promise<RuleProperties> =>
    requests.put(`rules/${id}`, rule),
  deleteRule: (id: number): Promise<void> => requests.delete(`posts/${id}`)
}

// TODO
export const TweetsClient = {

}