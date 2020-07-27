import { DataFlowNode } from './dataflow';
/**
 * Print debug information for dataflow tree.
 */
export declare function printDebugDataflow(node: DataFlowNode): void;
/**
 * Show the dataflow graph as an image (rendered by https://kroki.io/) on the command line.
 */
export declare function drawDataflow(roots: readonly DataFlowNode[], size?: number): void;
/**
 * Print the dataflow tree as graphviz.
 *
 * Render the output in e.g. http://viz-js.com/.
 */
export declare function dotString(roots: readonly DataFlowNode[]): string;
//# sourceMappingURL=debug.d.ts.map