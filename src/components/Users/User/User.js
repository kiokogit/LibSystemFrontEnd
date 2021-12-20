import {  TableCell, TableRow } from '@material-ui/core'
import React from 'react'

export const User = ({ user }) => {

    return (
        <TableRow>
            <TableCell >
                {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>
                Email: {user.userEmail}
            </TableCell>
            <TableCell>
                Phone: {user.userPhone}
            </TableCell>

        </TableRow>
    )
}
