export interface IEventsComponent {
  onFailed: () => void;
  onPickEvent: (id: number) => void;
}

export interface IEventComponent {
  id: number;
  onClose: () => void;
  onFailed: () => void;
}

export interface IErrorComponent {
  onRefresh: () => void;
}