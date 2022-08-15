import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import axios from "axios"
import "../styles/Homepage.css"



function Homepage() {
    // seting conditional routing
    const navigate = useNavigate()
    // getting data from redux state
    const state = useSelector(state => state.user)
    const [user, setUser] = useState("")
    const [insufficient, setInsufficient] = useState("")
    const [payment, setPayment] = useState({
        amount: "",
        bank: "",
        accountName: "",
        accountNumber: ""
    })
    const [deposit, setDeposit] = useState({
        amount: ""
    })
 
    useEffect(() => {
        if (state) {
            setUser(state)
        }
        else {
            navigate("/login")
        }
     
    }, [state])
    
    const handlePayment = async (e) => {
        e.preventDefault()
        setInsufficient("")
        const total = parseFloat(deposit?.amount || 0) + parseFloat(user?.balance || 0)
        console.log("this is the float", total)
        const userPaymentInfo = {
            ...payment, user: state?.phoneNumber || "07063033152999", balance: total,
            transactionType: "transfer"
        }
        console.log("this is the payment", payment.amount)
        if (total < parseFloat(payment.amount)) {
            setInsufficient("Insufficient fund")
            return
        }
        const res = await axios.post("http://localhost:5000/user/transfer", userPaymentInfo)
        if (res.status === 201 && res.data) {
            alert("congratulations.. transfer successful.")
            console.log(res.data)
        }

    }
    
    //handle deposit payment function
    
    const handleDeposite = async (e) => {
        e.preventDefault()
        const total = parseFloat(deposit.amount) + parseFloat(user?.balance || 0)
        console.log("this is the float", total)
        const userDeposite = {
            ...deposit, user: state?.phoneNumber || "07063033152999", balance: total,
            transactionType: "deposit"
        }
      
        console.log(userDeposite)
        const res = await axios.post("http://localhost:5000/user/deposit", userDeposite)
        if (res.status === 201 && res.data) {
            alert("congratulations.. Deposite successful.")
            console.log(res.data)
        }

    }
    
    const handleLogout = async() => {
        try {
            const res = await axios.get("http://localhost:5000/user/logOut")
            if (res.status === 200) {
                console.log(res.data)
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
      <div className="home_wrapper">
          <h2 className="mb-3">Welcome, {user.fullName}</h2>
          <nav>
              <ul>
              <p>Account Number: {user.phoneNumber}</p>
              <p className="">balance : {user.balance || 0}</p>
              </ul>
              <div>
              <li><Link to="/history" className="btn-sumit">
                Transactions
              </Link></li>
              
              <li><a href="" className="btn" onClick={handleLogout}>
                  Log-Out
              </a></li>
              </div>
              
         </nav>
          <hr />
          <div>
              
              <form onSubmit={handlePayment}>
                  <h2>Transfer Funds</h2>
                  <div className="form-content">
                  <label htmlFor="beneficiary" >Enter Amount:</label>
                      <input value={ payment.amount } required onChange={
                          (e) => setPayment({...payment, amount: e.target.value})
                  }  name="beneficiary" type="number"  placeholder="enter Ammount" />
                  </div>
                  <div className="form-content">
                  <label htmlFor="beneficiary">Beneficiary Account Name:</label>
                      <input value={payment.accountType} onChange={
                          (e) => setPayment({ ...payment,accountName: e.target.value })}
                          name="beneficiary" type="text" required placeholder="enter account Number" />
                  </div>
                  <div className="form-content">
                  <label htmlFor="beneficiaryNumber">Beneficiary Account Number:</label>
                      <input value={payment.accountNumber} required onChange={
                          (e) => setPayment({ ...payment,accountNumber: e.target.value })}
                          name="beneficiaryNumber" type="number" placeholder="enter account Number" />
                  </div>
                  <div className="form-content">
                  <label htmlFor="bank">Benficiary Bank</label>
                      <select required value={payment.bank} onChange={
                          (e) => setPayment({ ...payment, bank: e.target.value })} name="bank" id="select">
                    <option value="">--select bank--</option>
                     <option value="UBA">UBA</option>
                    <option value="sterling">Sterling</option>       
                       <option value="firtBank">First Bank</option>
                        <option  value="Access Bank">Access Bank</option>
                      </select>
                  </div>
                  <div>{ insufficient }</div>
                  <button className="btn-sumit">Submit</button>
             </form>
          </div>
          <div>
          <form onSubmit={handleDeposite} >
                  
          <h2> Deposit  Funds</h2>
                  <div className="form-content">
                  <label htmlFor="beneficiary" className=''>Deposit Amount:</label>
                      <input value= {deposit.amount} name="beneficiary" required type="number" onChange={
                          (e) => setDeposit({
                           ...deposit, amount:e.target.value
                          })
                  } placeholder="enter Amount" />
                  </div>
                
                  <button className="btn-sumit">Submit</button>
             </form>
          </div>
         
          </div>
        
  )
}

export default Homepage