import CustomerForm from "../../components/CustomerForm/customerForm";
import OrganizerForm from "../../components/OrganizerForm/OrganizerForm";
import "./Register.css"





export default function RegisterPage() {


    return (
        <div className="registerArea">
            <div className="sectionForm">
                <CustomerForm />
            </div>
            <div className="sectionForm">
                <OrganizerForm />
            </div>
        </div>
    )
}