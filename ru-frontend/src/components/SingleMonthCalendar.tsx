import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/custom_calendar.css";

export default function SingleMonthCalendar({
	year,
	month,
	highlights,
}: Readonly<{
	year: number;
	month: number;
	highlights: Record<string, string>;
}>) {
	// highlights = { '2025-08-05': 'red', '2025-08-10': 'green' }

	const fixedDate = new Date(year, month - 1, 1); //Mês começa em 0

	return (
		<Calendar
			activeStartDate={fixedDate}
			view="month"
			minDetail="month"
			maxDetail="month"
			showNavigation={false}
			onChange={() => {}} //ignora seleção
			selectRange={false}
			tileClassName={({ date, view }) => {
				if (view === "month") {
					const dateStr = date.toISOString().split("T")[0];
					if (highlights[dateStr]) {
						return `highlight-${highlights[dateStr]}`;
					}
				}
				return null;
			}}
		/>
	);
}
