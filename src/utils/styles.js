/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { animated } from '@react-spring/web'

export const Main = styled('span')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #0f0f0f;
`

export const Container = styled('div')`
    width: auto;
    height: 100%;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    min-height: 100vh;
    padding: 50px 0px;
    flex-direction: column;    
`

export const Title = styled('span')`
    vertical-align: middle;
    background-color: #c7c4c4;
    border: 1px solid grey;
    padding: 2px 8px;
    border-radius: 5px;
`

export const Node = styled('span')`
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 10px 0px 0px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    margin-left: 31px
`

export const Nested = styled(animated.div)`
    will-change: transform, opacity, height;
    margin-left: 10px; 
    display: flex;
    flex-direction: column;
    border-left: 1px dashed grey;
    overflow-y: hidden;
`

export const InputField = styled('input')`
    margin-right: 15px; 
    padding: 10px;
    background-color: #2e2e2e;
    color: grey;
    width: auto;
`

export const Form = styled('form')`
    display: flex;
    margin-top: 30px;
`