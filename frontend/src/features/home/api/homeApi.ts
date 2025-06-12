import api from '../../../api/api';
import type { FlightSearchParams } from '../models/models';

export const searchFlights = (searchParams: FlightSearchParams) => {
  return api.get('/flight-api/api/Flight', {
    params: searchParams,
  });
};

export const fetchSearchSuggestions = (input: string) => {
  return api.get(
    `/flight-api/api/Flight/locations?keyword=${encodeURIComponent(input)}`
  );
};
