import React, {useEffect, useState} from "react";
import {DropdownMenu} from "./DropdownMenu";

export function Countdown(props) {
    const todayDate = new Intl.DateTimeFormat("it-IT", {
        weekday: "long",  // Full day name (e.g., "Mercoledì")
        year: "numeric",  // 4-digit year
        month: "long",    // Full month name (e.g., "Febbraio")
        day: "2-digit",   // 2-digit day
        hour: "numeric",  // Hour in 12-hour format
        minute: "2-digit", // 2-digit minute
    }).format(new Date());

    const [minutesDropDown, setMinutesDropDown] = useState(15);
    const [currentDate, setCurrentDate] = useState(todayDate);
    const [currentCountdown, setCurrentCountdown] = useState("05:00");

    useEffect(() => {
        const interval = setInterval(() => {
            const newDate = new Intl.DateTimeFormat("it-IT", {
                weekday: "long",  // Full day name (e.g., "Mercoledì")
                year: "numeric",  // 4-digit year
                month: "long",    // Full month name (e.g., "Febbraio")
                day: "2-digit",   // 2-digit day
                hour: "numeric",  // Hour in 12-hour format
                minute: "2-digit", // 2-digit minute
            }).format(new Date());
            setCurrentDate(newDate);

            const [minutes, seconds] = currentCountdown.split(':').map(Number);
            if (minutes === 0 && seconds === 0) {
                setCurrentCountdown('05:00');
                props.onRefresh();
                return;
            }
            let totalSeconds = minutes * 60 + seconds - 1;
            const newMinutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const newSeconds = (totalSeconds % 60).toString().padStart(2, '0');
            setCurrentCountdown(`${newMinutes}:${newSeconds}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentCountdown])

    return <div className="date-filter">
        <div className='date-left'>
            <div className="next-update">
                Prossimo aggiornamento: {currentCountdown}
            </div>
        </div>
        <div className="select-date">
            <DropdownMenu value={minutesDropDown} onSelect={setMinutesDropDown}>{todayDate}</DropdownMenu>
        </div>
    </div>


}