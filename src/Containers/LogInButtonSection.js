import './LogInButtonSection.css'

function LogInButtonSection ({ setRole }) {

    const handleClick = (event) => {
        switch(event.target.id) {
            case "gym-button":
                setRole("gym")
                break
            case "member-button":
                setRole("member")
                break
            case "admin-button":
                setRole("admin")
                break
            default:
                return null
        }


    }

    return(
        <section onClick={ handleClick }>
            <button id="gym-button">GYM</button>
            <button id="member-button">MEMBER</button>
            <button id="admin-button">ADMINISTRATOR</button>
        </section>
    )
}

export default LogInButtonSection