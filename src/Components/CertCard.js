import './CertCard.css'

function CertCard ({ cert, role }) {
    const timestamp = cert.timestamp
    const date = new Date(timestamp);


    return (
        <div className="cert-card">
            <p>{ `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` }</p>
            { role === "gym"
                ?   <>
                        <p>{ cert.data.user_member_number }</p>
                        <p>{ cert.first_name }</p>
                        <p>{ cert.last_name }</p>
                        <p>{ cert.email }</p>
                    </>
                : <p>{ cert.gym }</p>
            }
            <p>{ cert.data.cert_type }</p>
        </div>
    )
}

export default CertCard