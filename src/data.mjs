// ---------------------------------------------------------------------------
// Mooncrew Club — all website copy lives here.
// Edit this file, then run `npm run build` (Netlify does it on every push).
// ---------------------------------------------------------------------------

export const site = {
  name: 'Mooncrew Club',
  url: 'https://mooncrewclub.com',
  tagline: 'Private crew trips to the best parties in the world',
  description:
    'Hilltop Festival 2027, Weekend 2, with Mooncrew Club: a hand-picked crew of 20, five nights in a luxury Goa villa with a private pool, your Hilltop pass, a private cook, house parties with booked DJs and every ride. 4–9 Feb 2027. ₹84,000 per person.',
  status: 'Applications open · closes 31 Dec',
  // People can call or WhatsApp either host. Numbers are digits only, with the country code.
  contacts: [
    { name: 'Siddharth', role: 'Host', phone: '918373935414', show: '+91 83739 35414' },
    // CHECK: this number has 9 digits. Add the missing digit before going live.
    { name: 'Vinita Singh', role: 'Host', phone: '91886012235', show: '+91 886012235' },
  ],
  // The floating WhatsApp button and the apply form default to this number (Siddharth).
  whatsapp: '918373935414',
  // Instagram handle without @. Leave '' to hide the Instagram buttons.
  instagram: '',
  location: ['Vagator, North Goa', 'India'],
  since: '2020',
};

export const nav = [
  { label: 'Home', href: '/', img: '/assets/img/night-stage-sm.webp' },
  { label: 'The Trip', href: '/hilltop/', img: '/assets/img/villa-pool-sm.webp' },
  { label: 'Gallery', href: '/gallery/', img: '/assets/img/night-purple-sm.webp' },
  { label: 'Apply', href: '/apply/', img: '/assets/img/pink-sm.webp' },
];

export const trip = {
  festival: 'Hilltop Festival 2027',
  name: 'Hilltop Festival 2027 · Weekend 2',
  dates: '4–9 Feb 2027',
  nights: 5,
  festivalDates: '4–7 Feb',
  where: 'Vagator, Goa',
  seats: 20,
  minGuests: 12,
  price: '₹84,000',
  advance: '₹42,000',
  balanceBy: '10 January 2027',
  decisionBy: '15 January 2027',
  cancelBy: '5 January 2027',
  closes: '31 December',
};

// Hero image strip (runs as a marquee). `big` tiles are text blocks.
export const strip = [
  { img: 'night-stage', alt: 'The Hilltop stage glowing under the trees at night' },
  { img: 'villa-pool', alt: 'A villa pool looking out over the sea' },
  { big: 'price' },
  { img: 'day-canopy', alt: 'A psychedelic canopy over the afternoon crowd at Hilltop' },
  { video: 'hands', alt: 'A crowd with hands up as the drop hits' },
  { img: 'goldpalm', alt: 'A palm against a golden Goa sunset' },
  { img: 'night-purple', alt: 'A purple canopy lit up over the crowd' },
  { big: 'seats' },
  { img: 'villa-living', alt: 'A villa living room opening onto the pool' },
  { img: 'uv-live', alt: 'A UV-painted stage with live drums' },
  { img: 'pink', alt: 'Palm silhouettes against a pink sunset' },
];

export const stats = [
  { value: '20', label: 'Hand-picked guests per Hilltop' },
  { value: '5', label: 'Nights in a luxury pool villa' },
  { value: '4', label: 'Days at Hilltop Festival' },
  { value: '2020', label: 'Throwing parties since', plain: true },
];

export const words = ['Psytrance', 'Techno', 'Sunsets', 'House parties', 'Pool villa', 'Hilltop'];

export const festival = {
  title: 'Hilltop, Vagator. <em>The home of Goa trance.</em>',
  paras: [
    "Hilltop is Goa's legendary psytrance venue in Vagator, North Goa, the neighbourhood where the Goa trance scene was born. Giant painted canopies, open skies and a crowd that comes back every year.",
    "Once a year it hosts Hilltop Festival, the weekend Goa's psy crowd waits for. The 2027 edition is the 16th, and the first to run over two weekends. We're going for Weekend 2: four days, 4 to 7 February.",
    'We are independent hosts, not the festival organisers. We buy your Weekend 2 pass through the official ticket seller and handle everything around it. The festival announces its own line-up.',
  ],
};

