export interface IEvent {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  petsAllowed: boolean;
  organizer: string;
}
