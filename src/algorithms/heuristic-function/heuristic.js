import { greedy } from "./greedy";
import { linearStructure } from "./linear-structure";

const heuristicFunctions = {
    greedy: greedy,
    'linear structure': linearStructure
};

export const heuristicFunction = heuristicFunctions['greedy'];