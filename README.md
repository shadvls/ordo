<div align="center">

# Log-Rift

A fast, flexible command-line log analyzer written in Rust.

[![CI](https://github.com/sha-wrks/Log-Rift/actions/workflows/ci.yml/badge.svg)](https://github.com/sha-wrks/Log-Rift/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/rust-1.70%2B-orange.svg)](https://www.rust-lang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

Log-Rift parses logs from multiple formats, filters by level, source, message pattern, or time range, and outputs results as a table, JSON, or CSV.

## Features

- Multi-format parsing: JSON, logfmt/key-value, and common text log formats (ISO timestamps, bracketed, syslog, plain prefix)
- Filter by minimum log level, source substring, message pattern, or time range
- Parallel file loading via Rayon
- Output as pretty table, JSON, or CSV
- Zero runtime dependencies in the output binary

## Installation

**Prerequisites:** Rust 1.70 or later. Install from [rustup.rs](https://rustup.rs).

```bash
git clone https://github.com/sha-wrks/Log-Rift.git
cd Log-Rift
cargo build --release
```

The compiled binary will be at `target/release/logagg.exe` (Windows) or `target/release/logagg` (Linux/macOS).

Optionally, install to your PATH:

```bash
cargo install --path .
```

## Usage

```
logagg [OPTIONS] [FILES...]
```

If no files are provided, logagg reads from stdin.

### Options

| Flag | Description |
|---|---|
| `-l, --level <LEVEL>` | Minimum log level: trace, debug, info, warn, error, fatal |
| `-s, --source <SOURCE>` | Filter by source name (substring match, case-insensitive) |
| `-m, --message <PATTERN>` | Filter messages containing pattern (case-insensitive) |
| `--from <DATETIME>` | Include entries on or after this datetime (RFC3339) |
| `--to <DATETIME>` | Include entries on or before this datetime (RFC3339) |
| `-o, --output <FORMAT>` | Output format: table (default), json, csv |
| `--stats` | Print summary statistics instead of log entries |
| `-h, --help` | Print help |
| `-V, --version` | Print version |

### Examples

Analyze a log file and show only errors:

```bash
logagg app.log --level error
```

Filter by source and output as JSON:

```bash
logagg app.log --source database --output json
```

Show summary statistics for a time range:

```bash
logagg app.log --from 2024-01-15T09:00:00Z --to 2024-01-15T17:00:00Z --stats
```

Pipe from another command:

```bash
kubectl logs my-pod | logagg --level warn --output csv
```

Analyze multiple files:

```bash
logagg logs/*.log --level error --source api
```

## Supported Log Formats

**JSON**
```
{"timestamp":"2024-01-15T12:00:00Z","level":"error","source":"app","message":"Connection failed"}
```

**logfmt / key-value**
```
ts=2024-01-15T12:00:00Z level=error source=app msg="Connection failed" latency=500ms
```

**ISO timestamp text**
```
2024-01-15T12:00:00Z ERROR [app] Connection failed
```

**Bracketed**
```
[2024-01-15 12:00:00] [ERROR] Connection failed
```

**Simple prefix**
```
ERROR: Connection failed
```

Log format is auto-detected per line, so mixed-format files are supported.

## Project Structure

```
src/
  main.rs               CLI entry point (clap)
  lib.rs                Core types: LogEntry, LogLevel
  parser/
    mod.rs              LogParser trait and auto-detection
    json.rs             JSON log parser
    regex.rs            Regex-based text log parser
    structured.rs       logfmt / key-value parser
  filter/
    engine.rs           Filter struct and match logic
  analyzer/
    mod.rs              LogAnalyzer builder (load, filter, analyze)
    aggregator.rs       Aggregation and statistics
  output/
    table.rs            Pretty table output (prettytable-rs)
    json.rs             JSON output (serde_json)
    csv.rs              CSV output
tests/
  integration_tests.rs  End-to-end tests
  fixtures/             Sample log files for testing
benches/
  parser_bench.rs       Criterion benchmarks
```

## Development

```bash
# Run tests
cargo test

# Run benchmarks
cargo bench

# Lint
cargo clippy

# Format
cargo fmt
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
