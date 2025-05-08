import './home.scss'
import Banner from '../../components/banner/Banner.jsx'
import Item from '../../components/item/Item.jsx'
import featuresData from '../../components/item/item.json'

import IconChat from '../../assets/icon-chat.webp'
import IconMoney from '../../assets/icon-money.webp'
import IconSecurity from '../../assets/icon-security.webp'

const iconMap = {
    'icon-chat.webp': IconChat,
    'icon-money.webp': IconMoney,
    'icon-security.webp': IconSecurity
}

export default function Home() {
    return (
        <div className='homepage'>
            <Banner />

            <section className="features">
                {featuresData.map((item, index) => (
                    <Item
                        key={index}
                        icon={iconMap[item.icon]}
                        alt={item.alt}
                        title={item.title}
                        text={item.text}
                    />
                ))}
            </section>
        </div>
    )
}