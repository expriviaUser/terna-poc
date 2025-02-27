import {FilterGroup} from "../components/FilterGroup";
import React from "react";
import {reports} from "./reports";
import {Link} from "react-router-dom";

export function ReportisticaSide() {

    return <aside className="filters">
        <h2>Elenco report</h2>
        <FilterGroup title='Preset (modelli)'>
            <ul>
                {reports.map(report => {
                    return <li key={report.name}><Link to={`/reportistica/${report.id}`}>{report.name}</Link></li>;
                })}
            </ul>
        </FilterGroup>
    </aside>
}