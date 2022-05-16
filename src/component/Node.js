import React from "react";
import { useSpring, a } from "@react-spring/web";
import { Title, NodeDiv, Nested } from "../utils/styles";
import useMeasure from "react-use-measure";
import { treeContext } from "../App";
import { createUseStyles } from "react-jss";
import Tree from "./Tree";

/**
 * Building block for Tree structure.
 * Returns renderable tree node.
 */
const Node = React.memo(({ n, m, last, title, childrenData }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showChilden, setShowChildren] = React.useState(false);
  const [ref, { height: viewHeight }] = useMeasure();
  const previous = usePrevious(open);
  const context = React.useContext(treeContext);
  const { closeAll, setCloseAll, showData } = context;

  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: open && !closeAll ? viewHeight : 0,
      opacity: open && !closeAll ? 1 : 0,
      y: open ? 0 : 20,
    },
  });

  const handleClick = () => {
    if (last) {
      setCloseAll(true);
      setOpen(false);
    } else {
      setOpen(!open);
      setShowChildren(!showChilden);
    }
  };

  const renderIcon = () => {
    return (
      <span onClick={handleClick} className={classes.icon}>
        {open ? "✅" : "⛔️"}
      </span>
    );
  };

  return (
    <div>
      <NodeDiv>
        <div className={classes.nodeIconContainer}>
          {renderIcon()}
          <Title onClick={handleClick}>{title}</Title>
        </div>

        <Nested
          style={{
            opacity,
            height: open && !closeAll && previous === open ? "auto" : height,
          }}
        >
          <a.div
            ref={ref}
            style={{ y }}
            children={
              showChilden && !closeAll ? (
                showData ? (
                  <Tree data={childrenData} />
                ) : (
                  <Tree n={n - 1} m={m} />
                )
              ) : (
                ""
              )
            }
          />
        </Nested>
      </NodeDiv>
    </div>
  );
});

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

const useStyles = createUseStyles({
  nodeIconContainer: {
    display: "flex",
    verticalAlign: "middle",
    alignItems: "center",
  },
  icon: {
    marginRight: "15px",
    cursor: "pointer",
  },
});

export default Node;
