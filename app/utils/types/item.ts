export interface Item {
  id: number;
  image: string;
  model: string;
  icon: string;
  status: "Свободен" | "Занят" | "Обслуживание";
}