export const days = [
  { d: 'Thu', date: '4 Feb', title: 'Arrive + Hilltop opens', text: 'Airport pickup, check-in at the villa, lunch by the pool. The festival opens today, and our cars take you up whenever you are ready.', tag: 'Day 1', img: 'villa-pool' },
  { d: 'Fri', date: '5 Feb', title: 'Pool, then Hilltop', text: 'Sleep in, breakfast by the pool, then Hilltop. Back at the villa, the after-party carries on.', tag: 'Day 2', img: 'night-blue' },
  { d: 'Sat', date: '6 Feb', title: 'The big night', text: "A crew shoot with our photographer in the afternoon, then Hilltop's biggest night of the weekend.", tag: 'Peak', img: 'night-purple', hl: true },
  { d: 'Sun', date: '7 Feb', title: 'Closing day', text: "Hilltop's final day. Sunset, one last set, then a late dinner together at the villa.", tag: 'Day 4', img: 'night-stage' },
  { d: 'Mon', date: '8 Feb', title: 'The Mooncrew house party', text: 'Our own party at the villa: booked DJs, the pool, food all day and a Goa sunset to close the festival.', tag: 'House party', img: 'decks' },
  { d: 'Tue', date: '9 Feb', title: 'Slow goodbye', text: 'Breakfast, one last swim, check-out and your airport drop.', tag: 'Home', img: 'goldpalm' },
];

export const included = [
  { k: 'Stay', title: 'A luxury pool villa', text: "Five nights in one of Goa's best villas, with a private pool, 10–15 minutes from Hilltop. 2–3 guests per room.", img: 'villa-pool' },
  { k: 'Festival', title: 'Your Hilltop pass', text: 'Hilltop Festival 2027, Weekend 2, 4–7 February, bought through the official ticket seller.', img: 'wristbands' },
  { k: 'Food', title: 'A private cook, all day', text: 'Breakfast, lunch, dinner and late-night food, cooked at the villa through the day and night.', img: 'bowl' },
  { k: 'Parties', title: 'House parties + after-parties', text: 'Booked DJs, sound, decor and drinks at the villa. Your party starts when Hilltop ends.', img: 'decks' },
  { k: 'Rides', title: 'Your own cars', text: 'Cars to Hilltop and back whenever you need them, plus airport pickup and drop.', img: 'beach' },
  { k: 'Sunsets', title: 'Golden hours', text: 'Sunsets by the pool and on the beach, between the festival days.', img: 'pink' },
  { k: 'Memories', title: 'A photographer', text: 'A crew shoot and party coverage, so your phone can stay in your pocket.', img: 'night-blue' },
  { k: 'Hosts', title: 'Us, the whole time', text: 'Your hosts are with you day and night, and one of us stays sober every night.', img: 'moon' },
];

export const notIncluded = [
  'Flights or trains to Goa',
  'Food and drinks inside the festival',
  'Shopping and personal spends',
  'A private room (on request, at extra cost)',
];

export const plans = [
  {
    name: 'Shared room',
    price: '₹84,000',
    per: 'per person',
    note: '2–3 guests per room · 5 nights',
    points: ['Luxury villa with a private pool', 'Hilltop Weekend 2 pass', 'Private cook, all meals', 'House parties + after-parties with booked DJs', 'Cars all trip + airport pickup and drop', 'Photographer + Mooncrew welcome kit'],
    cta: 'Apply for a seat',
    featured: true,
  },
  {
    name: 'Private room',
    price: 'On request',
    per: '',
    note: 'Subject to availability',
    points: ['Everything in the shared plan', 'A room for you, or you and your partner', 'Confirmed on our call'],
    cta: 'Ask about a private room',
  },
];

export const compare = {
  head: ['', 'Hilltop on your own', 'Hilltop with Mooncrew'],
  rows: [
    ['Stay', 'A hotel you found online, often far from the venue', 'A luxury villa with a private pool, 10–15 minutes away'],
    ['Getting there', 'Cabs and haggling, especially at night', 'Our cars, whenever you need them'],
    ['Food', 'Wherever is open', 'A private cook, day and night'],
    ['After Hilltop', 'Searching Instagram for an after-party', 'House parties and after-parties at your villa, with booked DJs'],
    ['Your people', 'Whoever could make it', '20 hand-picked people who love the same music'],
    ['First time?', 'Work it out as you go', 'Hosts who have partied in Goa since 2020'],
    ['Safety', "You're on your own", 'A sober host every night and a female point of contact'],
  ],
};

