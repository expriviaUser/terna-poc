import {ReportisticaSide} from "./ReportisticaSide";
import React from "react";
import {Countdown} from "../components/Countdown";

export function ReportisticaPage() {
    return <main>
        <ReportisticaSide/>
        <ReportisticaMain/>
    </main>
}

function ReportisticaMain() {
    return <section className="content">
        {/* <StaticExample /> */}
        <div className="date-filter">
            <Countdown onRefresh={console.log}/>
            <div className="select-date">

            </div>
        </div>
        <h3 className='page-title'>Overview Misuratori</h3>
        <div className="applied-filters">

        </div>
        <div className="clusters"></div>
        <div className="measurements"></div>
    </section>
}