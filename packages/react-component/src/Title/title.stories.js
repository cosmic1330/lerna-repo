import React from 'react'
import Title from './title'

export default { 
    title:'self-react-component/Title',
    component:Title,
    parameters:{
        layout:'centered',
    },
}

export const Primary = () => <Title>0</Title>
export const Red = () => <Title style={{color:'red'}}>1</Title>
export const Blue = () => <Title style={{color:'blue'}}>2</Title>

Primary.storyName= 'Block'