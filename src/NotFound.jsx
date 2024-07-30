import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function NotFound(){
    return(
        <Card>
            <CardTitle className="text-center">
                <h1>404</h1>
            </CardTitle>
            <CardBody>
                <h2>Sorry. Unable to locate that.</h2> 
            </CardBody>
        </Card>
    )
}

export default NotFound;