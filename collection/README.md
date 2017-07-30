# Livermore - Collection

Subproject responsible for collecting data from exchanges.

## Design

The collection is performed as follow:

1. Data is collected by a **collector** object, using:
    - Websockets for Bitstamp.
2. The collected data is broadcasted raw:
    - To Google Cloud PubSub.
