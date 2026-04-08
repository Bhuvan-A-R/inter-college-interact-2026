type Event = {
  name: string;
  attended: boolean;
};

export default interface UserData {
  id: string;
  name: string;
  usn: string;
  events?: Event[];
  photoUrl: string;
  idcardUrl?: string;
  userId: string;
};