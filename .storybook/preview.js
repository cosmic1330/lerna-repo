import React from 'react'
import { addDecorator } from '@storybook/react'
addDecorator(story => <div style={{ textAlign: 'center' }}>{story()}</div>)
