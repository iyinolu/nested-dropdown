/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useContext } from "react";
import { treeContext } from "../App";
import { getRandomInt } from "../helpers/index";
import { TEXT_BLOCK } from "../utils/static";
import Node from "./Node";
import { v4 as uuid } from "uuid";

/**
 * Renders a balanced tree consisting of n nodes,
 * and m depth. Makes use of Node.js component.
 */
const Tree = React.memo(({ n, m, data }) => {
  const context = useContext(treeContext);
  const { closeAll, showData } = context;
  const renderTree = useMemo(() => {
    var temp = [];
    if (showData) {
      return data
        ? data.map((field) => {
            let keys = Object.keys(field);
            return keys.length === 1 ? (
              <Node last={true} title={field.name} />
            ) : (
              <Node
                key={`Node-${uuid()}`}
                last={false}
                title={field.name}
                childrenData={field[keys[0] === "name" ? keys[1] : keys[0]]}
              />
            );
          })
        : "";
    } else {
      if (n === 0) {
        return (
          <>
            {[...Array(m).keys()].map((_) => {
              var randn = getRandomInt(1, 100);
              return (
                <Node last={true} title={TEXT_BLOCK.slice(randn, randn + 10)} />
              );
            })}
          </>
        );
      }
      for (let i = 0; i < m; i++) {
        var randn = getRandomInt(1, 100);
        var title = TEXT_BLOCK.slice(randn, randn + 30);
        temp.push(<Node key={`Node-${uuid()}`} title={title} n={n} m={m} />);
      }
    }
    return <>{temp}</>;
  }, [n, m, closeAll]);
  
  return <>{renderTree}</>;
});

export default Tree;
