const SHEETS = [
  "1amU6jiGZHzg1GXElsSHhtAtc7_c366NA",
  "1hGakUMf1Be8ViLWT9PzcD3JgJGh5XWGy",
];

const MONTHS: Record<string, number> = {
  januari: 1,
  februari: 2,
  maret: 3,
  april: 4,
  mei: 5,
  juni: 6,
  juli: 7,
  agustus: 8,
  september: 9,
  oktober: 10,
  november: 11,
  desember: 12,
};

type CalendarEvent = {
  dayLabel: string;
  title: string;
  startDate: string;
  endDate: string;
};

function parseCsv(input: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (character === '"') {
      if (quoted && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(field.trim());
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && input[index + 1] === "\n") index += 1;
      row.push(field.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  row.push(field.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDateRange(value: string) {
  const date = value.replace(/\s+/g, " ").trim();
  let match = date.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    const parsed = isoDate(Number(year), Number(month), Number(day));
    return { startDate: parsed, endDate: parsed };
  }

  match = date.match(/^(\d{1,2})\/(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (match) {
    const [, firstDay, secondDay, month, year] = match;
    return {
      startDate: isoDate(Number(year), Number(month), Number(firstDay)),
      endDate: isoDate(Number(year), Number(month), Number(secondDay)),
    };
  }

  match = date.match(/^(\d{1,2})-(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/i);
  if (match) {
    const [, firstDay, secondDay, monthName, year] = match;
    const month = MONTHS[monthName.toLowerCase()];
    if (!month) return null;
    return {
      startDate: isoDate(Number(year), month, Number(firstDay)),
      endDate: isoDate(Number(year), month, Number(secondDay)),
    };
  }

  return null;
}

function jakartaToday() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

async function readSheet(sheetId: string) {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`,
    { headers: { Accept: "text/csv" } },
  );
  if (!response.ok) throw new Error(`Google Sheet merespons ${response.status}`);

  const rows = parseCsv(await response.text());
  return rows.slice(2).flatMap<CalendarEvent>((row) => {
    const dayLabel = row[0]?.trim();
    const range = parseDateRange(row[1] ?? "");
    const title = row[2]?.replace(/\s+/g, " ").trim();
    if (!range || !title) return [];
    return [{ dayLabel, title, ...range }];
  });
}

export async function GET() {
  try {
    const today = jakartaToday();
    const events = (await Promise.all(SHEETS.map(readSheet)))
      .flat()
      .filter((event) => event.endDate >= today)
      .sort((left, right) => left.startDate.localeCompare(right.startDate))
      .slice(0, 5);

    return Response.json(
      { events, updatedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=900, s-maxage=900, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    return Response.json(
      { events: [], error: error instanceof Error ? error.message : "Kalender tidak dapat dibaca" },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
