# Livermore

<p align="center">
    <img src="logo.gif" />
</p>

Bitcoin trading system. Designed to initially analyse data from Bitstamp and Foxbit.

## Design

The project is separated in three self-contained parts:

<p align="center">
    <img src="design.png" />
</p>

- Collection:
    - Captures data from exchanges (via websockets, REST APIs or other methods);
    - The data is saved in a relational database (PostgreSQL).
- Vision:
    - Reads data consolidated in the database;
    - Shows trading curves, as well as technical analysis drawings.
- Analysis:
    - Performs analyses (predictions, average pricing and technical analysis stuff).

**ATTENTION:** *This is not intended to be a bot, but an investment assistant.*

## DevOps

The project will be hosted in Google Cloud.

## TODO

- Add FoxBit data collection;
- Add Kraken data collection;
- Use CDC for data delivering to Vision and Analysis;
- Create an alert system (with loud sound and etc.).
