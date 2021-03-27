import './DeleteAccount.css'

function DeleteAccount ({ deleteAccount, toggleConfirmDelete }) {

    return(
        <div className="delete-account">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={ deleteAccount }>CONFIRM</button>
            <button onClick={ toggleConfirmDelete }>CANCEL</button>
        </div>
    )
}

export default DeleteAccount