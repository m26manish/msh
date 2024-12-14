import React, { useState } from 'react';
import { Button } from './ui/button'; // Importing a reusable Button component

// EventModal component for managing and displaying events for a specific date
const EventModal = ({ date, events, onSave, onDelete, onClose }) => {
    // Local state variables for managing form inputs and the selected event
    const [eventName, setEventName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Handles saving an event with validation for input fields
    const handleSave = () => {
        if (!eventName || !startTime || !endTime || startTime >= endTime) {
            alert('Invalid event details!'); // Show an error if the input is invalid
            return;
        }

        // Calls the onSave function passed as a prop with the new event data
        onSave({
            name: eventName,
            start: startTime,
            end: endTime,
            description,
        });

        // Clear inputs after saving the event
        setEventName('');
        setStartTime('');
        setEndTime('');
        setDescription('');
    };

    // Handles deleting the selected event
    const handleDelete = () => {
        if (selectedEvent) {
            onDelete(selectedEvent); // Calls the onDelete function passed as a prop
            setSelectedEvent(null); // Clears the selected event state
        }
    };

    return (
        <div className="EventModal">
            {/* Modal header displaying the selected date */}
            <div className="EventModal-header">
                <h3 className="text-lg font-bold">
                    Events for {date ? date.toDateString() : ''}
                </h3>
            </div>
            <div className="EventModal-body">
                {/* List of existing events for the selected date */}
                <ul>
                    {events.map((event, index) => (
                        <li key={index} className="mb-2">
                            <strong>{event.name}</strong> ({event.start} - {event.end})
                            <p>{event.description}</p>
                            {/* Button to select an event for deletion */}
                            <button
                                onClick={() => setSelectedEvent(event)}
                                className="text-blue-500 underline"
                            >
                                Select
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Input for event name */}
                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full p-2 border mb-2"
                />
                {/* Input for start time */}
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 border mb-2"
                />
                {/* Input for end time */}
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 border mb-2"
                />
                {/* Input for optional description */}
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border mb-2"
                />
            </div>

            {/* Footer with action buttons */}
            <div className="EventModal-footer">
                {/* Button to save the event */}
                <Button onClick={handleSave} className="bg-green-500 text-white">
                    Save
                </Button>
                {/* Button to delete the selected event */}
                <Button
                    onClick={handleDelete}
                    className="bg-red-500 text-white ml-2"
                >
                    Delete
                </Button>
                {/* Button to close the modal */}
                <Button onClick={onClose} className="bg-gray-500 text-white ml-2">
                    Close
                </Button>
            </div>
        </div>
    );
};

export default EventModal;

