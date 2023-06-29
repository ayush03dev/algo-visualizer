import { useEffect, useState } from "react";
import { GridNode } from "./interfaces/GridNode";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import { getVisitedBFSNodes } from "./algorithms/BFS";
import { getVisitedDFSNodes } from "./algorithms/DFS";
import { PathfindingAlgorithm } from "./algorithms";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default function PathfindingVisualizer() {
    const [grid, setGrid] = useState<GridNode[][]>([]);
    const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false);
    let promises: Promise<unknown>[] = [];

    useEffect(() => {
        setGrid(getInitialGrid());
    }, []);

    function getInitialGrid() {
        const grid: GridNode[][] = [];
        for (let row = 0; row < ((window.innerHeight / 1.5) / 25); row++) {
            const currentRow: GridNode[] = [];
            for (let col = 0; col < (window.innerWidth / 25) - 1; col++) {
                currentRow.push({
                    col,
                    row,
                    isStart: row === START_NODE_ROW && col === START_NODE_COL,
                    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                    previousNode: null,
                });
            }
            grid.push(currentRow);
        }
        return grid;
    };

    function handleMouseDown(row: number, col: number) {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);

    }

    function handleMouseEnter(row: number, col: number) {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    }

    function handleMouseUp() {
        setMouseIsPressed(false);
    }

    function getNewGridWithWallToggled(grid: GridNode[][], row: number, col: number) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: true,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

    function animate(algorithm: PathfindingAlgorithm) {
        let nodes: number[][];
        switch (algorithm) {
            case PathfindingAlgorithm.DFS:
            default:
                nodes = getVisitedDFSNodes(grid, grid[START_NODE_ROW][START_NODE_COL], grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
                break;
            case PathfindingAlgorithm.BFS:
                nodes = getVisitedBFSNodes(grid, grid[START_NODE_ROW][START_NODE_COL], grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
                break;

        }
        for (let i = 0; i < nodes.length; i++) {
            promises.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    const node = grid[nodes[i][0]][nodes[i][1]];
                    const element = document.getElementById(`node-${node.row}-${node.col}`);
                    if (element && !node.isFinish)
                        element.className =
                            'node node-visited';
                    resolve(true);
                }, i * 10);
            }));
        }
        return Promise.all(promises);
    }

    function animatePath() {
        // getVisitedDFSNodes(grid, grid[START_NODE_ROW][START_NODE_COL], grid[FINISH_NODE_ROW][FINISH_NODE_COL]);
        let lastNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const pathNodes: GridNode[] = [];
        while (lastNode.previousNode != null) {
            lastNode = lastNode.previousNode;
            if (lastNode.previousNode != null)
                pathNodes.push(lastNode);
        }
        pathNodes.reverse();
        for (let i = 0; i < pathNodes.length; i++) {
            promises.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    const element = document.getElementById(`node-${pathNodes[i].row}-${pathNodes[i].col}`);
                    console.log(element)
                    if (element)
                        element.className =
                            'node node-path';
                    resolve(true);
                }, i * 10)
            }));

        }
        return Promise.all(promises);
    }

    async function handleClick(pathAlgorithm: PathfindingAlgorithm) {
        await animate(pathAlgorithm);
        await animatePath();
    }

    return (<>
        <div className="grid">
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const { row, col, isFinish, isStart, isWall, isVisited } = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={() => handleMouseDown(row, col)}
                                    onMouseEnter={() => handleMouseEnter(row, col)}
                                    onMouseUp={() => handleMouseUp()}
                                    row={row}
                                    isVisited={isVisited}
                                ></Node>
                            );
                        })}
                    </div>
                );
            })}
        </div>
        <button onClick={() => handleClick(PathfindingAlgorithm.BFS)}>Hello</button>
    </>)
}