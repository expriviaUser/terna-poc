import {useParams} from "react-router-dom";
import React, {useMemo} from "react";
import {reports} from "./reports";
import './ReportsInspector.css';
import { Button } from "react-bootstrap";
import pdf from "../assets/pdf.jpg";

export function ReportisticaInspector() {
    const {id} = useParams();
    const data = useMemo(() => reports.find(report => report.id === id), [id]);

    if (data == null) {
        return null
    }

    return (
        <div className='inspector-reports'>
            <div className="inspector-title">
                INSPECTOR
            </div>
            <div className="inspector-header">
                <Button variant='outline-primary'>PDF</Button>
                <Button variant='outline-primary'>MODIFICA</Button>
                <Button variant='outline-primary'>POWER BI</Button>
            </div>
            <img src={pdf} alt='pdf' />
            <div className="inspector-footer">
                Spike febbraio
            </div>
        </div>
    )
}