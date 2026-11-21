import {
  Atom,
  CircleDot,
  Cog,
  FlaskConical,
  Layers,
  Network,
  Route,
  Sprout,
} from "lucide-react";

/* icon names used in lib/products.js → lucide components */
export const CATEGORY_ICONS = {
  atom: Atom,
  road: Route,
  circles: CircleDot,
  network: Network,
  layers: Layers,
  flask: FlaskConical,
  sprout: Sprout,
  cog: Cog,
};

export const iconFor = (name) => CATEGORY_ICONS[name] ?? FlaskConical;
