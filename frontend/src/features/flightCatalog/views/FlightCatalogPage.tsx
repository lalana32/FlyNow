import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchFlights } from '../../home/api/homeApi';
import type { Flight, FlightSearchParams } from '../../home/models/models';

const FlightCatalog = () => {
  const [searchParams] = useSearchParams();

  const {
    data: flights,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['flights', searchParams.toString()],
    queryFn: () => {
      const searchParamsObj = Object.fromEntries(
        searchParams.entries()
      ) as Partial<FlightSearchParams>;

      if (
        !searchParamsObj.origin ||
        !searchParamsObj.destination ||
        !searchParamsObj.departureDate
      ) {
        throw new Error('Missing required search parameters');
      }

      const params: FlightSearchParams = {
        origin: searchParamsObj.origin,
        destination: searchParamsObj.destination,
        departureDate: searchParamsObj.departureDate,
        returnDate: searchParamsObj.returnDate || '',
        adults: searchParamsObj.adults ? searchParamsObj.adults : 1,
      };

      return searchFlights(params).then((res) => {
        // res.data.departureFlights je niz sa backend strukturom
        return res.data.departureFlights.map((bf: any) => {
          const itinerary = bf.itineraries[0];
          const segment = itinerary.segments[0];

          return {
            id: bf.id,
            origin: segment.departure.iataCode,
            destination: segment.arrival.iataCode,
            departureDate: segment.departure.at,
            returnDate: undefined, // nema povratni let u ovom primeru
            price: bf.price,
            airline: segment.carrierCode,
            duration: itinerary.duration,
            stops: segment.numberOfStops,
          } as Flight;
        });
      });
    },
  });

  if (isLoading) {
    return <div className='loading'>Loading flights...</div>;
  }

  if (error) {
    return (
      <div className='error'>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className='no-flights'>
        No flights found for your search criteria
      </div>
    );
  }

  return (
    <div className='flight-catalog'>
      <h2>Available Flights</h2>
      <div className='flight-list'>
        {flights.map((flight: Flight) => (
          <div key={flight.id} className='flight-card'>
            <div className='flight-route'>
              <span className='flight-origin'>{flight.origin}</span>
              <span className='flight-arrow'>→</span>
              <span className='flight-destination'>{flight.destination}</span>
            </div>
            <div className='flight-dates'>
              <span>
                Departure: {new Date(flight.departureDate).toLocaleDateString()}
              </span>
              {flight.returnDate && (
                <span>
                  Return: {new Date(flight.returnDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className='flight-price'>
              Price: €{parseFloat(flight.price.total).toFixed(2)}
            </div>
            <div className='flight-airline'>Airline: {flight.airline}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightCatalog;
