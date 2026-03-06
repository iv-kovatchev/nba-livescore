import mongoose from 'mongoose';

const getCeltics = (teamMap: Record<string, mongoose.Types.ObjectId>) => [
  { firstName: 'Jaylen', lastName: 'Brown', position: 'SG', jerseyNumber: 7, height: "6'7\"", weight: 223, birthDate: '1996-10-24', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'jaylen-brown' },
  { firstName: 'Payton', lastName: 'Pritchard', position: 'PG', jerseyNumber: 11, height: "6'1\"", weight: 195, birthDate: '1998-01-28', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'payton-pritchard' },
  { firstName: 'Derrick', lastName: 'White', position: 'SG', jerseyNumber: 9, height: "6'4\"", weight: 190, birthDate: '1994-07-02', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'derrick-white' },
  { firstName: 'Sam', lastName: 'Hauser', position: 'SF', jerseyNumber: 30, height: "6'7\"", weight: 210, birthDate: '1997-12-08', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'sam-hauser' },
  { firstName: 'Neemias', lastName: 'Queta', position: 'C', jerseyNumber: 88, height: "7'0\"", weight: 230, birthDate: '1999-07-13', nationality: 'Portuguese', photo: '', team: teamMap['Celtics'], sportRadarId: 'neemias-queta' },
  { firstName: 'Anfernee', lastName: 'Simons', position: 'SG', jerseyNumber: 4, height: "6'4\"", weight: 181, birthDate: '1999-06-08', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'anfernee-simons' },
  { firstName: 'Hugo', lastName: 'González', position: 'SG', jerseyNumber: 28, height: "6'6\"", weight: 195, birthDate: '2006-02-05', nationality: 'Spanish', photo: '', team: teamMap['Celtics'], sportRadarId: 'hugo-gonzalez' },
  { firstName: 'Baylor', lastName: 'Scheierman', position: 'SG', jerseyNumber: 55, height: "6'6\"", weight: 200, birthDate: '2000-09-26', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'baylor-scheierman' },
  { firstName: 'Jordan', lastName: 'Walsh', position: 'SG', jerseyNumber: 27, height: "6'6\"", weight: 200, birthDate: '2004-03-03', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'jordan-walsh' },
  { firstName: 'Al', lastName: 'Horford', position: 'C', jerseyNumber: 42, height: "6'9\"", weight: 240, birthDate: '1986-06-03', nationality: 'Dominican', photo: '', team: teamMap['Celtics'], sportRadarId: 'al-horford' },
  { firstName: 'Jrue', lastName: 'Holiday', position: 'PG', jerseyNumber: 4, height: "6'4\"", weight: 205, birthDate: '1990-06-12', nationality: 'American', photo: '', team: teamMap['Celtics'], sportRadarId: 'jrue-holiday' },
];

export default getCeltics;