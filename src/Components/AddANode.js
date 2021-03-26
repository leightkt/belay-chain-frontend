import './AddANode.css'
import { Component } from 'react'

const backendNodeURL = 'http://localhost:3001/'

class AddANode extends Component {
    state = {
        url: "",
        message: ""
    }

    handleChange = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    addNode = (event) => {
        event.preventDefault()
        event.stopPropagation()

        fetch(`${backendNodeURL}register-and-broadcast-node`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Authorization": `${localStorage.token}`
            },
            body: JSON.stringify({
                nodeURL: this.state.url
            })
        })
            .then(response => response.json())
            .then(result => {
                this.setState({
                    message: result.message,
                    url: ""
                })
            })
    }

    render() {
        return (
            <form className="add-a-node" onSubmit={ this.addNode }>
                <label>Node URL</label>
                <input name="url" placeholder="NODE URL" value={ this.state.url } onChange={ this.handleChange } className="url-input" required/>
                <input type="submit" value="ADD NODE" />
                { this.state.message ? <p className="errors">{ this.state.message }</p> : null }
            </form>
        )    
    }
    
}

export default AddANode