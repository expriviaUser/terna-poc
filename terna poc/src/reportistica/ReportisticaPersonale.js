import {NavLink, useParams} from "react-router-dom";
import React from "react";
import {Countdown} from "../components/Countdown";
import './Reports.css';
import '../App.css';
import {mieiReports} from "./reports";
import {ReportisticaInspector} from "./ReportisticaInspector";

export function ReportisticaPersonale() {
    const {reportId} = useParams();

    const report = mieiReports[reportId];
    console.log(report);


    return (
        <div className="container-reports">
            <div className="date-filter">
                <Countdown onRefresh={console.log}/>
            </div>
            <section className="container-reports-flex">
                <section className="content-reports">
                    <h3 className='page-title'>I miei Report</h3>
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
