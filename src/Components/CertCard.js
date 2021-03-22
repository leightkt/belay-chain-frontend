import './CertCard.css'

function CertCard ({ cert }) {
    return (
        <div className="cert-card">
            <p>{ cert.index }</p>
            <p>{ cert.data.gym_id }</p>
            <p>{ cert.data.gym_member_id }</p>
            <p>{ cert.data.cert_type }</p>
        </div>
    )
}

export default CertCard