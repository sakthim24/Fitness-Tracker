import {React} from 'react'
import AppRouter from './components/approute';
import BmiContextProvider from './context/bmifunction';
import {AuthContextProvider} from './context/userauthcontext';
import  "./index.css";

function App()
 {
    
    return (
       <AuthContextProvider>
           <BmiContextProvider>
        <AppRouter/>
        </BmiContextProvider>
        </AuthContextProvider>
    )
}

export default App
