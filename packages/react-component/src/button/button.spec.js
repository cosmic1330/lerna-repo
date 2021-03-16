import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Button from './button'

describe('Button', () => {
    test('screeenshot', () => {
        const tree = renderer.create(<Button children="Test"></Button>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
