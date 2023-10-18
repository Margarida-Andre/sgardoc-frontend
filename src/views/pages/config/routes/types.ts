import { Props } from "../types";

export interface RouteItem {
  exact?: boolean;
  path: string;
  component: React.FC<Props>;
  name: string;
}
