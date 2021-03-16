import React from 'react'
import MaterialButton from '@material-ui/core/Button'

export default function Button({ disabled, ...arg }) {
    return <MaterialButton disabled={disabled} {...arg}></MaterialButton>
}
