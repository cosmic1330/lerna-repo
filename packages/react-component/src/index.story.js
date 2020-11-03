import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from './button/default';

storiesOf('MaterialButton', module).add('default', () => <Button text="Test"/>);