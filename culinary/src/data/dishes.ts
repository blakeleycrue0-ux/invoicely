// ─────────────────────────────────────────────────────────────────
//  CONTENT LIVES HERE.  Add a new dish = add an object to `dishes`.
//  No backend required. Everything is typed so your editor will guide
//  you. Want a real DB later? See the Supabase seam note at the bottom.
// ─────────────────────────────────────────────────────────────────

export type Difficulty = 'Easy' | 'Medium' | 'Pro'

export interface Ingredient {
  /** quantity for the dish's BASE servings (see `servings`). Omit for "to taste". */
  qty?: number
  unit?: string
  item: string
  note?: string
}

export interface Step {
  text: string
  /** if set, Cook Mode shows a built-in timer (in seconds) for this step */
  seconds?: number
}

export interface Technique {
  /** the one-line headline of the pro move */
  title: string
  /** why it matters / how to do it — the thing a home cook wouldn't know */
  body: string
}

export interface Dish {
  id: string
  title: string
  /** one punchy line for cards + detail subhead */
  blurb: string
  minutes: number
  difficulty: Difficulty
  /** base number of servings the ingredient quantities are written for */
  servings: number
  /** TikTok or YouTube URL — embedded as an iframe, nothing is hosted */
  videoUrl?: string
  /** optional hero image URL. If omitted, a designed placeholder is shown. */
  image?: string
  tags?: string[]
  ingredients: Ingredient[]
  steps: Step[]
  technique: Technique
}

