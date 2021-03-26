import './AdminActivities.css'
import AddANode from '../Components/AddANode'
import { useState, useEffect } from 'react'


function AdminActivities () {
    const [ nodes, setNodes ] = useState([])

    useEffect(() => {
        // run fetch here
    }, [])

    const handleClick = (event) => {
        event.stopPropagation()
        switch(event.target.innerText) {
            case "VERIFY CHAIN":
                verifyChain()
                break
            case "RUN CONCENSUS":
                runConensus()
                break
            default:
                return null
        }

    }

    const verifyChain = () => {

    }

    const runConensus = () => {

    }

    const displayNodes = () => {

    }

    return (
        <section className="admin-section" onClick={ handleClick }>
            <div className="nodes">{nodes ? displayNodes : null }</div>
            <button className="admin-button">VERIFY CHAIN</button>
            <button className="admin-button">RUN CONCENSUS</button>
            <AddANode />
        </section>
    )
}

export default AdminActivities