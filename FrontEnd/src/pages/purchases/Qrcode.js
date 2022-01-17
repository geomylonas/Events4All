import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function Qr(props){
    const [src, setSrc] = useState('');

    useEffect(() => {
    QRCode.toDataURL(`${JSON.stringify(props)}`).then(data=>{
        setSrc(data);
        console.log(props)
    });
},[]);


return(
    <img style={{height: "200px"}} src={src}></img>
)

}