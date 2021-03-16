import React from 'react'
import {Primary} from '../Title/title.stories'
import {Contianed} from '../Button/button.stories'

export default { 
    title:'self-react-component/Sub',
    parameters:{
        docs: {
            page: () => (
                <div>
                # text
                </div>
            ),
        },
    },
}

export const Sub123 = () => (<>
    <Primary/>
    <Contianed>text</Contianed>
</>)