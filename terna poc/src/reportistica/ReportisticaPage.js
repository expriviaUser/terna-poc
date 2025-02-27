import {ReportisticaSide} from "./ReportisticaSide";
import React from "react";
import {ReportisticaMain} from "./ReportisticaMain";
import {useParams} from "react-router-dom";
import {ReportisticaPersonale} from "./ReportisticaPersonale";

export function ReportisticaPage() {
    const {id, reportId} = useParams();

    return <main>
        <ReportisticaSide/>
        {id === 'OWN' ? <ReportisticaPersonale/>:
            <ReportisticaMain/>
        }
    </main>
}
