import './CertCard.css'

function CertCard ({ cert }) {
    const timestamp = cert.timestamp
    const date = new Date(timestamp);


    return (
        <div className="cert-card">
            <p>{ `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` }</p>
            <p>{ cert.index }</p>
            <p>{ cert.gym }</p>
            <p>{ cert.data.cert_type }</p>
        </div>
    )
}

export default CertCard