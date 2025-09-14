import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import Header from '../components/Header'

export default function Detail(){
  const { id } = useParams()
  const [contract, setContract] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetch('/contracts.json')
      .then(r=>r.json())
      .then(list=>{
        let c = list.find(x=>x.id===id)
        if(!c){ setError('Not found'); return }
        setContract({
          ...c,
          start: '2023-01-01',
          clauses: [
            { title: 'Termination', summary: 'Requires 60 days notice.' },
            { title: 'Liability', summary: 'Capped at 1 year fees.' }
          ],
          insights: [
            { level:'High', note:'Auto-renewal without explicit notice.' },
            { level:'Medium', note:'Liability cap excludes security breaches.' }
          ]
        })
      })
      .catch(()=>setError('Error fetching'))
  },[id])

  if(error) return <div className="p-6 text-red-600">{error}</div>
  if(!contract) return <div className="p-6">Loading...</div>

  return (
    <div className="flex h-screen">
      <Nav />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 overflow-auto">
          <h2 className="text-2xl mb-2">{contract.name}</h2>
          <div className="text-gray-600 mb-4">{contract.parties}</div>
          <div className="flex gap-4 text-sm mb-6">
            <div>Start: {contract.start}</div>
            <div>Expiry: {contract.expiry}</div>
            <div>Status: {contract.status}</div>
            <div>Risk: {contract.risk}</div>
          </div>
          <h3 className="font-semibold mb-2">Clauses</h3>
          <ul className="list-disc ml-6 mb-4">
            {contract.clauses.map((c,i)=>(<li key={i}>{c.title}: {c.summary}</li>))}
          </ul>
          <h3 className="font-semibold mb-2">Insights</h3>
          <ul className="list-disc ml-6">
            {contract.insights.map((c,i)=>(<li key={i}>{c.level} - {c.note}</li>))}
          </ul>
        </div>
      </div>
    </div>
  )
}
