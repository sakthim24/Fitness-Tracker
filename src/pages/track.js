import {React,useEffect,useState} from 'react'
import { Layout } from '../components/layout'
import { useAuth } from '../context/userauthcontext';
import { collection,doc,getDocs, deleteDoc } from '@firebase/firestore'
import { db } from '../firebaseconfig/firebase-config'
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Track() {
    const {currentuser}=useAuth()
    const [fitlist, setfitlist] = useState([])
     const [isUpdate, setisUpdate] = useState(false)
    useEffect(() => {
      const fetchrecords=async()=>{
        const collref=collection(db,currentuser.uid);
        const snapshot = await getDocs(collref);
        setfitlist(snapshot.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
        console.log(fitlist)
      }
      fetchrecords()
    
    }, [isUpdate]);
  
  const deleteRecords = async (id) =>{
    await deleteDoc(doc(db,currentuser.uid,id)).then(() => {
       setisUpdate(true);
       toast.success("Record deleted successfully")

    })
    
  }
    return (
        <Layout>
           <ToastContainer position="bottom-right" />
       <div className=" h-5/6 w-11/12 md:ml-16 bg-transparent text-gray-800 antialiased px-4 py-2 md:py-6 flex flex-col justify-center ">
        <div className="relative py-10 w-11/12 md:w-8/12  mx-auto text-center">
          <div className="md:relative mt-4 bg-white shadow-lg w-100 sm:rounded-lg text-left">
            <div className="h-2 w-25  bg-green-500 rounded-t-md"></div>
            <div className="py-1 md:py-6 px-8">
              <h1 className="text-center mb-3 md:mb-4 block font-medium md:font-extrabold text-2xl text-grey-500">TRACK LIST</h1>    
            <div className="block w-full overflow-y-auto overflow-x-auto ">
            <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                        <tr className="bg-green-500">
                            <th className="font-bold text-base px-6 text-blueGray-500 align-middle border border-solid  py-1 text-sm md:text-xs uppercase border-l-0 border-r-0 whitespace-nowrap  text-center">
                                DATE
                            </th>
                            <th className="font-bold text-base px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid  py-1 text-sm md:text-xsuppercase border-l-0 border-r-0 whitespace-nowrap  text-center">
                                BMI
                            </th>
                            <th className="font-bold text-base px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid  py-1 text-sm md:text-xs uppercase border-l-0 border-r-0 whitespace-nowrap  text-center">
                                Status
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid  py-1 text-sm md:text-xs uppercase border-l-0 border-r-0 whitespace-nowrap  text-center">
                           
                            </th>
                        </tr>
                    </thead>

            { fitlist && fitlist.map(list=>{
               return(
                <tbody key={list.id}>
                        <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold ">
                            {list.date}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold">
                            {list.bmi}
                            </td>
                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold">
                            {list.status}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center font-bold">
                            <button className="text-black border border-black font-bold" onClick={() => deleteRecords(list.id)}>Remove</button>
                            </td>
                        </tr>
                    </tbody>
              )
             }) 
           } 
            </table>
           </div>          
        </div> 
        </div><div className="h-2 w-25  bg-green-500 rounded-b-md"></div>
        </div>
        <div className="flex mt-2 text-red-500 items-center justify-center">*Only one record will be stored per day</div></div>
        </Layout>
    )
}


export {Track};