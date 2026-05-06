export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: 'Spices' | 'Herbs' | 'Blends' | 'Special'
  description: string
  badge?: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Cumin Seeds',
    price: 8.99,
    image: '/images/products/cumin.jpg',
    category: 'Spices',
    description: 'Earthy, warm cumin seeds sourced from organic farms. Perfect for curries, soups, and roasted vegetables.',
  },
  {
    id: '2',
    name: 'Smoked Paprika',
    price: 9.49,
    image: '/images/products/paprika.jpg',
    category: 'Spices',
    description: 'Deep, smoky flavour from slow-dried Spanish peppers. Elevates meats, stews, and dips.',
  },
  {
    id: '3',
    name: 'Premium Saffron',
    price: 24.99,
    image: '/images/products/saffron.jpg',
    category: 'Special',
    description: 'Hand-picked Persian saffron threads. Intense colour and floral aroma — a pinch transforms any dish.',
    badge: 'Best Seller',
  },
  {
    id: '4',
    name: 'Golden Turmeric',
    price: 7.99,
    image: '/images/products/turmeric.jpg',
    category: 'Spices',
    description: 'Vibrant, earthy turmeric ground from fresh rhizomes. High curcumin content for golden lattes and curries.',
  },
  {
    id: '5',
    name: 'Ceylon Cinnamon',
    price: 11.99,
    image: '/images/products/cinnamon.jpg',
    category: 'Spices',
    description: 'True Ceylon cinnamon — delicate, sweet, and subtly citrusy. The premium alternative to cassia.',
  },
  {
    id: '6',
    name: 'Italian Herb Blend',
    price: 12.49,
    image: '/images/products/herb-blend.jpg',
    category: 'Blends',
    description: 'A classic Tuscan blend of oregano, basil, rosemary, and thyme. Ready to season pasta, pizza, and grills.',
  },
  {
    id: '7',
    name: 'Dried Oregano',
    price: 6.49,
    image: '/images/products/oregano.jpg',
    category: 'Herbs',
    description: 'Sun-dried Greek oregano with bold, peppery notes. A Mediterranean staple for sauces, salads, and meats.',
  },
  {
    id: '8',
    name: 'Rosemary Leaves',
    price: 6.99,
    image: '/images/products/rosemary.jpg',
    category: 'Herbs',
    description: 'Whole dried rosemary from hillside farms. Fragrant and resinous — ideal for roasts and infused oils.',
  },
  {
    id: '9',
    name: 'Garam Masala',
    price: 10.99,
    image: '/images/products/garam-masala.jpg',
    category: 'Blends',
    description: 'A warming North Indian blend of cloves, cardamom, cinnamon, and pepper. The soul of any curry.',
    badge: 'New',
  },
  {
    id: '10',
    name: 'Ras el Hanout',
    price: 13.99,
    image: '/images/products/ras-el-hanout.jpg',
    category: 'Blends',
    description: 'A complex Moroccan spice blend with over 12 spices. Brings depth to tagines, couscous, and lamb.',
    badge: 'New',
  },
  {
    id: '11',
    name: 'Dried Thyme',
    price: 5.99,
    image: '/images/products/thyme.jpg',
    category: 'Herbs',
    description: 'Finely dried thyme with a clean, lemony flavour. Essential for stocks, roasted chicken, and marinades.',
  },
  {
    id: '12',
    name: 'Sumac',
    price: 9.99,
    image: '/images/products/sumac.jpg',
    category: 'Special',
    description: 'Tangy, ruby-red sumac berries ground to a bright powder. A versatile souring agent in Middle Eastern cuisine.',
  },
]

export const categories = ['All', 'Spices', 'Herbs', 'Blends', 'Special'] as const
export type Category = (typeof categories)[number]
