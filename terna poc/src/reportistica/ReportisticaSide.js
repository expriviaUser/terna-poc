import {FilterGroup} from "../components/FilterGroup";
import React from "react";
import {reports} from "./reports";
import {Link} from "react-router-dom";

export function ReportisticaSide() {
    return <aside className="filters">
        <h2>Elenco report</h2>
        <FilterGroup title='Preset (modelli)'>
            <div className="list-group">
                {reports.map(report => {
                    // TODO add active
                    return <Link className="list-group-item list-group-item-action" to={`/reportistica/${report.id}`}>{report.name}</Link>;
                })}
            </div>
        </FilterGroup>
    </aside>
}