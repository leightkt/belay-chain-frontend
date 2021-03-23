import './QRcode.css'
import QRCode from 'qrcode.react'
import { Link } from 'react-router-dom'

function QRcode ({ location }) {
    const { hash } = location.state

    const urlString = `/verifycert/${hash}`
    const url4QR = `http://localhost:3000${urlString}`
    console.log(url4QR)

    return(
        <section className="qr-section">
            <QRCode value={ urlString } />
            <Link className="view-cert" to={ urlString } >Scan or Click to Verify</Link>
        </section>
    )
}

export default QRcode