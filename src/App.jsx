import { useState } from 'react'
import axios from 'axios'
import {useEffect} from 'react'

import './App.css'

function App() {
  let [tableData,setTableData]=useState();
  let [currentPage,setCurrentPage]=useState(1);
  let [rowPerPage,setRowPerPage]=useState(10);
  let lastIndex=currentPage*rowPerPage;
  let firstIndex=lastIndex-rowPerPage;
  let currentPageData=tableData?.slice(firstIndex,lastIndex);
  let totalPages=Math.ceil((tableData?.length||0)/rowPerPage)
  

  useEffect(()=>{
    axios.get("https://dummyjson.com/users/?limit=0").then((response)=>{
      console.log(response);
      console.log("Hello")
      setTableData(response.data.users);
    })
  },[])

  const handlePrev=()=>{
    setCurrentPage((prev)=>Math.max(prev-1,1))
  }

  const handleNext=()=>{
    setCurrentPage((prev)=>Math.min(prev+1,totalPages))
  }

  const handleClick=(pagenumber)=>{
    setCurrentPage(pagenumber)
  }
  

  return (
    <>
    <div>
      <table className=' border border-gray-300 w-full text-center '>
        <thead className='bg-gray-200 border-b-2 border-gray-300 justify-center items-center'>
          <th className='py-2 px-8'>Name</th>
          <th className='py-2 px-8'>Email</th>
          <th className='py-2 px-8'>Age</th>
          <th className='py-2 px-8'>Gender</th>
        </thead>


        <tbody>
          {currentPageData?.map((value,index)=>{
            return(
              <tr key={index} className='border-b border-gray-300'>
                <td className='py-2 px-8'>{value.firstName} {value.lastName}</td>
                <td className='py-2 px-8'>{value.email}</td>
                <td className='py-2 px-8'>{value.age}</td>
                <td className='py-2 px-8'>{value.gender}</td>
              </tr>
            )
          })}

        </tbody>
      </table>

      <div className='flex justify-center items-center mt-5 gap-6'>
        <button className='py-2 px-4 w-20 border border-gray-300 bg-green-300 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed' onClick={handlePrev} disabled={currentPage===1}>
          Previous
        </button>
        {Array.from({length:totalPages},(_,index)=>(
          <button className={currentPage===index+1 ? "py-2 px-4 w-9 border border-blue-300 bg-blue-200 " : "py-2 px-4 w-9 border border-gray-300 bg-green-300 hover:bg-green-400 gap-5"} onClick={()=>{handleClick(index+1)}}  key={index} >
            {index+1}
          </button>
        ))}
        <button className='py-2 px-4 w-15 border border-gray-300 bg-green-300 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed' onClick={handleNext} disabled={currentPage===totalPages}>Next</button>
      </div>
      
      
    </div>
      
    </>
  )
}

export default App