export const dishes: Dish[] = [
  {
    id: 'silky-cacio-e-pepe',
    title: 'Silky Cacio e Pepe',
    blurb: 'Three ingredients, zero mercy. The pasta that exposes bad technique.',
    minutes: 20,
    difficulty: 'Pro',
    servings: 2,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['pasta', 'italian', 'fast'],
    ingredients: [
      { qty: 200, unit: 'g', item: 'tonnarelli or spaghetti' },
      { qty: 100, unit: 'g', item: 'Pecorino Romano', note: 'finely grated, room temp' },
      { qty: 2, unit: 'tsp', item: 'black peppercorns', note: 'freshly cracked' },
      { item: 'sea salt', note: 'for the pasta water' },
    ],
    steps: [
      { text: 'Toast the cracked pepper in a dry pan until fragrant — about 60 seconds. This wakes up the oils.', seconds: 60 },
      { text: 'Boil the pasta in deliberately under-salted water. You want that starch concentrated, not diluted.' },
      { text: 'Ladle out a mug of pasta water and let it cool for a minute — boiling water will seize the cheese.', seconds: 60 },
      { text: 'Whisk the Pecorino with a few tablespoons of the cooled water into a loose paste off the heat.' },
      { text: 'Toss the drained pasta with the pepper, then beat in the cheese paste a splash at a time until it turns glossy.' },
    ],
    technique: {
      title: 'Let the pasta water cool before it touches the cheese',
      body: 'Pecorino is mostly protein and fat. Hit it with boiling water and the proteins clench into rubbery clumps — the dreaded "cheese scramble". Drop the water to around 70°C first and the starch emulsifies the fat into a glossy sauce instead. Patience for 60 seconds is the whole dish.',
    },
  },
  {
    id: 'restaurant-seared-steak',
    title: 'Cast-Iron Steak, Restaurant-Style',
    blurb: 'The crust you think only restaurants can get. It is just heat and patience.',
    minutes: 30,
    difficulty: 'Medium',
    servings: 2,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['beef', 'dinner', 'searing'],
    ingredients: [
      { qty: 2, unit: '', item: 'ribeye steaks', note: '2.5cm thick, dried & salted 1hr ahead' },
      { qty: 2, unit: 'tbsp', item: 'neutral oil', note: 'high smoke point' },
      { qty: 3, unit: 'tbsp', item: 'butter' },
      { qty: 3, unit: 'cloves', item: 'garlic', note: 'smashed' },
      { qty: 2, unit: 'sprigs', item: 'thyme' },
    ],
    steps: [
      { text: 'Pull the steaks from the fridge and let them lose their chill — cold meat steams instead of searing.' },
      { text: 'Pat absolutely bone-dry. Get the pan ripping hot until the oil shimmers and barely smokes.' },
      { text: 'Lay the steak away from you and DO NOT touch it for 2 minutes. Let the crust form.', seconds: 120 },
      { text: 'Flip, add butter, garlic and thyme, and spoon the foaming butter over the top for 90 seconds.', seconds: 90 },
      { text: 'Rest the steak on a rack for at least 5 minutes before slicing against the grain.', seconds: 300 },
    ],
    technique: {
      title: 'Dry surface beats expensive cut',
      body: 'A crust (the Maillard reaction) cannot start until every drop of surface moisture has boiled off — so a wet steak spends its first 90 seconds steaming, not browning. Salt it uncovered in the fridge for an hour: the salt pulls moisture out, then reabsorbs it, leaving a tacky-dry surface that browns on contact. This single habit closes most of the gap between home and restaurant.',
    },
  },
  {
    id: 'glassy-pan-sauce',
    title: 'The 5-Minute Pan Sauce',
    blurb: 'Never throw away a fond again. This turns the brown stuff into a sauce.',
    minutes: 10,
    difficulty: 'Easy',
    servings: 2,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['sauce', 'technique', 'fast'],
    ingredients: [
      { qty: 1, unit: 'small', item: 'shallot', note: 'minced' },
      { qty: 120, unit: 'ml', item: 'stock or wine' },
      { qty: 2, unit: 'tbsp', item: 'cold butter', note: 'cubed, kept cold' },
      { qty: 1, unit: 'tsp', item: 'Dijon mustard' },
      { item: 'lemon', note: 'a squeeze, to finish' },
    ],
    steps: [
      { text: 'In the same pan you cooked your protein, soften the shallot in the leftover fat for a minute.', seconds: 60 },
      { text: 'Pour in the liquid and scrape every brown bit off the bottom — that fond is pure flavour.' },
      { text: 'Reduce by half until it lightly coats a spoon.' },
      { text: 'Off the heat, swirl in the cold butter a cube at a time until glossy. Finish with Dijon and lemon.' },
    ],
    technique: {
      title: 'Mount with COLD butter, off the heat',
      body: 'A pan sauce gets its glossy, clingy body from an emulsion of butterfat suspended in the liquid. Add warm butter or leave the pan on the burner and it just melts into greasy oil that splits. Cold butter melts slowly enough to emulsify — swirl, do not stir, and keep it off direct heat. This is the move behind every "how is it so silky?" restaurant sauce.',
    },
  },
  {
    id: 'jammy-soft-egg',
    title: 'Jammy Eggs, On Command',
    blurb: 'The same perfect orange center every single time. It is just a timer.',
    minutes: 12,
    difficulty: 'Easy',
    servings: 4,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['eggs', 'breakfast', 'meal-prep'],
    ingredients: [
      { qty: 4, unit: '', item: 'eggs', note: 'straight from the fridge' },
      { item: 'ice', note: 'for the ice bath' },
      { item: 'flaky salt', note: 'to finish' },
    ],
    steps: [
      { text: 'Bring a pot of water to a rolling boil and prepare a bowl of ice water beside it.' },
      { text: 'Gently lower in the cold eggs and set a timer for exactly 6 minutes 30 seconds.', seconds: 390 },
      { text: 'Move them straight to the ice bath and leave for 3 minutes to stop the cooking dead.', seconds: 180 },
      { text: 'Peel under a thin stream of water, starting at the fat (air-pocket) end.' },
    ],
    technique: {
      title: 'Cold eggs, boiling water, hard stop',
      body: 'Consistency comes from removing variables. Starting eggs cold and dropping them into already-boiling water (not cold water you bring up) makes the cook time repeatable to the second. The ice bath is not optional — carryover heat keeps cooking the yolk for a minute after you pull them, so chilling immediately is what locks in "jammy" instead of "chalky".',
    },
  },
  {
    id: 'crispy-smashed-potatoes',
    title: 'Smashed Potatoes, Maximum Crunch',
    blurb: 'Crispier than fries, softer than mash, and impossible to stop eating.',
    minutes: 50,
    difficulty: 'Easy',
    servings: 4,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['sides', 'potato', 'crispy'],
    ingredients: [
      { qty: 800, unit: 'g', item: 'baby potatoes' },
      { qty: 4, unit: 'tbsp', item: 'olive oil' },
      { qty: 2, unit: 'tbsp', item: 'salt', note: 'for the boil' },
      { item: 'flaky salt & herbs', note: 'to finish' },
    ],
    steps: [
      { text: 'Boil the potatoes in heavily salted water until a knife slides through with no resistance.' },
      { text: 'Drain and let them steam dry for 5 minutes — surface moisture is the enemy of crunch.', seconds: 300 },
      { text: 'Smash each one flat with the base of a glass on an oiled tray. More edges = more crisp.' },
      { text: 'Drench in oil and roast hot until deeply golden and lacy at the edges, about 30 minutes.', seconds: 1800 },
    ],
    technique: {
      title: 'Steam-dry before they ever see oil',
      body: 'Boiled potatoes are saturated with water; throw them straight into oil and they fry their own steam, going soggy. Let them sit and exhale for five minutes so the surface dries and the interior turns fluffy. Dry, craggy surface + hot oil is the entire secret to a shatter-crisp shell — no double-frying required.',
    },
  },
  {
    id: 'weeknight-stir-fry',
    title: 'Wok-Hei Weeknight Stir-Fry',
    blurb: 'That smoky takeout flavour at home — without a restaurant burner.',
    minutes: 25,
    difficulty: 'Medium',
    servings: 2,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['asian', 'fast', 'vegetables'],
    ingredients: [
      { qty: 300, unit: 'g', item: 'protein of choice', note: 'sliced thin' },
      { qty: 4, unit: 'cups', item: 'mixed vegetables', note: 'cut to even size' },
      { qty: 3, unit: 'tbsp', item: 'neutral oil' },
      { qty: 2, unit: 'tbsp', item: 'soy sauce' },
      { qty: 1, unit: 'tbsp', item: 'garlic & ginger', note: 'minced' },
    ],
    steps: [
      { text: 'Prep EVERYTHING first — once the wok is hot there is no time to chop. This is mise en place.' },
      { text: 'Get the pan smoking hot and cook the protein in a single layer, in batches. Crowding = steaming.' },
      { text: 'Remove the protein, blast the vegetables hard and fast so they char but stay crisp.' },
      { text: 'Return everything, hit the edge of the pan with soy so it sizzles and caramelises, toss, and serve immediately.' },
    ],
    technique: {
      title: 'Cook in batches and pour sauce on the metal',
      body: 'A home burner cannot recover heat fast enough for a full wok, so a crowded pan drops to a simmer and everything stews. Cook in small batches to keep the surface searing. And add the soy down the hot side of the pan, not onto the food — it hits the metal, caramelises instantly, and that flash of scorched-sweet aroma is the closest a home kitchen gets to true wok hei.',
    },
  },
]

/** convenience lookup used by the dish detail + cook mode routes */
export function getDish(id: string): Dish | undefined {
  return dishes.find((d) => d.id === id)
}

// ── SUPABASE SEAM ──────────────────────────────────────────────────
// Today `dishes` is a static array, which keeps v1 free and backend-free.
// To move content into Supabase later WITHOUT touching the UI:
//   1. Create a `dishes` table mirroring the `Dish` interface above.
//   2. Replace the body of getDish / add a getDishes() that awaits
//      supabase.from('dishes').select(...).
//   3. Make the callers async (a tiny loading state in Home/DishDetail).
// Nothing else in the app reads the data directly — this file is the
// single source of truth, so it is the only thing that has to change.
