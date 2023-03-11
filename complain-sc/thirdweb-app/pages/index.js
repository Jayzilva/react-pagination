import { useAddress, useContract, useContractRead, useContractWrite,ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import React, { useState } from 'react';

export default function Home() {
  const address = useAddress();
  const contractAdd ="0xD6D55c31D6b917D692A253eEf668448944eE9453";
  const { contract } = useContract(contractAdd);
  //const { data: officer } = useContractRead(contract, "officer");
  //const { data: nextId } = useContractRead(contract, "nextId")
  const { mutateAsync: fileComplaint } = useContractWrite(contract, "fileComplaint");

  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data: Complaints } = useContractRead(contract, "Complaints", id)
  

  const handleComplaint = async () => {
    //const notification = toast.loading("Filing Complaint");
    try {
        const data = await fileComplaint([title, description]);
  
        console.info("contract call successs", data);
        setTitle("");
        setDescription("");
    } catch (err) {

        console.error("contract call failure", err);
    }
}
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <ConnectWallet />
      <p>Com</p>
      <input type="text"  placeholder='Enter Title Here' onChange={(e) => { setTitle(e.target.value) }} />
      <input type="text"  placeholder='Enter Description Here'onChange={(e) => { setDescription(e.target.value) }} />
      <button className="button-common hover:bg-blue-900" onClick={handleComplaint}>File Complaint</button>
      
      <hr/>
      <input type="number" placeholder='Enter Complaint ID'
                        onChange={(e) => { setId(e.target.value) }} />

{Complaints && Complaints.title && (
                <div className="status-render-container md:w-[600px]">
                    <p className='status-render-title'>Complaint Details:{Complaints.description}</p>
                    <p className='status-render-text'>Complaint Id: {(Complaints.id).toString()}</p>
                    <p className='status-render-text'>Complaint by: {(Complaints.complaintRegisteredBy).toString()}</p>
                    <p className='status-render-text'>Complaint Title: {Complaints.title}</p>
                    <p className='status-render-text'>Approval Status: {Complaints.isApproved ? "Approved" : !Complaints.exists ? "Declined" : "Approval Pending"}</p>
                    <p className='status-render-text'>Approval Remark: {Complaints.approvalRemark}</p>
                    <p className='status-render-text'>Resolution Status: {Complaints.isResolved ? "Resolved" : "Resolution pending"}</p>
                    <p className='status-render-text mb-2'>Resolution Remark: {Complaints.resolutionRemark}</p>
                
              
                </div>
            )}
          
      </main>
    </div>
  );
}