import sniff from "./sniff.png"
import './LookingForProducts.css';

export default function LookingForProducts() {
    return (
        <div className="looking-for-products">
            <h1>Sniffing for products... No products found</h1>
            <img src={sniff} className="looking-for-image" alt="snifff" />
        </div>
    )
}