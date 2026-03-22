import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import bcrypt from 'bcryptjs'

async function seed() {
  const url = process.env['DATABASE_URL']
  if (!url) throw new Error('DATABASE_URL is required')
  const sql = neon(url)
  const db = drizzle(sql, { schema })

  console.log('Seeding DinePueblo...')

  // Admin
  const passwordHash = await bcrypt.hash('Trace87223!', 12)
  await db.insert(schema.admins).values({
    email: 'CEO@epicai.ai',
    passwordHash,
    name: 'Trace Hildebrand',
    role: 'super_admin',
  }).onConflictDoNothing()
  console.log('Admin seeded: CEO@epicai.ai / Trace87223!')

  // Categories
  const categoryData = [
    { name: 'Pueblo Slopper', slug: 'pueblo-slopper', description: 'The legendary Pueblo green chile cheeseburger', icon: 'flame', sortOrder: 1 },
    { name: 'Mexican & New Mexican', slug: 'mexican', description: 'Authentic Mexican and New Mexican cuisine featuring Pueblo chiles', icon: 'pepper', sortOrder: 2 },
    { name: 'Craft Beer & Breweries', slug: 'breweries', description: 'Local craft breweries and taprooms', icon: 'beer', sortOrder: 3 },
    { name: 'Italian', slug: 'italian', description: "Pueblo's rich Italian heritage dining", icon: 'utensils', sortOrder: 4 },
    { name: 'Riverwalk Dining', slug: 'riverwalk', description: 'Restaurants along the Arkansas River Riverwalk', icon: 'waves', sortOrder: 5 },
    { name: 'BBQ & Smokehouse', slug: 'bbq', description: 'Slow-smoked BBQ and American comfort food', icon: 'flame', sortOrder: 6 },
    { name: 'Breakfast & Brunch', slug: 'breakfast', description: 'Morning favorites and weekend brunch spots', icon: 'sunrise', sortOrder: 7 },
    { name: 'Fine Dining', slug: 'fine-dining', description: 'Upscale dining experiences in Pueblo', icon: 'star', sortOrder: 8 },
  ]
  await db.insert(schema.categories).values(categoryData).onConflictDoNothing()
  console.log('8 categories seeded')

  const allCategories = await db.select().from(schema.categories)
  const catMap = Object.fromEntries(allCategories.map(c => [c.slug, c.id]))

  // Restaurants
  const restaurantData = [
    {
      name: "Gray's Coors Tavern",
      slug: 'grays-coors-tavern',
      description: "Home of the original Pueblo Slopper since 1934 — open-faced cheeseburger smothered in Pueblo green chile.",
      longDescription: "Gray's Coors Tavern is the birthplace of the Pueblo Slopper. This no-frills tavern on Santa Fe Drive has been serving the iconic open-faced green chile cheeseburger since 1934. The Slopper features a hand-formed beef patty, melted American cheese, and ladled Pueblo green chile. It's messy, bold, and absolutely essential eating in Pueblo.",
      address: '2420 S. Santa Fe Dr, Pueblo, CO 81006',
      neighborhood: 'South Pueblo',
      phone: '(719) 564-8520',
      website: null as string | null,
      priceRange: '$' as const,
      cuisine: 'American / Pueblo Slopper',
      hours: JSON.stringify({ mon: 'Closed', tue: '11am-9pm', wed: '11am-9pm', thu: '11am-9pm', fri: '11am-10pm', sat: '11am-10pm', sun: '11am-8pm' }),
      rating: 4.6,
      reviewCount: 842,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      featured: true,
      isPremium: false,
      specialties: 'Pueblo Slopper, Green Chile Cheeseburger',
    },
    {
      name: "Star Bar",
      slug: 'star-bar',
      description: "Pueblo Slopper legend. Hole-in-the-wall perfection on Union Ave with one of the best green chile recipes in the city.",
      longDescription: "The Star Bar on Union Avenue is a true Pueblo dive bar and top contender for the best Slopper in the city. The green chile is made from scratch daily using Pueblo chiles. Cash-only, ice-cold beer, and a green chile burger that'll change your life.",
      address: '133 W. B St, Pueblo, CO 81003',
      neighborhood: 'Downtown',
      phone: '(719) 542-0603',
      website: null as string | null,
      priceRange: '$' as const,
      cuisine: 'American / Pueblo Slopper',
      hours: JSON.stringify({ mon: '11am-9pm', tue: '11am-9pm', wed: '11am-9pm', thu: '11am-9pm', fri: '11am-10pm', sat: '11am-10pm', sun: '11am-8pm' }),
      rating: 4.5,
      reviewCount: 621,
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
      featured: true,
      isPremium: false,
      specialties: 'Pueblo Slopper, Green Chile',
    },
    {
      name: "Gaetano's",
      slug: 'gaetanos',
      description: "Pueblo's most beloved Italian restaurant since 1941. Homemade pasta, slow-simmered red sauce, and old-world Italian-American hospitality.",
      longDescription: "Gaetano's has been the cornerstone of Pueblo's Italian dining scene since 1941. The handmade ravioli, slow-simmered meat sauce, and legendary lasagna are worth the drive from anywhere in Colorado. The warm dining room feels like stepping back in time.",
      address: '910 W. Northern Ave, Pueblo, CO 81004',
      neighborhood: 'Bessemer',
      phone: '(719) 544-0817',
      website: 'https://gaetanospueblo.com',
      priceRange: '$$' as const,
      cuisine: 'Italian',
      hours: JSON.stringify({ mon: 'Closed', tue: '11am-9pm', wed: '11am-9pm', thu: '11am-9pm', fri: '11am-10pm', sat: '4pm-10pm', sun: '11am-8pm' }),
      rating: 4.7,
      reviewCount: 1204,
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      featured: true,
      isPremium: true,
      specialties: 'Lasagna, Homemade Ravioli, Meat Sauce, Spumoni',
    },
    {
      name: "Walter's Brewing Company",
      slug: 'walters-brewing',
      description: "Pueblo's original craft brewery. House-brewed beers, elevated pub fare, and a dog-friendly taproom on First Street.",
      longDescription: "Walter's Brewing Company is Pueblo's pioneering craft brewery, brewing small-batch ales and lagers downtown. Named after Walter's Beer, a historic Pueblo brand, Walter's carries on the city's proud brewing tradition. The taproom features exposed brick, communal tables, and a sunny patio.",
      address: '415 E. First St, Pueblo, CO 81003',
      neighborhood: 'Downtown',
      phone: '(719) 924-3015',
      website: 'https://waltersbrewing.com',
      priceRange: '$$' as const,
      cuisine: 'Craft Brewery / American',
      hours: JSON.stringify({ mon: 'Closed', tue: '3pm-10pm', wed: '3pm-10pm', thu: '3pm-10pm', fri: '12pm-11pm', sat: '12pm-11pm', sun: '12pm-9pm' }),
      rating: 4.5,
      reviewCount: 567,
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
      featured: true,
      isPremium: true,
      specialties: 'House IPAs, Lagers, Green Chile Poutine',
    },
    {
      name: "Brues Alehouse",
      slug: 'brues-alehouse',
      description: "30+ craft taps, epic burgers, and Pueblo's best beer garden on East Fourth Street.",
      longDescription: "Brues Alehouse has become Pueblo's must-visit craft beer destination. With 30+ taps and their own house-brewed selections, the selection is unmatched. The smash burgers are addictive and the covered beer garden is the best outdoor dining spot in Pueblo.",
      address: '1630 E. Fourth St, Pueblo, CO 81001',
      neighborhood: 'East Side',
      phone: '(719) 696-6999',
      website: 'https://bruesalehouse.com',
      priceRange: '$$' as const,
      cuisine: 'Craft Brewery / American',
      hours: JSON.stringify({ mon: '11am-10pm', tue: '11am-10pm', wed: '11am-10pm', thu: '11am-11pm', fri: '11am-12am', sat: '11am-12am', sun: '11am-9pm' }),
      rating: 4.6,
      reviewCount: 892,
      imageUrl: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=800&q=80',
      featured: true,
      isPremium: true,
      specialties: 'Smash Burgers, 30+ Craft Taps, Green Chile Mac',
    },
    {
      name: "Ianne's Whisky Ridge",
      slug: 'iannes-whisky-ridge',
      description: "Pueblo's premier fine dining destination. Steaks, chops, and classic cocktails with panoramic views.",
      longDescription: "Ianne's Whisky Ridge is the special-occasion restaurant in Pueblo. Set atop a ridge with sweeping views of the Arkansas River valley, the restaurant serves USDA prime steaks, fresh seafood, and classic Italian-American dishes alongside an extensive whisky selection.",
      address: '4521 N. Elizabeth St, Pueblo, CO 81008',
      neighborhood: 'North Pueblo',
      phone: '(719) 545-6600',
      website: 'https://ianneswhiskyridge.com',
      priceRange: '$$$' as const,
      cuisine: 'Fine Dining / Steakhouse',
      hours: JSON.stringify({ mon: 'Closed', tue: 'Closed', wed: '5pm-9pm', thu: '5pm-9pm', fri: '5pm-10pm', sat: '5pm-10pm', sun: '5pm-9pm' }),
      rating: 4.5,
      reviewCount: 743,
      imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'USDA Prime Steaks, Whisky Selection, Panoramic Views',
    },
    {
      name: "Mi Casita",
      slug: 'mi-casita',
      description: "Family-owned Mexican restaurant serving Pueblo-style red and green chile dishes since the 1970s. The tamales are famous.",
      longDescription: "Mi Casita has been a Pueblo family institution for over 50 years. The tamales are made in-house from a recipe passed down through three generations, and the red chile enchiladas are some of the best in the state.",
      address: '726 W. Northern Ave, Pueblo, CO 81004',
      neighborhood: 'Bessemer',
      phone: '(719) 543-9593',
      website: null as string | null,
      priceRange: '$' as const,
      cuisine: 'Mexican / New Mexican',
      hours: JSON.stringify({ mon: 'Closed', tue: '10am-8pm', wed: '10am-8pm', thu: '10am-8pm', fri: '10am-9pm', sat: '9am-9pm', sun: '9am-7pm' }),
      rating: 4.6,
      reviewCount: 521,
      imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'Tamales, Red Chile Enchiladas, Menudo, Breakfast Burritos',
    },
    {
      name: "Rosario's Mexican Cafe",
      slug: 'rosarios-mexican-cafe',
      description: "Fresh, made-from-scratch Mexican food with an emphasis on Pueblo green chile on Union Avenue.",
      longDescription: "Rosario's makes everything from scratch — salsas, tortillas, and especially the green chile, which uses Pueblo Mosca chiles sourced directly from local farms. The breakfast burrito smothered in green chile is a local legend.",
      address: '231 S. Union Ave, Pueblo, CO 81003',
      neighborhood: 'Union Avenue Historic District',
      phone: '(719) 542-1400',
      website: null as string | null,
      priceRange: '$' as const,
      cuisine: 'Mexican / New Mexican',
      hours: JSON.stringify({ mon: '8am-2pm', tue: '8am-2pm', wed: '8am-2pm', thu: '8am-2pm', fri: '8am-3pm', sat: '8am-3pm', sun: 'Closed' }),
      rating: 4.4,
      reviewCount: 398,
      imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'Green Chile Breakfast Burrito, Combo Plates',
    },
    {
      name: "La Renaissance",
      slug: 'la-renaissance',
      description: "Elegant fine dining in a beautifully restored Victorian building. French and Continental cuisine downtown.",
      longDescription: "La Renaissance occupies one of downtown Pueblo's most stunning historic buildings. The menu features French-inspired dishes alongside Colorado-sourced ingredients: elk tenderloin, pan-seared trout, and classic desserts made in-house.",
      address: '217 E. Routt Ave, Pueblo, CO 81004',
      neighborhood: 'Downtown',
      phone: '(719) 543-6367',
      website: 'https://larenaissance.net',
      priceRange: '$$$' as const,
      cuisine: 'Fine Dining / French Continental',
      hours: JSON.stringify({ mon: 'Closed', tue: 'Closed', wed: '5pm-9pm', thu: '5pm-9pm', fri: '5pm-10pm', sat: '5pm-10pm', sun: 'Closed' }),
      rating: 4.7,
      reviewCount: 456,
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'Elk Tenderloin, Pan-Seared Trout, Curated Wine List',
    },
    {
      name: "Pantaleone's New York Pizza",
      slug: 'pantaleones',
      description: "Award-winning New York-style pizza in Pueblo since 1993. Hand-tossed crusts and the famous green chile white pizza.",
      longDescription: "Pantaleone's has been making some of the best pizza in Colorado since 1993. Using hand-tossed dough, house-made sauce, and quality toppings. The green chile white pizza is the must-order Pueblo-exclusive creation.",
      address: '1 S. Santa Fe Dr, Pueblo, CO 81006',
      neighborhood: 'South Pueblo',
      phone: '(719) 546-1898',
      website: 'https://pantaleones.com',
      priceRange: '$$' as const,
      cuisine: 'Pizza / Italian',
      hours: JSON.stringify({ mon: '11am-9pm', tue: '11am-9pm', wed: '11am-9pm', thu: '11am-9pm', fri: '11am-10pm', sat: '11am-10pm', sun: '12pm-9pm' }),
      rating: 4.5,
      reviewCount: 784,
      imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'New York Slices, Green Chile White Pizza, Calzones',
    },
    {
      name: "Boss Hog's BBQ",
      slug: 'boss-hogs-bbq',
      description: "Low-and-slow smoked meats, house-made sauces, and classic Southern BBQ sides.",
      longDescription: "Boss Hog's BBQ brings serious Southern-style barbecue to Pueblo. The pits run day and night to produce fall-off-the-bone ribs, silky brisket, and pulled pork. The Pueblo green chile BBQ sauce is a customer favorite.",
      address: '4875 Eagleridge Blvd, Pueblo, CO 81008',
      neighborhood: 'Eagleridge',
      phone: '(719) 543-4227',
      website: null as string | null,
      priceRange: '$$' as const,
      cuisine: 'BBQ / Smokehouse',
      hours: JSON.stringify({ mon: 'Closed', tue: '11am-8pm', wed: '11am-8pm', thu: '11am-8pm', fri: '11am-9pm', sat: '11am-9pm', sun: '11am-7pm' }),
      rating: 4.4,
      reviewCount: 342,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'Brisket, St. Louis Ribs, Pulled Pork, Green Chile BBQ Sauce',
    },
    {
      name: "Magpie's Coffee",
      slug: 'magpies-coffee',
      description: "Pueblo's beloved local coffee shop. Specialty espresso, fresh pastries, and the best breakfast on Union Avenue.",
      longDescription: "Magpie's Coffee is the social hub of Pueblo's Union Avenue Historic District. Serious espresso, seasonal lattes, and fresh-baked pastries in a warm space with exposed brick and local art.",
      address: '105 W. B St, Pueblo, CO 81003',
      neighborhood: 'Union Avenue Historic District',
      phone: '(719) 542-0035',
      website: null as string | null,
      priceRange: '$' as const,
      cuisine: 'Coffee Shop / Breakfast',
      hours: JSON.stringify({ mon: '7am-3pm', tue: '7am-3pm', wed: '7am-3pm', thu: '7am-3pm', fri: '7am-4pm', sat: '8am-4pm', sun: '9am-2pm' }),
      rating: 4.7,
      reviewCount: 612,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'Specialty Espresso, Avocado Toast, House Scones',
    },
    {
      name: "Riverpark Inn & Restaurant",
      slug: 'riverpark-inn-restaurant',
      description: "Scenic dining on the Arkansas River Riverwalk. American comfort food and Colorado specialties with waterfront views.",
      longDescription: "The Riverpark Inn & Restaurant offers one of the most scenic dining experiences in Pueblo, situated right on the Arkansas River Riverwalk. Menu features Colorado comfort classics — green chile stew, Rocky Mountain trout, and prime rib on weekends.",
      address: '4580 N. Elizabeth St, Pueblo, CO 81008',
      neighborhood: 'Riverwalk',
      phone: '(719) 542-0555',
      website: 'https://riverparkinn.com',
      priceRange: '$$' as const,
      cuisine: 'American / Riverwalk Dining',
      hours: JSON.stringify({ mon: '7am-9pm', tue: '7am-9pm', wed: '7am-9pm', thu: '7am-9pm', fri: '7am-10pm', sat: '7am-10pm', sun: '7am-9pm' }),
      rating: 4.2,
      reviewCount: 418,
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      featured: false,
      isPremium: false,
      specialties: 'Prime Rib, Colorado Trout, Green Chile Stew, Riverside Patio',
    },
  ]

  const insertedRestaurants = await db.insert(schema.restaurants).values(restaurantData).onConflictDoNothing().returning()
  console.log(`${insertedRestaurants.length} restaurants seeded`)

  const allRestaurants = await db.select().from(schema.restaurants)
  const restMap = Object.fromEntries(allRestaurants.map(r => [r.slug, r.id]))

  // Category links
  const links = [
    ['grays-coors-tavern', 'pueblo-slopper'],
    ['star-bar', 'pueblo-slopper'],
    ['mi-casita', 'mexican'],
    ['rosarios-mexican-cafe', 'mexican'],
    ['walters-brewing', 'breweries'],
    ['brues-alehouse', 'breweries'],
    ['gaetanos', 'italian'],
    ['pantaleones', 'italian'],
    ['riverpark-inn-restaurant', 'riverwalk'],
    ['boss-hogs-bbq', 'bbq'],
    ['magpies-coffee', 'breakfast'],
    ['rosarios-mexican-cafe', 'breakfast'],
    ['iannes-whisky-ridge', 'fine-dining'],
    ['la-renaissance', 'fine-dining'],
  ]

  const junctionData = links
    .map(([r, c]) => ({ restaurantId: restMap[r], categoryId: catMap[c] }))
    .filter(l => l.restaurantId && l.categoryId) as Array<{ restaurantId: string; categoryId: string }>

  if (junctionData.length > 0) {
    await db.insert(schema.restaurantCategories).values(junctionData).onConflictDoNothing()
    console.log(`${junctionData.length} category links seeded`)
  }

  console.log('\nSeed complete! Login: CEO@epicai.ai / Trace87223!')
}

seed().catch(err => { console.error(err); process.exit(1) })
