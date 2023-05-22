export type EventActions = {
  getAll: () => Promise<void>;
  getOne: (id: number) => Promise<void>;
  clear: () => void;
};
