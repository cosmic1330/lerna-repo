import React from 'react'
import { storiesOf } from '@storybook/react'
import { filterByte } from '.'

storiesOf('Common-Func', module).add('filterByte', () => (
    <>
        <p>Auto:{filterByte(1048576*1024)}</p>
        <p>{filterByte(1048576,'Bits')}</p>
        <p>{filterByte(1048576,'KB')}</p>
        <p>{filterByte(1048576,'MB')}</p>
        <p>{filterByte(1048576,'GB')}</p>
    </>
))
