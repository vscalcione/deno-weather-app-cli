import { parse } from 'https://deno.land/std@0.61.0/flags/mod.ts';
import { fromUnixTime, format } from 'https://deno.land/x/date_fns@v2.15.0/index.js';
import AsciiTable from 'https://deno.land/x/ascii_table/mod.ts';

const args = parse(Deno.args);

if (args.city === undefined) {
  console.error("No city supplied");
  Deno.exit();
}

const apiKey = "75c820f8630ffd51e18f9ed9ffd46cf5";

const res = await fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${args.city}&units=metric&appid=${apiKey}`,
);
const data = await res.json();

interface forecastItem {
  dt: string;
  main: { temp: number };
  weather: { description: string }[];
}

const forecast = data.list.slice(0, 8).map((item: forecastItem) => [
  format(fromUnixTime(item.dt), "do LLL, k:mm", {}),
  `${item.main.temp.toFixed(1)}C`,
  item.weather[0].description,
]);

const table = AsciiTable.fromJSON({
  title: `${data.city.name} Forecast`,
  heading: ["Time", "Temp", "Weather"],
  rows: forecast,
});

console.log(table.toString());