export const newbie = [
  { title: 'Never raved before? Good.', text: 'Most of our crew were first-timers once. We walk you through everything before the trip, and we are with you on the dancefloor.' },
  { title: 'Wear what you can dance in', text: 'Light clothes, comfortable shoes, a layer for later at night, sunglasses for the afternoon.' },
  { title: 'Water and earplugs', text: 'Drink water through the day and take breaks. Musician earplugs keep the music clear and your ears safe.' },
  { title: 'Stay with your crew', text: 'We move together, share live locations and ride back together. Nobody gets left behind.' },
  { title: 'No drugs. You won’t need them.', text: 'We run drug-free trips. The music, the people and a sunset at Hilltop do the job.' },
  { title: 'Rest is part of the plan', text: 'Pool afternoons, naps and good food between the big nights, so you enjoy every day.' },
];

export const comingSoon = [
  { name: 'Koh Phangan', where: 'Thailand', text: 'Jungle parties and full moon nights on the island.', img: 'goldpalm' },
  { name: 'Sola Luna Festival', where: 'Thailand', text: 'A New Year beach festival, with after-parties on Koh Phangan.', img: 'beach' },
  { name: 'Boom Festival', where: 'Portugal', text: 'One of the world’s best-known psytrance gatherings.', img: 'night-purple' },
  { name: 'Indian Spirit Festival', where: 'Germany', text: 'Germany’s biggest psytrance festival.', img: 'night-blue' },
  { name: 'Ibiza', where: 'Spain', text: 'The island that made dance music famous.', img: 'pink' },
  { name: 'And more', where: 'Worldwide', text: 'The biggest parties on the planet, with a crew you trust.', img: 'moon' },
];

export const audiences = [
  { title: 'First-timers', text: "Never been to a rave or a psy festival? Start with Hilltop, with people who know the way." },
  { title: 'Psy and techno heads', text: "You've done festivals. You're done with the cab queues and the bad stays." },
  { title: 'Solo travellers', text: 'Come alone, leave with a crew. We match room partners before the trip.' },
  { title: 'Couples and friend groups', text: 'Bring your people. We handle the plan so nobody has to be the organiser.' },
];

export const steps = [
  { title: 'Apply', text: "Two minutes. Tell us who's coming and what kind of nights you love. It reaches us on WhatsApp." },
  { title: 'A short call', text: "Fifteen minutes, so we know the trip is right for you. We pick 20 people per Hilltop." },
  { title: 'Lock your seat', text: 'A 50% advance of ₹42,000 holds your place. The balance is due by 10 January 2027.' },
  { title: 'Just arrive', text: 'Villa, pass, food, cars and parties are handled. You join the crew WhatsApp group.' },
];

export const promises = [
  'One of your hosts stays sober every night.',
  'A female point of contact for every woman in the crew.',
  'Our cars only. Nobody rides back alone at night.',
  'Drug-free trips. We never provide or support drugs.',
  "House parties with permission, outdoor music ending at 10 pm as Goa's rules require.",
  'Full terms in writing before you pay a rupee.',
];

