import CertCard from '../Components/CertCard'
import './CertificationsContainer.css'

function CertificationsContainer ({ certifications, role }) {

    const displayCertifications = () => {
        return certifications.map(cert => {
            return <CertCard key={ cert.index } cert={ cert } role={ role }/>
        })
    }

    return(
        <section className="cert-container">
            { displayCertifications() }
        </section>
    )
}

export default CertificationsContainer