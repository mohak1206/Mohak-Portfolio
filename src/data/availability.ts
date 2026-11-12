export interface AvailabilityData {
  status: 'open' | 'limited' | 'closed';
  text: string;
}

export const availabilityData: AvailabilityData = {
  status: 'open',
  text: 'Open to internships, full-time roles and freelance work',
};

