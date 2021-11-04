import React, { createContext, useContext, useState } from 'react'
import { collection, doc, setDoc } from '@firebase/firestore'
import { db } from '../firebaseconfig/firebase-config'
import { useAuth } from './userauthcontext';

const BmiContext = createContext({
  bmiResult: null,
  status: null,
  userinfo: null,
  calculateBMI: () => Promise,
  addToRecord: () => Promise,
})

export const useBmi = () => useContext(BmiContext)


export default function BmiContextProvider({ children }) {
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");
  const { currentuser} = useAuth();

  var date = "";

  const addToRecord = async () => {
    const collref = collection(db, currentuser.uid);
    const datetime = new Date().toLocaleString()
    const current = new Date();
    const date = `${current.getDate()}${current.getMonth() + 1}${current.getFullYear()}`;
    if (currentuser) {
      try {
        await setDoc(doc(collref, date), { bmi: bmiResult, status: status, date: datetime }, { merge: true })

      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      console.log("user Loged out");
    }
  }


  function calculateBMI(height, weight, units) {
    let bmi = 0;
    const current = new Date();
    date = `${current.getDate()}${current.getMonth() + 1}${87}`;
      if (units === 'Metrics') bmi = Number(weight / (height / 100) ** 2).toFixed(2);
      else bmi = Number(weight / (height * height)).toFixed(2);
      setBmiResult(bmi);
      let bmiStatus = getStatus(bmi);
      setStatus(bmiStatus);
  }

  function getStatus(bmi) {
    if (bmi >= 0 && bmi < 16) return ("Severe Thinness");
    else if (bmi >= 16 && bmi < 17) return ("Moderate Thiness");
    else if (bmi >= 17 && bmi < 18.5) return ("Mild Thiness");
    else if (bmi >= 18.5 && bmi < 25) return ("Normal");
    else if (bmi >= 25 && bmi < 30) return ("Overweight");
    else if (bmi >= 30 && bmi < 35) return ("Obese Class I");
    else if (bmi >= 35 && bmi < 40) return ("Obese Class II");
    else return ("Obese Class III");
  }

  const value = {
    bmiResult,
    status,
    calculateBMI,
    getStatus,
    addToRecord,

  }
  return <BmiContext.Provider value={value}>{children}</BmiContext.Provider>


}