export const faqs = [
  { q: 'What exactly do I get for ₹84,000?', a: 'Five nights (4–9 Feb) in a luxury villa with a private pool, your Hilltop Festival Weekend 2 pass, a private cook for all meals, house parties and after-parties with booked DJs, cars all trip plus airport pickup and drop, a photographer, the Mooncrew welcome kit, and both hosts the whole time.' },
  { q: "I've never been to a rave. Is this for me?", a: 'Yes. Many of our guests come for their first time. We brief you before the trip, you are never on your own, and one of us stays sober every night.' },
  { q: 'Can I come alone?', a: "Yes, and plenty of people do. The crew meets in a WhatsApp group before the trip, and we match room partners. Want a private room? Ask us, and we'll confirm availability and the extra cost." },
  { q: 'Where is the villa?', a: 'In Anjuna, Vagator or Assagao, 10 to 15 minutes from Hilltop. We share the exact villa with confirmed guests.' },
  { q: 'Are flights included?', a: 'No. Fly or take the train to Goa yourself. We pick you up from Mopa or Dabolim airport on 4 February and drop you back on 9 February.' },
  { q: 'How does payment work?', a: 'A 50% advance of ₹42,000 locks your seat, and the balance is due by 10 January 2027. The trip runs once 12 guests confirm by 15 January 2027; if it does not, your advance is refunded in full. Any applicable taxes are shown on your invoice before you pay.' },
  { q: 'What if I need to cancel?', a: 'Tell us on or before 5 January 2027 and you get a full refund. After that, 50% of the trip price is kept, because the villa, passes, cars and DJs are booked for your seat. Full details are in our terms.' },
  { q: 'Do you provide drugs?', a: 'No, never. Drugs such as MDMA and ecstasy are illegal in India, and we run drug-free trips. Anyone using them on the trip is asked to leave without a refund.' },
  { q: 'What if the festival is cancelled or stopped?', a: 'Festivals in Goa can be stopped at short notice. If that happens, you get back whatever the organiser refunds for your pass, and the villa, food, house parties and the rest of the trip go ahead.' },
  { q: 'How do I reach you?', a: 'Call or WhatsApp Siddharth or Vinita, or DM us on Instagram. We reply personally, usually the same day.' },
];

export const terms = {
  updated: '18 November 2026',
  sections: [
    { h: 'Booking and payment', p: [
      'A seat is confirmed once we receive the 50% advance of ₹42,000. The balance of ₹42,000 is due by 10 January 2027.',
      'The trip runs once 12 guests have confirmed by 15 January 2027. If it does not run, every advance is refunded in full.',
      'Any applicable taxes are shown on your invoice before you pay.',
    ] },
    { h: 'Cancellation', p: [
      'If you cancel on or before 5 January 2027, you get a full refund.',
      'If you cancel after 5 January 2027, or do not turn up, 50% of the trip price (₹42,000) is kept. We book the villa, festival passes, cars and DJs for your seat, so a late cancellation costs us that money.',
      'You may hand your seat to a friend instead, as long as we approve them before 31 January 2027.',
    ] },
    { h: 'Drug-free policy', p: [
      'Mooncrew Club does not provide, sell, arrange or support drugs of any kind. This includes MDMA, ecstasy (XTC), LSD, cocaine, charas, ganja and every other narcotic or psychotropic substance.',
      'These substances are illegal in India under the Narcotic Drugs and Psychotropic Substances (NDPS) Act, 1985.',
      'Anyone found using, carrying or sharing drugs on the trip, at the villa or at the festival will be asked to leave immediately, without a refund.',
    ] },
    { h: 'The festival', p: [
      'Mooncrew Club is an independent trip host and is not the organiser of Hilltop Festival. The festival sets its own line-up, timings and entry rules, and you follow them at the venue.',
      'If the festival is cancelled, shortened or stopped by the authorities, you get back whatever the organiser refunds for your pass. The villa, food, house parties and the rest of the trip go ahead.',
    ] },
    { h: 'House parties and the villa', p: [
      "Our house parties run with the required permission. Outdoor music ends at 10 pm, as Goa's rules require; after that, the party moves indoors at a lower volume.",
      'Treat the villa, its staff and the neighbours with respect. Damage beyond normal use is charged to the guest responsible.',
    ] },
    { h: 'Conduct and safety', p: [
      'Guests must be 18 or older. Drink responsibly.',
      'Harassment of any kind is not tolerated. Your hosts may remove any guest who puts others at risk, without a refund.',
      'Tell us about any medical condition before the trip. We recommend travel insurance. You are responsible for your own belongings.',
    ] },
    { h: 'Photos and videos', p: [
      'Our photographer shoots the crew and the parties, and we may share some of it on Mooncrew Club social media. Tell us if you would rather not appear.',
    ] },
  ],
};

