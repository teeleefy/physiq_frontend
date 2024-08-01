import {
    Card,
    CardBody,
    CardText,
    ListGroupItem
  } from "reactstrap";
  import { NavLink } from "react-router-dom";
  import '../styles/Insurance.css'


function Insurance({insurance, memberId}){

    function renderInsuredName(){
        if(insurance.insuredName){
            return (
                <>
                 <p><b>Insured Name:</b> {insurance.insuredName}</p>
                </>
            )
        }
    }

    function renderStartDate(){
        if(insurance.startDate){
            return (
                <>
                 <p><b>Start Date:</b> {insurance.startDate}</p>
                </>
            )
        }
    }

    function renderEndDate(){
        if(insurance.endDate){
            return (
                <>
                 <p><b>End Date:</b> {insurance.endDate}</p>
                </>
            )
        }
    }

    function renderGroupNum(){
        if(insurance.groupNum){
            return (
                <>
                 <p><b>Group Number:</b> {insurance.groupNum}</p>
                </>
            )
        }
    }

    function renderContractNum(){
        if(insurance.contractNum){
            return (
                <>
                 <p><b>Contract Number:</b> {insurance.contractNum}</p>
                </>
            )
        }
    }

    function renderNotes(){
        if(insurance.notes){
            return (
                <>
                 <p><b>Notes:</b> {insurance.notes}</p>
                </>
            )
        }
    }

    return(
        <>
            <ListGroupItem >
                <Card className="Insurance-card">
                    <CardBody>
                        <CardText>
                            <p><b>Insurance Name:</b> <NavLink className="InsuranceCard-name" to={`/member/${memberId}/insurance/${insurance.id}`} key={insurance.id}>
                                {insurance.companyName}
                            </NavLink></p>
                            <p><b>Insurance Type:</b> {insurance.type}</p>
                            {renderInsuredName()}
                            {renderStartDate()}
                            {renderEndDate()}
                            {renderGroupNum()}
                            {renderContractNum()}
                            {renderNotes()}
                        </CardText>
                    </CardBody>
                </Card>
            </ListGroupItem>
        </>
     )
}

export default Insurance;