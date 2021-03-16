StoryBook 的參數分為三類

-   Gloable 全域
-   Component 組件
-   Story 子組件

## Gloable

全域的參數在`.storybook/preview.js`中設定，我們可以在 preview 中設定所有組件的 arg 參數或設定 decorator 對所有組件組合。

```js
# preview.js
import React from 'react'
import { addDecorator } from '@storybook/react'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}
// 所有的組件的外層都會附加此div
addDecorator(story => <div style={{ textAlign: 'center' }}>{story()}</div>)
```

## Component

Component 等於我們目錄下的組件，一個`xxxx.stories.js`中僅能有一個 Component，一個 Component 中可以有多個 Stories，我們可以對 Component 設定 title、component、argTypes....等等，在`xxxx.stories.js`中的`export default { }`設定。

```js
export default {
    title: 'Material/Button',
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
```
