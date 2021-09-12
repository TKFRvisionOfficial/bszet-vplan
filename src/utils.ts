const relativeFormat = new Intl.RelativeTimeFormat("de", {
  numeric: "auto",
  style: "long",
});

export function formatRelativeTime(diff: number): string {
  const secDiff = diff / 1000;

  if (isInRange(-60, secDiff, 60)) {
    return relativeFormat.format(Math.round(secDiff), "seconds");
  }

  const minDiff = secDiff / 60;

  if (isInRange(-60, minDiff, 60)) {
    return relativeFormat.format(Math.round(minDiff), "minutes");
  }

  const hourDiff = minDiff / 60;

  if (isInRange(-24, hourDiff, 24)) {
    return relativeFormat.format(Math.round(hourDiff), "hours");
  }

  return relativeFormat.format(Math.round(hourDiff / 24), "days");
}

function isInRange(start: number, value: number, end: number) {
  return start < value && value < end;
}

export async function pdf2Img(pdf: BlobPart): Promise<string[] | null> {
  const data = new FormData();
  data.append("file", new Blob([pdf]));

  // @ts-ignore
  const response = await fetch(`${API_URL}/pdf2img`, {
    method: "POST",
    body: data,
    // @ts-ignore
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  return response.status !== 200 ? null : response.json();
}
