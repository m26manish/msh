export const getCalendarDays = (currentDate) => {
    const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const days = [];

    // Fill padding for days from the previous month
    for (let i = 0; i < firstDay; i++) {
        days.push({ label: '', date: null });
    }

    // Fill actual days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const today = new Date();
        days.push({
            label: i,
            date: new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                i
            ),
            isToday:
                today.getDate() === i &&
                today.getMonth() === currentDate.getMonth() &&
                today.getFullYear() === currentDate.getFullYear(),
        });
    }

    return days;
};
