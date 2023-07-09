# piezosim
Simulation of human tissue reaction to piezoelectric inputs

This script simulates the effect of a piezoelectrically generated current on various types of human tissue, including skin, muscle, bone, spinal cord, fat, and blood. The script varies the frequency and intensity of the current, records the resultant effects over time, and outputs the data to a CSV file.

## Overview

The simulation takes into consideration certain properties of a piezoelectric device, including the voltage, force, and the coupling coefficient. It calculates the effects on different types of tissue by taking into account their unique properties, such as electrical conductivity, permittivity, density, moisture content, and depth. 

## Getting Started

### Prerequisites

Before running this script, ensure that you have Node.js installed in your environment. 

Also, the script uses `csv-writer` package for writing the output to a CSV file, which you can install via npm:



### Usage

You can run this script with Node.js as follows:

`npm install csv-writer && node psim.js`

### Output

After successful execution, the script will generate an 'out.csv' file in the current directory. This CSV file will contain the following columns:

- TIME: The simulation time.
- EFFECT: The calculated effect of the current on the specific tissue.
- FREQUENCY: The frequency of the current applied.
- CURRENT INTENSITY: The intensity of the current applied.
- TISSUE TYPE: The type of tissue being affected (skin, muscle, bone, spinal cord, fat, blood).
- MOISTURE: The moisture content of the tissue.
- DEPTH: The depth of the tissue.

## Disclaimer

This script provides a simplified model of the complex interaction between electric currents and biological tissue. It should not be used for making actual medical or scientific predictions without further validation and refinement.
