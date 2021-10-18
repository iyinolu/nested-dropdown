import { TEXT_BLOCK } from '../utils/static';
import { TreeComponent } from '../component';

/**
 * Generate a Random Number between 
 * min and max exclusive.
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * This helper function takes in  n (number of nodes) and m (depth of tree).
 * Returns renderable tree-structure react component to be displayed
 */
export function TreeJsonMod(n, m) {
    if (n === 0) {
        return [...Array(m).keys()].map((val) => {
        var randn = getRandomInt(1, 100)
        return (
                <TreeComponent last={true} title={TEXT_BLOCK.slice(randn, randn + 10)}>
                </TreeComponent>
            )
        })
    }
    else {
        var temp = []
        for (let i = 0; i < m; i++) {
            var randn = getRandomInt(1, 100)
            var title = TEXT_BLOCK.slice(randn, randn + 30)
            temp.push(
                <TreeComponent last={false} key={`${title.slice(3, 6)} ${i}`} title={title}>
                    {TreeJsonMod(n-1, m)}
                </TreeComponent>
            )
        }
        return temp
    }
}

/**
 * This helper function takes in continent API data.
 * Returns renderable tree-structure react component to be displayed
 */
export const RenderData = (data) => {
    return data.map((value, idx) => {
        var field = Object.keys(value)
        if (field.length === 1) {
            return (
                <TreeComponent key={value['name']} last={true} title={value['name']}>
                </TreeComponent>
            )
        }
        // remove the 'name' key. 
        // we are assuming there are only at most two keys
        field.shift() 
        if (value[field[0]].length === 0) {
            return (
                <TreeComponent key={value['name']} last={true} title={value['name']}>
                </TreeComponent>
            )
        } else {
            return (
                <TreeComponent key={value['name']} last={false} title={value['name']}>
                    {RenderData(value[field[0]])}
                </TreeComponent>
            )
        }
    })   
}