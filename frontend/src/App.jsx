import React, { useState } from 'react'
import axios from 'axios'
import { IoIosMoon } from "react-icons/io";
import vite from '../public/vite.svg'

import { IoSunny  } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter  } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";




const App = () => {
  const [dark, setdark] = useState(false)
  const [popUp, setpopUp] = useState(false)
  const [emptyApi, setEmptyApi] = useState(false)
  const [fetched, setfetched] = useState(false)
  const [clear, setclear] = useState(false)
  const [customForm, setcustomForm] = useState(false)
  const [alert, setalert] = useState(false)
  const [data, setdata] = useState([])
  const [statusCode, setstatusCode] = useState()
  const [config, setconfig] = useState()
  const [headers, setheaders] = useState()
  // const [customNameOne, setcustomNameOne] = useState('')
  // const [customNameTwo, setcustomNameTwo] = useState('')
  // const [limit, setlimit] = useState('')


  axios.defaults.baseURL = 'https://apig-backend.onrender.com';

  const generateApi = async () => {
    try {
      await axios.post('/generateApi')
      console.log('post');
      setpopUp(true)

      setTimeout(() => {
        setpopUp(false)
      }, 2000);
      
    } catch (error) {
      console.log(`error while creating api : ${error}`);
      
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get('/books')

      if(response.data.length === 0){
        setEmptyApi(true)

        setTimeout(() => {
          setEmptyApi(false)
        }, 2000);
        return
      }
      setfetched(true)
      setdata(response.data)
      setconfig(response.config)
      setstatusCode(response.status)
      setheaders(response.headers)

      setTimeout(() => {
        setfetched(false)
      }, 2000);

      
    } catch (error) {
      console.log(`error while getting data from api : ${error}`);
      
    }
    
  }

  const clearApi = async () => {
    try {
      await axios.delete('/delete')
      setclear(true)
      setdata([])

      setTimeout(() => {
        setclear(false)
      }, 2000);
    } catch (error) {
      console.log(`error while clearing api ${error}`);
      
    }
  }

  // const form = async () => {
  //   try {
  //     setcustomForm(true)
  //     setstatusCode(false)

  //   } catch (error) {
  //     console.log(`error in form creation ${error}`);
      
  //   }
  // }

  // const formSubmit = async (e) => {
  //   try {
  //     e.preventDefault();

  //     // const formData = {
  //     //   customNameOne,
  //     //   customNameTwo,
  //     //   limit
  //     // }
  //     // await axios.post('/generateApi', formData)
  //     setalert(true)
  //     setcustomForm(false)
  //     // console.log(limit);
  //     // form data are not cleared after submitting it => fix tomorrow 
  //     setTimeout(() => {
  //       setalert(false)
  //     }, 2000);
  //     setcustomNameOne('')
  //     setcustomNameTwo('')
  //     setlimit('')
  //     // data isnot going to backend 

      
  //   } catch (error) {
  //     console.log(`error while submitting form : ${error}`);
      
  //   }
  // }

  const darkMode = () => {
    setdark(!dark)
    document.body.classList.toggle("dark")
  }



  return (
    <div className='dark:bg-[#0f172a] bg-[#ffffff] min-h-screen dark:text-white font-custom '>
      <div className='pt-3 sm:pt-10 text-xl sm:text-2xl mx-4 md:mx-24 mb-2 flex justify-between sm:mx-56'>
        <div className=''>
          <a href="https://bento.me/animeshkakoty" target='_blanck'><img className='w-14 sm:w-18 rounded-xl' src={vite} alt="my IMAGE" /></a>
        </div>
        <div className='flex gap-2 sm:gap-10 pt-5'>
          <a href="https://github.com/kakotyanimesh/apiG" target='_blanck'><FaGithub /></a>
          <a href="https://www.linkedin.com/in/animesh-kakoty-3465791a6/" target='_blanck'><FaLinkedinIn  /></a>
          <a href="https://x.com/_animeshkakoty" target='_blanck'><FaXTwitter  /></a>
          <button className='h-2' onClick={darkMode}>
            {
              dark && <IoSunny />
            }
            {
              !dark && <IoIosMoon/>
            }
        </button>
        </div>
      </div>

      <div className='flex justify-center items-center gap-10 text-2xl font-semibold mb-10'>
        <h1 className='mt-10'>Make Your Own API</h1>
      </div>

      {/* new div */}
      <div className='flex justify-center items-center gap-3 sm:gap-20'>
        <button className='dark:bg-gray-600 bg-[#0f172a] text-[#ffffff]  p-1 sm:p-2 rounded-lg' onClick={generateApi}>Generate API</button>
        <button className='dark:bg-gray-600 bg-[#0f172a] text-[#ffffff]  p-1 rounded-lg sm:p-2' onClick={getData}>Get Data</button>
        <button className='dark:bg-gray-600 bg-[#0f172a] text-[#ffffff]  p-1 rounded-lg sm:p-2' onClick={clearApi}>Clear API</button>
        <button className='dark:bg-gray-600 bg-[#0f172a] text-[#ffffff]  p-1 rounded-lg sm:p-2' >CUSTOM</button>
      </div>

      {/* rendering part */}

      {/* pop up for everything */}
      <div className='relative'>
        {popUp && (
          <div className='dark:bg-[#229799] bg-[#9DBDFF] inline-block sm:p-3 p-2 text-sm sm:text-lg mt-6 rounded-r-xl absolute '>
            <h1>Api Created Successfully ! </h1>
          </div>
        )}
        {
          emptyApi && (
            <div className='dark:bg-[#229799] bg-[#9DBDFF] inline-block sm:p-3 p-2 text-sm sm:text-lg mt-6 rounded-r-xl absolute'>
            <h1>Api Is not created yet ! </h1>
          </div>
          )
        }
        {
          fetched && (
            <div className='dark:bg-[#229799] bg-[#9DBDFF] inline-block sm:p-3 p-2 text-sm sm:text-lg mt-6 rounded-r-xl absolute'>
            <h1>Data fetched Successfully  </h1>
          </div>
          )
        }
        {
          clear && (
            <div className='dark:bg-[#229799] bg-[#9DBDFF] inline-block sm:p-3 p-2 text-sm sm:text-lg mt-6 rounded-r-xl absolute'>
            <h1>API Cleared Successfully  </h1>
          </div>
          )
        }
        {
          alert && (
            <div className='dark:bg-[#229799] bg-[#9DBDFF] inline-block sm:p-3 p-2 text-sm sm:text-lg mt-6 rounded-r-xl absolute'>
            <h1>Creating...  </h1>
          </div>
          )
        }
        
      </div>

       {/* response rendering */}

       <div className='mt-20 flex justify-center items-center dark:text-white text-black'>
        {statusCode && (
          <div className='text-center w-full max-w-screen-sm '>
            <div className='mb-5 border-2 border-[#0f172a] dark:border-white box-border p-2 rounded-lg'>
              <h1 className='sm:text-lg font-[600] '>Status Code</h1>
              <h1 className='dark:text-[#38bdf8]'>{statusCode}</h1>
            </div>
            <div className='mb-5 border-2 border-[#0f172a] dark:border-white box-border p-2 rounded-lg'>
              <h1 className='sm:text-lg font-[600] '>URL to API</h1>
              <a href='https://apig-backend.onrender.com/books' target='_blanck' className='dark:text-[#38bdf8]'>https://apig-backend.onrender.com/books</a>
            </div>
            <div className='mb-5 border-2 box-border border-[#0f172a] dark:border-white p-2 rounded-lg'>
              <h1 className='font-[600] pb-3'>Header having </h1>
              <pre className='font-custom w-full h-auto p-0 m-0 whitespace-pre-wrap break-words dark:text-[#38bdf8] overflow-x-auto'>{JSON.stringify(headers)}</pre>
            </div>
            <div className='mb-5 border-2 box-border border-[#0f172a] dark:border-white p-2 rounded-lg'>
              <h1 className='font-[600] pb-4'>The data from our Own API </h1> 
              <pre className='font-custom w-full h-auto p-0 m-0 whitespace-pre-wrap break-words overflow-x-auto dark:text-[#38bdf8]'>{JSON.stringify(data)}</pre>
            </div>
            <div className='mb-5 border-2 box-border border-[#0f172a] dark:border-white p-2 rounded-lg'>
              <h1 className='font-[600] pb-3' >Our Config File Consists of </h1>
              <pre className='font-custom  w-full h-auto p-0 m-0 whitespace-pre-wrap break-words overflow-x-auto dark:text-[#38bdf8]'>{JSON.stringify(config)}</pre>
            </div>
          </div>
        )}
       </div>

       

    </div>
  )
}

export default App