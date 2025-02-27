import {useParams} from "react-router-dom";
import React, {useMemo} from "react";
import {reports} from "./reports";

export function ReportisticaInspector() {
    const {id} = useParams();
    const data = useMemo(() => reports.find(report => report.id === id), [id]);

    if (data == null) {
        return null
    }

    return (
        <div className='inspector-reports'>
            INSPECTOR
        </div>
    )
}