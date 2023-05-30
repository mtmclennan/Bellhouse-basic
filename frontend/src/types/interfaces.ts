export interface Equipment {
  _id: string;
  unitNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  engine: string;
  unitType: string;
}

export interface Res {
  status: string;
}

export interface Html {
  __html: string;
}

export interface ServiceRequest {
  _id: string;
  unit: Equipment;
  serviceRequest: string;
  requestDate: string;
}

export interface Service {
  unit?: string | Equipment;
  serviceDate: string;
  hours?: number;
  mileage?: number;
  maintenance?: string;
  repair?: string;
  _id: string;
}
