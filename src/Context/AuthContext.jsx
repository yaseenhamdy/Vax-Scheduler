import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthProvider({children}){


let[AdminToken , setAdminToken] = useState(null); 


useEffect (function(){
    if(localStorage.getItem('admintkn') !==null){
    setAdminToken(localStorage.getItem('admintkn'))
    }
})





return<authContext.Provider  value={  {AdminToken , setAdminToken }}>   

{children}
</authContext.Provider>

}