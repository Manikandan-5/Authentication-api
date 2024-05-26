import React from 'react'
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const ProtectRouter=({component,...rest})=>{
    // console.log("Value=",component,"next",rest);
    let RenderComponents=component;
    let hastoken=JSON.parse(localStorage.getItem('auth'))
    return(
        <Route
        {...rest}
        render={
            
            props=>{
             return   hastoken!==null ?(
                <RenderComponents {...props} />
            ):(
                <Redirect
                to={{
                    pathname:'/login'
                }}/>
            )
                
            }
        }
        />
    )
}

export default ProtectRouter;