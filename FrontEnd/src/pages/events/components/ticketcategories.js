
import React, {useEffect,useState} from "react";
import axios from "axios";




export default function TicketCategories(){
    const [categories, setCategories] = useState([]);
      
      
      
      
    useEffect(() => {
      fetchCategories();
    }, []);
    const fetchCategories = () => {
      axios
        .get('https://localhost:44359/api/Categories/'
        )
        .then((res) => {
          console.log(res);
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  
    };
}
