import React from 'react'
import header from '../../../Images/photo_5895523619935731498_y.jpg'
export default function Header() {
    return (
        <>
            <div className="container mt-4 p-5">
                <div className="row align-items-center mt-5"> 
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}> 
                            <h1 className='titlee'>Receive your vaccine conveniently at the nearest location</h1>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <img src={header} className='w-100' alt="Vaccine Header" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
