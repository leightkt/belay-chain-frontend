import './QRcode.css'
import QRCode from 'qrcode.react'
import { Link } from 'react-router-dom'

function QRcode ({ location }) {
    const { hash } = location.state

    const urlString = `/verifycert/${hash}`
    const url4QR = `http://localhost:3000${urlString}`

    return(
        <section className="qr-section">
            <QRCode value={ url4QR } />
            <Link className="view-cert" to={ urlString } >Scan or Click to Verify</Link>
        </section>
    )
}

export default QRcode