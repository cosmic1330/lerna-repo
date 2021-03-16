import React from 'react'
import Button from './button'

export default {
    title: 'self-react-component/MaterialButton',
    component: Button,
    // Component parameters - 類別
    argTypes: {
        children: { control: 'text', description: '輸入任意文字' },
        variant: {
            control: 'text',
            description: 'text,outlined,contained',
            values: [{ name: 'red', value: '#f00' }, { name: 'green', value: '#0f0' }],
        },
        color: { control: 'text', description: 'default,primary,secondary' },
        onClick: { action: 'clicked' },
    },
    // Component parameters - 預設
    args: {
        children: '預設',
        variant: 'text',
        color: 'default',
    },
    // Component decorators
    decorators: [story => <div style={{ textAlign: 'right' }}>{story()}</div>],
}

/*  Main */
export const Default = args => <Button {...args}></Button>

/*  Children Stories (使用Bind) */
export const Contianed = Default.bind({})


// Stories args
Contianed.args = {
    color: 'secondary',
    children: 'Contianed',
    variant: 'contianed',
}
// Stories 子繼承
export const Outlined = Default.bind({})
Outlined.args = {
    ...Contianed.args,
    children: 'Outlined',
    variant: 'outlined',
}
// Stories parameters
Outlined.parameters = {
    backgrounds: {
        values: [{ name: 'red', value: '#f00' }, { name: 'green', value: '#0f0' }],
    },
}
// Stories decorators
Outlined.decorators = [story => <div style={{ textAlign: 'left' }}>{story()}</div>]
