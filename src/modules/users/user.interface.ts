 export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "TECHNICIAN";
  experience?: number; // Optional for CUSTOMER
  hourlyRate?: number; // Optional for CUSTOMER
}