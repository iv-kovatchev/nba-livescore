import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Arena from './models/Arena';
import Team from './models/Team';
import Player from './models/Player';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const seedArenas = [
  { name: 'TD Garden', city: 'Boston', state: 'MA', capacity: 19156, yearBuilt: 1995, coordinates: { lat: 42.3662, lng: -71.0621 } },
  { name: 'Barclays Center', city: 'Brooklyn', state: 'NY', capacity: 17732, yearBuilt: 2012, coordinates: { lat: 40.6826, lng: -73.9754 } },
  { name: 'Madison Square Garden', city: 'New York', state: 'NY', capacity: 19812, yearBuilt: 1968, coordinates: { lat: 40.7505, lng: -73.9934 } },
  { name: 'Wells Fargo Center', city: 'Philadelphia', state: 'PA', capacity: 20478, yearBuilt: 1996, coordinates: { lat: 39.9012, lng: -75.1720 } },
  { name: 'Scotiabank Arena', city: 'Toronto', state: 'ON', capacity: 19800, yearBuilt: 1999, coordinates: { lat: 43.6435, lng: -79.3791 } },
  { name: 'United Center', city: 'Chicago', state: 'IL', capacity: 20917, yearBuilt: 1994, coordinates: { lat: 41.8807, lng: -87.6742 } },
  { name: 'Rocket Mortgage FieldHouse', city: 'Cleveland', state: 'OH', capacity: 19432, yearBuilt: 1994, coordinates: { lat: 41.4964, lng: -81.6882 } },
  { name: 'Little Caesars Arena', city: 'Detroit', state: 'MI', capacity: 20332, yearBuilt: 2017, coordinates: { lat: 42.3410, lng: -83.0550 } },
  { name: 'Fiserv Forum', city: 'Milwaukee', state: 'WI', capacity: 17341, yearBuilt: 2018, coordinates: { lat: 43.0450, lng: -87.9170 } },
  { name: 'Gainbridge Fieldhouse', city: 'Indianapolis', state: 'IN', capacity: 17923, yearBuilt: 1999, coordinates: { lat: 39.7639, lng: -86.1555 } },
  { name: 'State Farm Arena', city: 'Atlanta', state: 'GA', capacity: 18118, yearBuilt: 1999, coordinates: { lat: 33.7573, lng: -84.3963 } },
  { name: 'Spectrum Center', city: 'Charlotte', state: 'NC', capacity: 19077, yearBuilt: 2005, coordinates: { lat: 35.2251, lng: -80.8392 } },
  { name: 'Kaseya Center', city: 'Miami', state: 'FL', capacity: 19600, yearBuilt: 1999, coordinates: { lat: 25.7814, lng: -80.1870 } },
  { name: 'Amway Center', city: 'Orlando', state: 'FL', capacity: 18846, yearBuilt: 2010, coordinates: { lat: 28.5392, lng: -81.3839 } },
  { name: 'Capital One Arena', city: 'Washington', state: 'DC', capacity: 20356, yearBuilt: 1997, coordinates: { lat: 38.8981, lng: -77.0209 } },
  { name: 'American Airlines Center', city: 'Dallas', state: 'TX', capacity: 19200, yearBuilt: 2001, coordinates: { lat: 32.7905, lng: -96.8103 } },
  { name: 'Toyota Center', city: 'Houston', state: 'TX', capacity: 18055, yearBuilt: 2003, coordinates: { lat: 29.7508, lng: -95.3621 } },
  { name: 'Paycom Center', city: 'Oklahoma City', state: 'OK', capacity: 18203, yearBuilt: 2002, coordinates: { lat: 35.4634, lng: -97.5151 } },
  { name: 'Smoothie King Center', city: 'New Orleans', state: 'LA', capacity: 16867, yearBuilt: 1999, coordinates: { lat: 29.9490, lng: -90.0823 } },
  { name: 'FedExForum', city: 'Memphis', state: 'TN', capacity: 17794, yearBuilt: 2004, coordinates: { lat: 35.1383, lng: -90.0505 } },
  { name: 'Ball Arena', city: 'Denver', state: 'CO', capacity: 19520, yearBuilt: 1999, coordinates: { lat: 39.7487, lng: -105.0077 } },
  { name: 'Target Center', city: 'Minneapolis', state: 'MN', capacity: 18978, yearBuilt: 1990, coordinates: { lat: 44.9795, lng: -93.2762 } },
  { name: 'Delta Center', city: 'Salt Lake City', state: 'UT', capacity: 18306, yearBuilt: 1991, coordinates: { lat: 40.7683, lng: -111.9011 } },
  { name: 'Footprint Center', city: 'Phoenix', state: 'AZ', capacity: 17071, yearBuilt: 1992, coordinates: { lat: 33.4457, lng: -112.0712 } },
  { name: 'Golden 1 Center', city: 'Sacramento', state: 'CA', capacity: 17500, yearBuilt: 2016, coordinates: { lat: 38.5802, lng: -121.4997 } },
  { name: 'Chase Center', city: 'San Francisco', state: 'CA', capacity: 18064, yearBuilt: 2019, coordinates: { lat: 37.7680, lng: -122.3877 } },
  { name: 'Crypto.com Arena', city: 'Los Angeles', state: 'CA', capacity: 19079, yearBuilt: 1999, coordinates: { lat: 34.0430, lng: -118.2673 } },
  { name: 'Intuit Dome', city: 'Inglewood', state: 'CA', capacity: 18000, yearBuilt: 2024, coordinates: { lat: 33.9583, lng: -118.3417 } },
  { name: 'Moda Center', city: 'Portland', state: 'OR', capacity: 19393, yearBuilt: 1995, coordinates: { lat: 45.5316, lng: -122.6668 } },
];