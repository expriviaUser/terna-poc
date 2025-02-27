import {NavLink, useParams} from "react-router-dom";
import React, {useState} from "react";
import {Countdown} from "../components/Countdown";
import './Reports.css';
import '../App.css';
import {aggiungiMioReport, mieiReports} from "./reports";
import {ReportisticaInspector} from "./ReportisticaInspector";
import {Button, Form, InputGroup, Row} from "react-bootstrap";
import {AddReportModal} from "./AddReportModal";

export function ReportisticaPersonale() {
    const {reportId} = useParams();
    const report = mieiReports[reportId];
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="container-reports">
            <AddReportModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={() => {
                    aggiungiMioReport();
                    setModalShow(false);
                }}
            />
            <div className="date-filter">
                <Countdown onRefresh={console.log}/>
            </div>
            <section className="container-reports-flex">
                <section className="content-reports">
                    <h3 className='page-title'>I miei Report</h3>
                    <Row>
                        <div className='col-md-9'>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Cerca"
                                />
                            </InputGroup>
                        </div>
                        <div className='col-md-3'>
                            <Button onClick={() => setModalShow(true)}>Nuovo report +</Button>
                        </div>
                    </Row>
                    <div className='mieiReports'>
                        {mieiReports.map((report, id) => (
                            <NavLink key={id} className={'mioReport'} to={`/reportistica/OWN/${id}`}>
                                <div>
                                    <div className="mioReport-name">{report.name}</div>
                                    <div className="mioReport-date">{report.date}</div>
                                </div>
                                <div className="mioReport-filters">
                                    {report.filters.map(filter => (
                                        <button key={filter} className="filter">{filter}</button>
                                    ))}
                                </div>
                                <div className="mioReport-prompt">
                                    {report.prompt}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </section>
                {report && <ReportisticaInspector report={report}/>}
            </section>
        </div>
    )
}
