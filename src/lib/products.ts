export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  data_ai_hint?: string;
};

export const products: Product[] = [
  {
    id: "prod_1",
    name: "Organic A2 Ghee",
    description: "Pure, hand-churned ghee from the milk of grass-fed A2 cows. Rich in nutrients and flavor.",
    price: 850,
    image: "https://placehold.co/400x400.png",
    category: "Dairy",
    data_ai_hint: "ghee jar",
  },
  {
    id: "prod_2",
    name: "Heirloom Tomato Box",
    description: "A colorful assortment of juicy, flavorful heirloom tomatoes, grown using organic methods.",
    price: 350,
    image: "https://placehold.co/400x400.png",
    category: "Vegetables",
    data_ai_hint: "heirloom tomatoes",
  },
  {
    id: "prod_3",
    name: "Wild Forest Honey",
    description: "Raw, unprocessed honey harvested from the nectar of wild flowers in pristine forests.",
    price: 480,
    image: "https://placehold.co/400x400.png",
    category: "Pantry",
    data_ai_hint: "honey jar",
  },
  {
    id: "prod_4",
    name: "Farm-Fresh Paneer",
    description: "Soft and creamy paneer made from fresh, whole A2 milk. Perfect for curries and grills.",
    price: 250,
    image: "https://placehold.co/400x400.png",
    category: "Dairy",
    data_ai_hint: "paneer cheese",
  },
  {
    id: "prod_5",
    name: "Assorted Leafy Greens",
    description: "A mix of fresh, seasonal leafy greens like spinach, kale, and lettuce. Triple-washed and ready to eat.",
    price: 180,
    image: "https://placehold.co/400x400.png",
    category: "Vegetables",
    data_ai_hint: "leafy greens",
  },
  {
    id: "prod_6",
    name: "Cold-Pressed Groundnut Oil",
    description: "Nutrient-rich groundnut oil extracted using traditional cold-press methods to retain its natural goodness.",
    price: 420,
    image: "https://placehold.co/400x400.png",
    category: "Oils",
    data_ai_hint: "oil bottle",
  },
  {
    id: "prod_7",
    name: "Organic Mangoes (Seasonal)",
    description: "Juicy, sweet, and fragrant organic mangoes, delivered straight from the farm during the season.",
    price: 600,
    image: "https://placehold.co/400x400.png",
    category: "Fruits",
    data_ai_hint: "ripe mangoes",
  },
  {
    id: "prod_8",
    name: "Ancient Grain Flour Mix",
    description: "A wholesome blend of ancient grains like millet, amaranth, and quinoa, stone-ground to perfection.",
    price: 280,
    image: "https://placehold.co/400x400.png",
    category: "Pantry",
    data_ai_hint: "flour bag",
  },
];
