import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthProvider({children}){


let[AdminToken , setAdminToken] = useState(null); 
let[CenterToken , setCenterToken] = useState(null); 


let[CenterId , setCenterId] = useState(null); 


let[patiToken , setpatiToken] = useState(null); 


useEffect (function(){

    if(localStorage.getItem('admintkn') !==null){
    setAdminToken(localStorage.getItem('admintkn'))
    }


    if(localStorage.getItem('centertkn') !==null){
        setCenterToken(localStorage.getItem('centertkn'))
        }


})





return<authContext.Provider  value={  {AdminToken , setAdminToken , CenterToken , setCenterToken , patiToken , setpatiToken  , setCenterId ,CenterId  }  }>   

{children}
</authContext.Provider>

}