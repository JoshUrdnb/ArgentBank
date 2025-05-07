import './banner.scss'
import banner from './banner.json'

function Banner() {
    return (
        <div className="banner">
            <section className="banner-content">
                {banner.subtitles.map((line, index) => (
                    <p className="subtitle" key={index}>{line}</p>
                ))}
                <p className="text">{banner.text}</p>
            </section>
        </div>
    )
}

export default Banner