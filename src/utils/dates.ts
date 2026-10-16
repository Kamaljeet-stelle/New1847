export type DayOption = {
  id: string;
  weekday: string;
  day: number;
  month: string;
};

export type SlotSection = {
  id: string;
  label: string;
  slots: string[];
};

function isoDate(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function upcomingDates(count = 14, from = new Date()): DayOption[] {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(from);
    date.setDate(from.getDate() + index);
    return {
      id: isoDate(date),
      weekday: date.toLocaleDateString('en-GB', { weekday: 'short' }),
      day: date.getDate(),
      month: date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    };
  });
}

const slotSections = [
  { id: 'morning', label: 'Morning', from: 10, to: 12 },
  { id: 'afternoon', label: 'Afternoon', from: 12, to: 17 },
  { id: 'evening', label: 'Evening', from: 17, to: 22 },
];

export function daySlots(dateIso: string, now = new Date()): SlotSection[] {
  const isToday = dateIso === isoDate(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slotSections
    .map(section => {
      const slots: string[] = [];
      for (let minutes = section.from * 60; minutes < section.to * 60; minutes += 30) {
        if (isToday && minutes <= nowMinutes) {
          continue;
        }
        const hour = `${Math.floor(minutes / 60)}`.padStart(2, '0');
        const minute = `${minutes % 60}`.padStart(2, '0');
        slots.push(`${hour}:${minute}`);
      }
      return { id: section.id, label: section.label, slots };
    })
    .filter(section => section.slots.length > 0);
}

export function formatVisitDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) {
    return iso;
  }
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
}

export function formatBirthday(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) {
    return '';
  }
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatClock(slot: string) {
  const [hourText, minuteText] = slot.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return slot;
  }
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${`${minute}`.padStart(2, '0')} ${suffix}`;
}

export function greetingFor(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  return hour < 17 ? 'Good afternoon' : 'Good evening';
}

export function todayIso(from = new Date()) {
  const month = `${from.getMonth() + 1}`.padStart(2, '0');
  const day = `${from.getDate()}`.padStart(2, '0');
  return `${from.getFullYear()}-${month}-${day}`;
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}
