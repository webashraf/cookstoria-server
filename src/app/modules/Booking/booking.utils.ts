function doesOverlap(existingSlots: any, newSlot: any) {
  const newStart = parseTime(newSlot.startTime);
  const newEnd = parseTime(newSlot.endTime);

  for (let i = 0; i < existingSlots.length; i++) {
    const existingStart = parseTime(existingSlots[i].startTime);
    const existingEnd = parseTime(existingSlots[i].endTime);

    // Check for overlap
    if (!(newEnd <= existingStart || newStart >= existingEnd)) {
      return true; // Overlap found
    }
  }

  return false; // No overlap found
}

// Helper function to parse time string into minutes since midnight
function parseTime(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

export const bookingUtils = {
  doesOverlap,
};
