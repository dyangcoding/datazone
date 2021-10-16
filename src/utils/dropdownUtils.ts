export const optionalEntries = ["Unset", "Yes", "No"];

const optionalMap = new Map()
optionalMap.set("Unset", undefined);
optionalMap.set("Yes", true);
optionalMap.set("No", false);

export default optionalMap;