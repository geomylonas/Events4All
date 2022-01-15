import { Image } from "react-bootstrap";
import "./SuccessPayment.css";




export default function SuccessPayment(){
    return(
        <div id="successpayment">
            <Image src={require("../../images/success.png")} roundedCircle />
            <h4>Your Purchase Completed Successfully!</h4>
        </div>
    )
}