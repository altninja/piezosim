const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const TISSUE_PROPERTIES = {
  skin: { electricalConductivity: 0.6, permittivity: 80, density: 1100, moisture: 70, depth: 2 },
  muscle: { electricalConductivity: 0.3, permittivity: 80, density: 1090, moisture: 75, depth: 5 },
  bone: { electricalConductivity: 0.02, permittivity: 20, density: 1800, moisture: 25, depth: 10 },
  spinalCord: { electricalConductivity: 0.1, permittivity: 70, density: 1045, moisture: 78, depth: 15 },
  fat: { electricalConductivity: 0.1, permittivity: 70, density: 920, moisture: 10, depth: 3 },
  blood: { electricalConductivity: 0.7, permittivity: 80, density: 1060, moisture: 92, depth: 12 }
};

const PIEZO_PROPERTIES = {
  voltage: 5,
  force: 0.02,
  couplingCoefficient: 0.33
};

const tissues = Object.keys(TISSUE_PROPERTIES);
let timeSeries = [];

function calculateEffect(tissueProperties, currentFrequency, currentIntensity) {
  let adjustedConductivity = tissueProperties.electricalConductivity * (1 + tissueProperties.moisture / 100);
  let voltageGenerated = PIEZO_PROPERTIES.voltage * currentIntensity * currentFrequency;
  let current = voltageGenerated / (1 / adjustedConductivity);
  let effect = current * current / adjustedConductivity;
  return effect > 0 ? effect : 0;
}

function simulateEffectOverTime(startTime, endTime, timeStep, frequency, currentIntensity, tissueType) {
  const tissueProperties = TISSUE_PROPERTIES[tissueType];

  for (let time = startTime; time <= endTime; time += timeStep) {
    const effect = calculateEffect(tissueProperties, frequency, currentIntensity);
    timeSeries.push({
      time, effect, frequency, currentIntensity, tissueType,
      moisture: tissueProperties.moisture,
      depth: tissueProperties.depth
    });
  }
}

tissues.forEach(tissue => {
  for(let frequency = 1000; frequency <= 10000; frequency += 1000) {
    for(let currentIntensity = 0.001; currentIntensity <= 0.01; currentIntensity += 0.001) {
      simulateEffectOverTime(0, 1000, 1, frequency, currentIntensity, tissue); 
    }
  }
});

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'time', title: 'TIME'},
    {id: 'effect', title: 'EFFECT'},
    {id: 'frequency', title: 'FREQUENCY'},
    {id: 'currentIntensity', title: 'CURRENT INTENSITY'},
    {id: 'tissueType', title: 'TISSUE TYPE'},
    {id: 'moisture', title: 'MOISTURE'},
    {id: 'depth', title: 'DEPTH'}
  ]
});

csvWriter
  .writeRecords(timeSeries)
  .then(()=> console.log('The CSV file was written successfully'));
