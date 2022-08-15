import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useSelector } from "react-redux"
import "../styles/History.css"

function History() {
    const [transfers, setTransfers] = useState([])
    const [deposites, setDeposites] = useState([])
    const [depositeArray, setDepositeArray] = useState([])
    const [transferArray, setTransferArray] = useState([])
    const user = useSelector(state => state?.user)
  
   
    const generateTransfers = () => {
       
 return transfers.map((i,j) => {
            return <>
                <tr><td>Amount</td><td>{i.amount}</td></tr>
                <tr><td>Account Number</td><td>{ i.accountNumber}</td></tr>
                <tr><td>Account Name</td><td>{i.accountName}</td></tr>
                <tr><td>Bank</td><td>{i.bank}</td></tr>
               <tr> <hr /></tr>
            </>
   })
    }
const generateDeposits = () => {
            
return deposites.map((i,j) => {
        return <>
            <tr><td>Amount</td><td>{i.amount}</td></tr>
            <tr><td>Date</td><td>{ i.createdAt}</td></tr>
            <tr><hr /></tr>
        </>
})
    }
    
    const getHistory = async () => {
        
        try {
            const res = await axios.post("http://localhost:5000/user/history", {user:"joshua"}) 
            console.log("code is running", res)
            if (res.status === 201 && res.data) {
                const { transferHistory, depositHistory } = res.data
                console.log(transferArray, depositHistory)
            
            setTransfers([...transferHistory])
            setDeposites([...depositHistory])
            console.log(deposites, transfers)
            if (deposites.length > 0 || transfers.length > 0) {
                console.log("yess")
                const newTransferArray =  generateTransfers()
                const newDepositeArray = generateDeposits()
                setDepositeArray([...newDepositeArray])
                setTransferArray([...newTransferArray])
           
             }

        }
        } catch (error) {
            console.log(error.message)
        }
    }
    console.log("this are the transfers",depositeArray,"this are the deposits", transferArray)
 
    
    useEffect(() => {
        getHistory()
        console.log("helloe 2")
       },[])
    
    const spinners = () => {
         return   <div class="spinner-border" role="status">
             <span class="sr-only">
                Loadign...
         </span>
       </div>
     }
  return (
      <div className='history'>
          {(depositeArray.length > 0 && transferArray.length > 0) ? 
          (<div>   
            <div className="transfer">
            <h2>
             Transaction History
            </h2>
            <table>
                <caption> Transfers</caption>
                    <tbody>
                        {transfers.length > 0 ? transferArray  :
                <tr className="comment"><td colSpan={3}>No Transfer transactions</td></tr>  }
               </tbody>
            </table>
  
            </div>
            <div className="deposit">
            <table>
                <caption> Deposits</caption>
                    <tbody>
                    {deposites.length > 0 ? depositeArray :
                <tr className="comment"><td>No Deposite transactions</td></tr>  }
                </tbody>
                </table>
          </div>
          </div>
          )
              : <div className="laoding">{ spinners }</div>
            }
     </div>)
}

export default History