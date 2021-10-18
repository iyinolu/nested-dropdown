/* eslint-disable no-unused-vars */
import React from 'react';
import { useSpring, a } from '@react-spring/web'
import { Title, Node, Nested } from '../utils/styles';
import useMeasure from 'react-use-measure'
import { treeContext } from '../App';

function usePrevious(value) {
    const ref = React.useRef()
    React.useEffect(() => void (ref.current = value), [value])
    return ref.current
}

/**
 * Building block for Tree structure.
 * Returns renderable tree node.
 */
export const TreeComponent  = React.memo(({children, last, title}) => {    
 
    const [open, setOpen] = React.useState(false)
    const [ref, { height: viewHeight }] = useMeasure()
    const previous = usePrevious(open)
    const context = React.useContext(treeContext)
    const {closeAll, setCloseAll} = context    

    React.useEffect(() => {
        // reset closeAll when parent component rerenders
        if (closeAll) {
            setCloseAll(false) 
        }        
    }, [closeAll, setCloseAll])
    
    // Animate Tree Rendering
    const { height, opacity, y } = useSpring({
        from: { height: 0, opacity: 0, y: 0 },
        to: {
            height: open && !closeAll ? viewHeight : 0,
            opacity: open && !closeAll ? 1 : 0,
            y: open ? 0 : 20,
        },
    })

    const Icon = () => {
        return (
            <span 
                onClick={() => {
                    if (last) {
                        setCloseAll(true)
                        setOpen(false)                        
                    } else {
                        setOpen(!open)
                    }
                }} 
                style={{ marginRight: "15px", cursor: "pointer"}}
            >
                {open ? "✅" : "⛔️"}
            </span>
        )
    }

    return (
      <div>
        <Node> 
          <div style={{ display:"flex", verticalAlign: "middle", alignItems:'center' }}>
            {Icon()}
            <Title style={{ verticalAlign: "middle", display: "flex", textAlign: "center"}}>
                {title}
            </Title>
          </div>  
  
            <Nested style={{ opacity,
                height: (open && !closeAll) && previous === open ? 'auto' : height 
            }}>
                <a.div ref={ref} style={{ y }} children={children} />
            </Nested>
        </Node>
      </div>
    )
})