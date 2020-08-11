# deno-weather-cli

This is a simple deno cli application to show the meteo of a city.
If you use the denon prepared script, can you type on the shell this command:
```bash
$ denon start
```

The command that will be executed in background is: 
```bash
$ deno run --allow-all index.ts --city London
```

If the user wants to have another city weather's info, run this command: 
```bash
$ deno run --allow-all index.ts --city cityName
```

