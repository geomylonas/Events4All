import classes from "./Footer.module.css"
import { Image } from "react-bootstrap";

export default function FooterDiv(){
    
    
    return(
        
        <footer>
            <div>
                <p>Mylonas<br/> Giorgos
                </p>
                
                <p>Valsamakis<br/> Chrisostomos
                </p>
            </div>
            <div className={classes.image}>
                <div>
                <Image src={require("../../images/logo-mple-aspro.png")} roundedCircle />
                </div>
                
                <div>&copy; BreakPointers 2022 All Rights Reserved</div>
                
            </div>
            <div>
                <p>Thodoris<br/> Maragkoudakis
                </p>
                <p>Katerina<br/> Choutouriadi
                </p>
            </div>
             
        </footer>
    )
}
