import React, { useState } from 'react';
import { Button } from './ui/button'; // Reusable Button component for navigation
import { getCalendarDays } from '../Utils/LogicCalendar'; // Utility function to generate calendar days
import EventModal from './EventModal'; // Modal component for event management

const Calendar = () => {
    // State for managing the selected date
    const [selectedDate, setSelectedDate] = useState(null);
    // State for storing events, where keys are dates as strings and values are arrays of events
    const [events, setEvents] = useState({});
    // State for showing or hiding the event modal
    const [showModal, setShowModal] = useState(false);
    // State for the currently displayed month and year in the calendar
    const [currentDate, setCurrentDate] = useState(new Date());

    // Navigate to the next month
    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    // Navigate to the previous month
    const handlePreviousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    // Handle clicking on a day to open the modal for adding or viewing events
    const handleDayClick = (date) => {
        setSelectedDate(date); // Set the selected date
        setShowModal(true); // Show the modal
    };

    // Save a new event for a specific date
    const handleSaveEvent = (date, event) => {
        setEvents((prev) => ({
            ...prev, // Preserve existing events
            [date.toDateString()]: [...(prev[date.toDateString()] || []), event], // Add the new event
        }));
    };

    // Delete an event for a specific date
    const handleDeleteEvent = (date, eventToDelete) => {
        setEvents((prev) => {
            const updatedEvents = prev[date.toDateString()].filter(
                (event) => event !== eventToDelete // Remove the specific event
            );
    
            // If no events remain for the date, delete the date key from the events object
            if (updatedEvents.length === 0) {
                const { [date.toDateString()]: _, ...remainingEvents } = prev;
                return remainingEvents;
            }
    
            // Otherwise, update the events for that date
            return {
                ...prev,
                [date.toDateString()]: updatedEvents,
            };
        });
    };

    // Generate days for the current month's calendar
    const days = getCalendarDays(currentDate);

    return (
        <div className="calendar-container">
            {/* Header with navigation and the current month/year */}
            <header className="calendar-header">
                <Button onClick={handlePreviousMonth}>Previous</Button>
                <h2>
                    {currentDate.toLocaleString('default', { month: 'long' })}{' '}
                    {currentDate.getFullYear()}
                </h2>
                <Button onClick={handleNextMonth}>Next</Button>
            </header>

            {/* Day names header */}
            <div className="day-names">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    (day, index) => (
                        <div key={index} className="day-name">
                            {day}
                        </div>
                    )
                )}
            </div>

            {/* Calendar grid with clickable day cells */}
            <div className="calendar-grid">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`day-cell ${
                            day.isToday ? 'today' : '' // Highlight today's date
                        } ${day.date ? 'clickable' : ''} ${
                            events[day.date?.toDateString()] ? 'has-event' : '' // Highlight days with events
                        }`}
                        onClick={() => day.date && handleDayClick(day.date)} // Clickable only if the day has a date
                    >
                        {day.label} {/* Display the day number */}
                        {/* Event indicator for days with events */}
                        {events[day.date?.toDateString()] && (
                            <span className="event-indicator">•</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Event modal for managing events */}
            {showModal && selectedDate && (
                <EventModal
                    date={selectedDate}
                    events={events[selectedDate.toDateString()] || []} // Pass events for the selected date
                    onSave={(event) => handleSaveEvent(selectedDate, event)} // Save event handler
                    onDelete={(event) =>
                        handleDeleteEvent(selectedDate, event)
                    } // Delete event handler
                    onClose={() => setShowModal(false)} // Close modal handler
                />
            )}
        </div>
    );
};

export default Calendar;

