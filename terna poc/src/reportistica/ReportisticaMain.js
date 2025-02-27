import {useParams} from "react-router-dom";
import React, {useMemo} from "react";
import {reports} from "./reports";
import {Countdown} from "../components/Countdown";

export function ReportisticaMain() {
    const {id} = useParams();
    const data = useMemo(() => reports.find(report => report.id === id), [id]);

    return (
        <section className="content">
            <div className="date-filter">
                <Countdown onRefresh={console.log}/>
            </div>
            <h3 className='page-title'><b>Preset:</b> {data.name}</h3>
            <div className="applied-filters">
                Filtri applicati
                {data.filters.map(filter => (
                    <button key={filter} className="filter">{filter}</button>
                ))}
            </div>
            <div className="applied-filters">
                Prompt applicati
                <div>
                    {data.prompts.map(prompt => (
                        <div key={prompt} className="prompt">{prompt}</div>
                    ))}
                </div>
            </div>
            <div className="reports">
                {data.reports.map((report, index) => (
                    <button key={index} className="report">{report.name} {report.date}</button>
                ))}
            </div>
        </section>
    )
}