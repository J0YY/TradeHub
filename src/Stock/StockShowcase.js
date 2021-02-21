import LineGraph from "./LineGraph.js";
import { ReactComponent as AppleIcon } from "../Assets/Icons/stock_icons/logos_apple.svg"
import { ReactComponent as ShopifyIcon } from "../Assets/Icons/stock_icons/logos_shopify.svg"
import { ReactComponent as BTCIcon } from "../Assets/Icons/stock_icons/logos_btc.svg"
import { ReactComponent as UpIcon } from "../Assets/Icons/up-arrow.svg"
import "./StockShowcase.scss"


const Icons = [{
    icon: <AppleIcon />,
    name: "Apple",
    ticker: "APPL"
},
{
    icon: <ShopifyIcon />,
    name: "Shopify",
    ticker: "SHOP"
},
{
    icon: <BTCIcon />,
    name: "Bitcoin",
    ticker: "BTC"
}]

function StockIcon({ icon, name, ticker }) {
    return (
        <div className="showcase-stockinfo">
            <div className="stock-icon">
                {icon}
            </div>
            <div className="stock-info">
                <p className="name">{name}</p>
                <p className="ticker">{ticker}</p>
            </div>
        </div>
    )
}

function PriceInfo({ ticker }) {
    let price = 15000; // get price using ticker
    let changeType = "down";
    let change = 5.0
    let changePercent = 3.1

    let [priceInt, priceFloat] = price.toString().split(".")
    let priceStr = '$' + priceInt.replace(/(\d{3})/g, "$1,") + "." + (priceFloat != undefined ? priceFloat : "")
    console.log(toString(price).replace(/(?<!\.)(\d{3})/g, ","))
    return (
        <div className="showcase-price">
            <div>
                <p>{`${priceStr}`}</p>
                <UpIcon />
            </div>
            <div>
                <p>{`${changeType == "up" ? "+" : "-"}${change}`}</p>
                <div className="divider" style={{ width: "2px" }} />
                <p>{changePercent + "%"}</p>
            </div>
        </div>
    )
}
function StockShowcaseElement({ icon, name, ticker }) {
    return (
        <div className="stock-showcase-element">
            <StockIcon icon={icon} name={name} ticker={ticker} />
            <div />
            {/* <LineGraph /> */}
            <PriceInfo ticker={ticker} />
        </div>
    )
}

function StockShowcase() {
    return (
        <>
            {Icons.map(v => <StockShowcaseElement icon={v.icon} name={v.name} ticker={v.ticker} />)}
        </>
    )
}

export default StockShowcase;