import Modal from "react-bootstrap/Modal";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export function AddReportModal(props) {
    return <Modal {...props} backdrop={false} size='xl'>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Nuovo report</Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
            <Container>
                <Row className="pt-3 pb-3">
                    <Col xs={12} md={4}>
                        <MySelect label={'Nome report'}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <MySelect label={'Aree zonali'}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <MySelect label={'Tensione'}/>
                    </Col>
                </Row>
                <Row className="pt-3 pb-3">
                    <Col xs={12} md={4}>
                        <MySelect label={'Modelli'}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <MySelect label={'Protocolli'}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <MySelect label={'Fornitore'}/>
                    </Col>
                </Row>
                <Row className="pt-3 pb-3">
                    <Col xs={12} md={4}>
                        <MySelect label={'Stato'}/>
                    </Col>

                </Row>


            </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide} variant='link'>Annulla</Button>
            <Button onClick={props.onSubmit}>Crea report</Button>
        </Modal.Footer>
    </Modal>
}

function MySelect(props) {
    return <>
        <label><b>{props.label}</b>*</label>
        <Form.Select>
            <option>Placeholder text</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
    </>
}