export interface Availability {
  resourceId: string;
  startTime: Date;
  endTime: Date;
}

export interface FetchAvailabilityInput {
  locationId?: string;
  serviceId: string;
  start: Date;
  end: Date;
}
