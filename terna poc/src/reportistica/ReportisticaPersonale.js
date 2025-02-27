import {NavLink, useParams} from "react-router-dom";
import React from "react";
import {Countdown} from "../components/Countdown";
import './Reports.css';
import '../App.css';
import {mieiReports} from "./reports";
import {ReportisticaInspector} from "./ReportisticaInspector";
import {Button, Form, InputGroup} from "react-bootstrap";

export function ReportisticaPersonale() {
    const {reportId} = useParams();
    const report = mieiReports[reportId];

    return (
        <div className="container-reports">
            <div className="date-filter">
                <Countdown onRefresh={console.log}/>
            </div>
            <section className="container-reports-flex">
                <section className="content-reports">
                    <h3 className='page-title'>I miei Report</h3>
                    <RepHeader/>
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


function RepHeader(props) {
    return <div className='row'>
        <div className='col-md-9'>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Cerca"
                />
            </InputGroup>

        </div>
        <div className='col-md-3'>
            <Button>Nuovo report +</Button>
        </div>

    </div>
}