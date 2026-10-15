# SmartCity Donostia — simulation prototype

An educational 3D traffic simulator for **Smart Donostia AI**, using Three.js and Vite. This repository is an experimental simulation, **not an official traffic forecasting or public-safety service**.

## Getting started

Prerequisites: Node.js supported by Vite 8 (Node 22.12+ or 20.19+).

```bash
npm ci
npm run fetch-osm  # generate local city data
npm run dev
```

Open the local URL printed by Vite. The city-data generator uses the OpenStreetMap Overpass API and requires internet access. Generated `public/data/city.json` is excluded from version control; run the generator once on a new clone. Respect OSM attribution and the ODbL license when redistributing derived data.

Tests: `npm test`. Production build: `npm run build`.

## Reproducible experiment identifiers

The URL can specify a seeded random sequence and provenance metadata:

```text
http://localhost:5173/?scenario=gros_weekday&seed=123&run=trial_1
```

- `seed` is an unsigned 32-bit integer (default **42**). The simulator uses it for initial car factors, spawn locations and route decisions instead of unseeded random choices.
- `scenario` is an **experiment label** (default `baseline`); it does **not** change the traffic demand curve, weather or events yet.
- `run` is an optional run label; the default is `<scenario>-seed-<seed>`. Supply distinct run labels for separate experiments.

CSV sensor exports and outgoing JSON observations append `scenario_id`, `run_id`, `seed` and `data_origin` (`simulated`) to existing fields. This extends the POST record schema; receiving services may need to accept additional keys.

For comparable results, use the **same city dataset, configuration, seed, sensors and timing of user interactions**. The physics loop uses fixed simulation steps, but browser scheduling and interactive changes can still alter runs. The experiment labels alone do not enforce identical conditions.

## Data validity

Traffic volumes, routes and sensor measurements are **synthetic**. Models trained on exported observations predict simulation behavior, not proven real-world traffic in Donostia. Real forecasting claims require independent measurements and calibration.
