export const dateFormats = {
  SHORT: { month: 'short', day: 'numeric', year: 'numeric' },
  LONG: {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
};

export const getFormattedDateTime = (dateString: any) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${formattedDate} • ${formattedTime}`;
};
