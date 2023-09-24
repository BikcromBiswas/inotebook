import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
export default function Loader() {
    return (
            <div className='d-flex justify-content-center m-auto my-5' >
                <RotatingLines
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="100"
                    visible={true}
                />
            </div>
    )
}
