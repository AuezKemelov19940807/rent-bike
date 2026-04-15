export type BikeStatus = "available" | "rented" | "maintenance";
export type TransmissionType = "manual" | "cvt" | "automatic";
export type LicenseCategory = "A" | "A1" | "M";

export interface Bike {
  id: number;
  company: string;
  brand: string;
  model: string;
  bike_type: string;
  license_category: LicenseCategory;

  main_photo: string;
  photos: string[];

  engine_capacity_cc: number;
  year: number;
  transmission: TransmissionType;

  daily_rental_price: number;
  weekly_rental_price: number;
  monthly_rental_price: number;

  sale_price: number;

  status: BikeStatus;
  busy_until?: string | null;

  created_at: string;
  updated_at: string;
}
