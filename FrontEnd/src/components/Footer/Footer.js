import classes from "./Footer.module.css"
import { Image } from "react-bootstrap";

export default function FooterDiv(){
    
    
    return(
        
        <footer>
            <div>
                <p>Event Manager
                </p>
            </div>
            <div className={classes.image}>
                <div>
                <Image src={require("../../images/logo-mple-aspro.png")} roundedCircle />
                </div>
                
                <div>&copy; SyDreamia 2022 All Rights Reserved</div>
                
            </div>
            <div>
                <p>Event Manager
                </p>
            </div>
             
        </footer>
    )
}
