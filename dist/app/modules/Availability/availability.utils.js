"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availiabilityUtils = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
function formatTime24(hour) {
    const formattedHour = hour.toString().padStart(2, "0");
    return `${formattedHour}:00`;
}
function generateTwoHourTimeSlots() {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour += 2) {
        const startTime = formatTime24(hour);
        const endTime = formatTime24((hour + 2) % 24);
        timeSlots.push({
            startTime: startTime,
            endTime: endTime,
        });
    }
    return timeSlots;
}
function generateAvailableSlots(userSlots) {
    const totalSlots = [{ startTime: "00:00", endTime: "24:00" }];
    userSlots.forEach((userSlot) => {
        const userStart = parseTime(userSlot.startTime);
        const userEnd = parseTime(userSlot.endTime);
        for (let i = 0; i < totalSlots.length; i++) {
            const slot = totalSlots[i];
            const slotStart = parseTime(slot.startTime);
            const slotEnd = parseTime(slot.endTime);
            if (!(userEnd <= slotStart || userStart >= slotEnd)) {
                if (userStart > slotStart) {
                    totalSlots.splice(i, 1, {
                        startTime: slot.startTime,
                        endTime: userSlot.startTime,
                    });
                    i++;
                }
                if (userEnd < slotEnd) {
                    totalSlots.splice(i, 0, {
                        startTime: userSlot.endTime,
                        endTime: slot.endTime,
                    });
                    i++;
                }
                totalSlots.splice(i, 1);
                i--;
            }
        }
    });
    return totalSlots;
}
function parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
}
exports.availiabilityUtils = {
    generateTwoHourTimeSlots,
    generateAvailableSlots,
};