// Gallery. `video` items play in the viewer. `type` is the filter chip.
export const galleryTypes = ['All', 'Hilltop', 'Psytrance', 'Techno', 'House parties', 'Villas', 'Sunsets', 'Goa days'];
export const gallery = [
  { video: 'hilltop-night', type: 'Hilltop', alt: 'The Hilltop stage and canopy lighting up at night' },
  { img: 'night-stage', type: 'Hilltop', alt: 'The Hilltop stage glowing under the trees at night' },
  { img: 'day-canopy', type: 'Hilltop', alt: 'A psychedelic canopy and giant face sculpture over the afternoon crowd' },
  { img: 'night-purple', type: 'Hilltop', alt: 'A purple canopy lit up over the Hilltop crowd' },
  { img: 'day-stage', type: 'Hilltop', alt: 'Dancers in front of a neon stage in the afternoon sun' },
  { img: 'night-blue', type: 'Hilltop', alt: 'A blue-lit canopy and neon stage at night' },
  { img: 'day-stage-2', type: 'Hilltop', alt: 'A colourful festival stage under a fabric canopy' },
  { img: 'wristbands', type: 'Hilltop', alt: 'Two wrists with festival wristbands' },
  { video: 'psy-hands', type: 'Psytrance', alt: 'The DJ throws his hands up before the drop' },
  { video: 'psy-slowmo', type: 'Psytrance', alt: 'A psytrance crowd in slow motion under UV light' },
  { video: 'psy-crowd', type: 'Psytrance', alt: 'A psytrance crowd under a glowing stage' },
  { video: 'psy-fire', type: 'Psytrance', alt: 'A fire dancer at a Goa psy night' },
  { video: 'psy-feet', type: 'Psytrance', alt: 'Dancers under a dragon-painted UV stage' },
  { video: 'psy-frontrow', type: 'Psytrance', alt: 'The front row at 4 am' },
  { video: 'psy-uv', type: 'Psytrance', alt: 'A UV stage with a DJ and live drums' },
  { video: 'psy-early', type: 'Psytrance', alt: 'The first dancers on a UV dancefloor' },
  { img: 'uv-live', type: 'Psytrance', alt: 'A UV-painted stage with live drums and a DJ' },
  { img: 'uv-stage', type: 'Psytrance', alt: 'A DJ on a glowing UV-painted stage' },
  { video: 'techno-3am', type: 'Techno', alt: 'A techno crowd in smoke and red light at 3 am' },
  { video: 'techno-club', type: 'Techno', alt: 'A techno night in a red-lit club' },
  { video: 'techno-day', type: 'Techno', alt: 'A daytime techno party, hands in the air' },
  { img: 'techno', type: 'Techno', alt: 'A techno crowd under palms, smoke and coloured light' },
  { video: 'house-day', type: 'House parties', alt: 'Dancing at a daytime house party' },
  { video: 'house-decks', type: 'House parties', alt: 'Behind the decks at a house party' },
  { img: 'decks', type: 'House parties', alt: 'A DJ mixing under a psychedelic canopy' },
  { img: 'villa-pool', type: 'Villas', alt: 'An infinity pool looking out over the sea', note: 'From a past Mooncrew trip' },
  { img: 'villa-living', type: 'Villas', alt: 'A villa living room opening onto the pool', note: 'From a past Mooncrew trip' },
  { img: 'villa-bedroom', type: 'Villas', alt: 'A villa bedroom with a carved wooden bed', note: 'From a past Mooncrew trip' },
  { img: 'villa-interior', type: 'Villas', alt: 'A sculpted villa interior with rattan and rope', note: 'From a past Mooncrew trip' },
  { img: 'pool', type: 'Villas', alt: 'A small yellow flower held over a villa pool at sunrise' },
  { img: 'goldpalm', type: 'Sunsets', alt: 'A lone palm against a golden sky' },
  { img: 'pink', type: 'Sunsets', alt: 'Palm silhouettes against a pink sunset' },
  { img: 'beach', type: 'Sunsets', alt: 'A cyclist and a dog on a wide beach at dusk' },
  { img: 'boat', type: 'Sunsets', alt: 'A painted fishing boat on the sand at golden hour' },
  { img: 'moon', type: 'Sunsets', alt: 'The moon through clouds beside a palm' },
  { img: 'view', type: 'Goa days', alt: 'Palm trees above a North Goa beach' },
  { img: 'coconut', type: 'Goa days', alt: 'Looking up into a coconut palm' },
  { img: 'bowl', type: 'Goa days', alt: 'A smoothie bowl at a beach cafe' },
  { img: 'lunch', type: 'Goa days', alt: 'A long lunch with a passion fruit cooler' },
  { img: 'flower', type: 'Goa days', alt: 'Pink and white frangipani flowers' },
  { img: 'market', type: 'Goa days', alt: 'A night market lane under palms and paper stars' },
];
