import React from 'react'
import { CircularProgress } from '@material-ui/core';

export const Loading = () => {
    return (
        <div>
            <CircularProgress variant='indeterminate' color='primary' />
        </div>
    )
};
 