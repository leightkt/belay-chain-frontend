import './AdminActivities.css'
import AddANode from '../Components/AddANode'
import { useState, useEffect } from 'react'

const backendNodeURL = 'http://localhost:3001'

function AdminActivities () {
    const [ nodes, setNodes ] = useState([])
    const [ currentNode ] = useState(backendNodeURL)
    const [ message, setMessage ] = useState("")

    useEffect(() => {
        fetch(`${backendNodeURL}/nodes`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": `${localStorage.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                if(result.length > 0) {
                    setNodes(result)
                }
            })
    }, [])

    const handleClick = (event) => {
        event.stopPropagation()
        setMessage("")
        const URL = event.target.parentNode.getAttribute("id")
        switch(event.target.innerText) {
            case "VERIFY CHAIN":
                verifyChain(URL)
                break
            case "RUN CONCENSUS":
                runConcensus(URL)
                break
            default:
                return null
        }

    }

    const verifyChain = (URL) => {
        fetch(`${URL}/validateChain`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": `${localStorage.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setMessage(result.message)
            })
    }

    const runConcensus = (URL) => {
        fetch(`${URL}/concensus`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": `${localStorage.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setMessage(result.message)
            })
    }

    const displayNodes = () => {
        const allNodes = [ currentNode, ...nodes ]
        return allNodes.map(node => {
            return ( 
                <div key={ node } id={ node }>
                    <p>Node: { node }</p>
                    { node === allNodes[0] 
                        ? <p>Current Node</p>
                        : null 
                    }
                    <button className="admin-button">VERIFY CHAIN</button>
                    <button className="admin-button">RUN CONCENSUS</button>
                </div> 
            )
        })
    }

    return (
        <section className="admin-section">
            { message ? <p className="errors admin-message">{ message }</p> : null }
            <div className="nodes" onClick={ handleClick } >{ currentNode ? displayNodes() : null }</div>
            <AddANode />
        </section>
    )
}

export default AdminActivities