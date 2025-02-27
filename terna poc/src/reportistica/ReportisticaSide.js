import {FilterGroup} from "../components/FilterGroup";
import React from "react";
import {reports} from "./reports";
import {NavLink} from "react-router-dom";

export function ReportisticaSide() {
    return <aside className="filters">
        <h2>Elenco report</h2>
        <FilterGroup title='Preset (modelli)'>
            <div className="list-group">
                {reports.map(report => {
                    return <NavLink className="list-group-item list-group-item-action" to={`/reportistica/${report.id}`}>{report.name}</NavLink>;
                })}
            </div>
        </FilterGroup>
        <NavLink className="list-group-item list-group-item-action" to={`/reportistica/OWN`}>I miei report</NavLink>
    </aside>
}