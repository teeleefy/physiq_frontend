import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
// import '../styles/Allergy.css'


function Insurance({insurance, memberId}){

    return(
        <>
            <ListGroupItem>
            <Card className="InsuranceCard-card">
                <CardBody>
                    <CardText>
                        <p><b>Insurance Name:</b> <NavLink className="InsuranceCard-name" to={`/member/${memberId}/insurance/${insurance.id}`} key={insurance.id}>
                            {insurance.companyName}
                        </NavLink></p>
                        <p><b>Insured Name:</b> {insurance.insuredName}</p>
                        <p><b>Type:</b> {insurance.type}</p>
                        <p><b>Start Date:</b> {insurance.startDate}</p>
                        <p><b>End Date:</b> {insurance.endDate}</p>
                        <p><b>Group Number:</b> {insurance.groupNum}</p>
                        <p><b>Contract Number:</b> {insurance.contractNum}</p>
                        <p><b>Notes:</b> {insurance.notes}</p>
                    </CardText>
                </CardBody>
            </Card>
            </ListGroupItem>
        </>
     )
}

export default Insurance;