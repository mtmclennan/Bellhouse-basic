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

export interface ServicePage {
  service: {
    meta: {
      title: string;
      description: string;
    };
    card: {
      title: string;
      description: string;
      image: string;
      alt: string;
    };
    slug: string;
    hero: {
      heading: string;
      subheading: string;
      image: string;
      alt: string;
    };
    intro: {
      heading: string;
      content: string;
      keypoints: string[];
    };
  };
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
