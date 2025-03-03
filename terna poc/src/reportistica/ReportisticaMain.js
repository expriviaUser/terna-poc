import {Navigate, NavLink, useParams} from "react-router-dom";
import React, {useMemo} from "react";
import {reports} from "./reports";
import {Countdown} from "../components/Countdown";
import './Reports.css';
import '../App.css';
import {ReportisticaInspector} from "./ReportisticaInspector";
import star from "../assets/star.svg";
import pdf from "../assets/pdficon.svg";

export function ReportisticaMain() {
    const {id, reportId} = useParams();
    const data = useMemo(() => reports.find(report => report.id === id), [id]);

    if (data == null) {
        return <Navigate to={`/reportistica/${reports[0].id}/0`}/>
    }

    const report = data.reports[reportId];
    if (report == null) {
        return <Navigate to={`/reportistica/${id}/0`}/>
    }

    return (
        <div className="container-reports">
            <Countdown onRefresh={console.log}/>
            <section className="container-reports-flex">
                <section className="content-reports">
                    <h3 className='page-title'><b>Preset:</b> {data.name}</h3>

                    <div className="content-reports-child">
                        <h5>Filtri applicati</h5>
                        <div className="applied-filters">
                            {data.filters.map(filter => (
                                <button key={filter} className="filter">{filter}</button>
                            ))}
                        </div>
                    </div>

                    <div className="content-reports-child">
                        <h5>Prompt applicati</h5>
                        <div className="applied-filters">
                            <div className="prompt">
                                <img src={star}/>
                                {data.prompt}</div>
                        </div>
                    </div>

                    <div className="content-reports-child">
                        <h5>Report</h5>
                        <div className="reports">
                            {data.reports.map((report, index) => (
                                <NavLink to={`/reportistica/${data.id}/${index}`} key={index} className="report">
                                    <img src={pdf} />
                                    <div>
                                        <div className='report-title'>{report.name}</div>
                                        <div className='report-date'>{report.date}</div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </section>
                {report && <ReportisticaInspector report={report}/>}
            </section>
        </div>
    )
}
