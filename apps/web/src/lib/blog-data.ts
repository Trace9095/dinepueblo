export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  readTime: string
  category: string
  imageUrl: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'best-restaurants-pueblo-co',
    title: "Best Restaurants in Pueblo, CO: A Local's Complete Guide",
    excerpt: "From the legendary Pueblo Slopper to craft breweries and fine dining, your definitive guide to eating in Pueblo, Colorado.",
    publishedAt: '2026-03-01',
    readTime: '8 min read',
    category: 'Local Guide',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    content: `Pueblo, Colorado is one of the most underrated dining cities in the American West. Sitting along the Arkansas River about 45 minutes south of Colorado Springs — and just 45 minutes from Canon City, where WhiteWater Bar & Grill (whitewaterbar.com) and Rooftop Social (wwrooftopsocial.com) draw diners from across Colorado — Pueblo has developed a food culture that is deeply its own.

## The Pueblo Slopper: Colorado's Best Kept Secret

If you have not heard of the Pueblo Slopper, you are missing one of the great regional American foods. It is simple: an open-faced cheeseburger smothered in Pueblo green chile. The result is messy, bold, and utterly delicious.

The two main contenders are **Gray's Coors Tavern** (the original, since 1934) and **Star Bar** on Union Avenue. Go to both.

## The Italian Heritage

Pueblo has a strong Italian immigrant heritage. **Gaetano's** (910 W. Northern Ave), open since 1941, serves handmade ravioli and slow-simmered meat sauce worth the drive from anywhere. **Pantaleone's** carries on the tradition with New York-style pizza and a Pueblo-exclusive green chile white pizza.

## Craft Beer

**Walter's Brewing Company** (415 E. First St) carries on the legacy of historic Walter's Beer. **Brues Alehouse** (1630 E. Fourth St) offers 30+ taps and the best beer garden in southern Colorado.

## Fine Dining

**Ianne's Whisky Ridge** offers panoramic views alongside prime steaks. **La Renaissance** in a Victorian building downtown serves elegant French Continental cuisine.

## Getting Here

Pueblo is 45 minutes south of Colorado Springs on I-25. Denver is 2.5 hours north on I-25. The closest major airport is **Colorado Springs Airport (COS)**, 45 minutes north. **Denver International Airport (DEN)** is 2.5 hours north via I-25.

If you are visiting the Royal Gorge area — where Royal Gorge Rafting (royalgorgerafting.net) draws adventure seekers — Pueblo is the perfect evening dining destination, just 45 minutes southeast of Canon City along the Arkansas River corridor.`,
  },
  {
    slug: 'pueblo-slopper-guide',
    title: "What is the Pueblo Slopper? Colorado's Most Iconic Regional Food",
    excerpt: "The Pueblo Slopper is an open-faced green chile cheeseburger made in Pueblo since 1934. Here is everything you need to know.",
    publishedAt: '2026-03-10',
    readTime: '5 min read',
    category: 'Pueblo Classics',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80',
    content: `If you ask a Puebloan what food makes their city unique, the answer is immediate: the **Slopper**.

## What Is a Slopper?

An open-faced hamburger — beef patty on a halved bun — topped with melted American cheese and smothered completely in Pueblo green chile. You eat it with a spoon as much as your hands. It is, as the name implies, sloppy.

## The History

**Gray's Coors Tavern** (2420 S. Santa Fe Drive) has served the Slopper essentially unchanged since 1934. **Star Bar** on Union Avenue is the fierce rival.

## The Pueblo Chile Factor

Pueblo grows its own Mosca chile variety — earthy sweetness, medium heat, distinct from New Mexican chiles — grown along the Arkansas River Valley. The green chile in Sloppers is a thick, stew-like preparation of roasted Pueblo chiles, often with pork.

## Chile & Frijoles Festival

Every September, Union Avenue hosts the **Chile & Frijoles Festival** — one of Colorado's longest-running food festivals with over 100,000 visitors. Fresh-roasted Pueblo chiles at peak flavor, live music, and Sloppers everywhere.

If you are coming from Canon City — 45 minutes northwest on CO-50 — after a day with [Royal Gorge Rafting](https://royalgorgerafting.net), a Slopper in Pueblo is the perfect end to an Arkansas River adventure. Fly into **Colorado Springs (COS)** 45 minutes north, or **Denver (DEN)** 2.5 hours north on I-25.`,
  },
  {
    slug: 'chile-frijoles-festival',
    title: "Chile & Frijoles Festival: Pueblo's Premier Food Event",
    excerpt: "Every September, Union Avenue transforms into Colorado's biggest chile celebration. Here is your complete guide.",
    publishedAt: '2026-03-15',
    readTime: '4 min read',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=1200&q=80',
    content: `Every September, the historic **Union Avenue Historic District** transforms into a mile-long celebration of Pueblo's most prized agricultural product: the Mosca chile.

## What Is It?

The Chile & Frijoles Festival draws 100,000+ visitors over two days in late September. Highlights include:

- Chile roasters running all day filling the air with roasted chile aroma
- Food vendors serving Sloppers, tamales, green chile stew, and chile rellenos
- Live music on multiple stages
- Arts & crafts with locally made pottery and chile products
- Chile tasting competitions among local restaurants

## Planning Your Visit

The festival is on Union Avenue in downtown Pueblo. Admission is free. Parking fills fast — arrive early.

If combining with outdoor adventures, Pueblo is 45 minutes from Canon City and the Royal Gorge, where [Royal Gorge Rafting](https://royalgorgerafting.net) offers Class III-V whitewater. The [WhiteWater Bar & Grill](https://whitewaterbar.com) in Canon City (not riverside — located in downtown Canon City) is a perfect pre-festival dinner stop. Drive to Pueblo Saturday for the festival, experience Sloppers at [Gray's Coors Tavern](/restaurants/grays-coors-tavern), and cap off the night at [Brues Alehouse](/restaurants/brues-alehouse) or [Walter's Brewing](/restaurants/walters-brewing).

**Getting here:** Fly into Colorado Springs Airport (COS) — 45 minutes north on I-25 — or Denver International Airport (DEN) — 2.5 hours north on I-25.`,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
