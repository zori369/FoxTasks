import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CalendarScreen() {
    const navigate = useNavigate();

    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());

    const dayFirst = (new Date(year, month, 1).getDay() + 6) % 7;
    const dayLast = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const isPastDay = (dayNumber: number) => {
        return (
          year < today.getFullYear() ||
          (year === today.getFullYear() && month < today.getMonth()) ||
          (year === today.getFullYear() && month === today.getMonth() && dayNumber < today.getDate())
        );
    };

    const monthsArray:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return(
        <div>
            <div>
                <button onClick={()=>navigate("/")}>GardenMenu</button>
                <button>Routines</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={7}>{monthsArray[month]}</th>
                        </tr>
                        <tr>
                            <th colSpan={1}>Mon</th>
                            <th colSpan={1}>Tue</th>
                            <th colSpan={1}>Wed</th>
                            <th colSpan={1}>Thu</th>
                            <th colSpan={1}>Fri</th>
                            <th colSpan={1}>Sat</th>
                            <th colSpan={1}>Sun</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: Math.ceil((dayFirst + dayLast) / 7) }).map((_, weekIndex) => (
                        <tr key={weekIndex}>
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const dayNumber = weekIndex * 7 + dayIndex - dayFirst + 1;
                            return (
                            <td key={dayIndex} className={isPastDay(dayNumber) ? "past-day" : ""} onClick={()=>navigate(`/day/${monthsArray[month]} ${dayNumber}`)}>
                                {dayNumber > 0 && dayNumber <= dayLast ? dayNumber : ""}
                            </td>
                            );
                        })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => {
                            if (month === 0) {
                                setMonth(11);
                                setYear(year - 1);
                            } else {
                                setMonth(month - 1);
                            }
                            }}>&lt;-Previous</button>
                <button onClick={() => {
                            if (month === 11) {
                                setMonth(0);
                                setYear(year + 1);
                            } else {
                                setMonth(month + 1);
                            }
                            }}>Next-&gt;</button>
            </div>
        </div>
    );
}

export default CalendarScreen;