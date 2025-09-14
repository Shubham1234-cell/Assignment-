import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [risk, setRisk] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5

  useEffect(()=>{
    fetch('/contracts.json')
      .then(r=>r.json())
      .then(d=>{ setContracts(d); setLoading(false) })
      .catch(()=> setLoading(false))
  },[])

  let filtered = contracts.filter(c=>{
    if(search && !(c.name.toLowerCase().includes(search.toLowerCase()) || c.parties.toLowerCase().includes(search.toLowerCase()))) return false
    if(status && c.status !== status) return false
    if(risk && c.risk !== risk) return false
    return true
  })

  let totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  let items = filtered.slice((page-1)*perPage, page*perPage)

  return (
    <div className="flex h-screen">
      <Nav />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 space-y-4 overflow-auto">
          <div className="flex gap-2">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="border p-2 rounded flex-1" />
            <select value={status} onChange={e=>setStatus(e.target.value)} className="border p-2 rounded">
              <option value="">All status</option><option>Active</option><option>Expired</option><option>Renewal Due</option>
            </select>
            <select value={risk} onChange={e=>setRisk(e.target.value)} className="border p-2 rounded">
              <option value="">All risk</option><option>Low</option><option>Medium</option><option>High</option>
            </select>
          </div>

          {loading ? <div>Loading...</div> :
            <div className="bg-white rounded shadow p-3">
              <table className="w-full text-sm">
                <thead><tr><th>Name</th><th>Parties</th><th>Expiry</th><th>Status</th><th>Risk</th></tr></thead>
                <tbody>
                  {items.map(c=>(
                    <tr key={c.id} className="border-t">
                      <td className="py-2"><Link to={'/contracts/'+c.id} className="text-indigo-600">{c.name}</Link></td>
                      <td>{c.parties}</td>
                      <td>{c.expiry}</td>
                      <td>{c.status}</td>
                      <td>{c.risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-3 text-sm">
                <span>Page {page} of {totalPages}</span>
                <div className="space-x-2">
                  <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-2 border rounded">Prev</button>
                  <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-2 border rounded">Next</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
