// ---------------------------------------------------------------------------
// Mooncrew Club — all website copy lives here.
// Edit this file, then run `npm run build` (Netlify does it on every push).
// ---------------------------------------------------------------------------

export const site = {
  name: 'Mooncrew Club',
  wordmark: 'MOONCREW',
  url: 'https://mooncrewclub.com',
  tagline: 'Private crew trips to the best nights',
  description:
    'A private crew of 20 at Hilltop Festival, Weekend 2, in Vagator, Goa (4–8 Feb 2027). Four nights in a private villa, festival pass, food, two house parties and every ride. ₹84,000 per person.',
  status: 'Applications open · closes 31 Dec',
  // People can call or WhatsApp either host. Numbers are digits only, with the country code.
  contacts: [
    { name: 'Siddharth', role: 'Host', phone: '918373935414', show: '+91 83739 35414' },
    // CHECK: this number has 9 digits. Add the missing digit before going live.
    { name: 'Vinita Singh', role: 'Host', phone: '91886012235', show: '+91 886012235' },
  ],
  // The apply form opens WhatsApp with this number (Siddharth).
  whatsapp: '918373935414',
  // Instagram handle without @. Leave '' to hide the Instagram buttons.
  instagram: '',
  email: '',
  location: ['Vagator, North Goa', 'India'],
};

export const nav = [
  { label: 'Home', href: '/', img: '/assets/img/night-stage-sm.webp' },
  { label: 'The Trip', href: '/hilltop/', img: '/assets/img/day-canopy-sm.webp' },
  { label: 'Gallery', href: '/gallery/', img: '/assets/img/night-purple-sm.webp' },
  { label: 'Apply', href: '/apply/', img: '/assets/img/pool-sm.webp' },
];

export const trip = {
  name: 'Hilltop Festival 2027 · Weekend 2',
  dates: '4–8 Feb 2027',
  festivalDates: '4–7 February',
  where: 'Vagator, Goa',
  seats: 20,
  minGuests: 12,
  price: '₹84,000',
  advance: '₹42,000',
  balanceBy: '10 January',
  decisionBy: '15 January',
  closes: '31 December',
};

// Hero image strip (runs as a marquee). `big` tiles are text blocks.
export const strip = [
  { img: 'night-stage', alt: 'The Hilltop stage glowing under the trees at night' },
  { img: 'pool', alt: 'A flower held over a villa pool at sunrise' },
  { big: 'price' },
  { img: 'day-canopy', alt: 'A psychedelic canopy over the afternoon crowd' },
  { video: 'hands', alt: 'A crowd with hands up as the drop hits' },
  { img: 'night-purple', alt: 'A purple canopy lit up over the crowd' },
  { big: 'seats' },
  { img: 'boat', alt: 'A painted fishing boat on the sand at dawn' },
  { img: 'uv-live', alt: 'A UV-painted stage with live drums' },
  { img: 'bowl', alt: 'A smoothie bowl at a beach cafe' },
];

export const stats = [
  { value: '20', label: 'Seats in the crew' },
  { value: '4', label: 'Nights in one private villa' },
  { value: '2', label: 'Mooncrew house parties' },
  { value: '2020', label: 'Living in Goa since' },
];

export const words = ['Psytrance', 'Techno', 'Sunsets', 'House parties', 'One villa', 'Hilltop'];

export const days = [
  { d: 'Thu', date: '4 Feb', title: 'Arrival + welcome party', text: 'Airport pickup, villa check-in, welcome lunch and the pool. Sunset welcome house party. Want to start at Hilltop tonight? The car is ready.', tag: 'Welcome', img: 'pool' },
  { d: 'Fri', date: '5 Feb', title: 'Beach, then the hill', text: 'A slow breakfast, Ashwem or Vagator beach, then Hilltop.', tag: 'Hilltop', img: 'view' },
  { d: 'Sat', date: '6 Feb', title: 'The big night', text: "Brunch, a crew shoot with our photographer, then Hilltop's biggest night.", tag: 'Peak', img: 'night-purple', hl: true },
  { d: 'Sun', date: '7 Feb', title: 'Closing day + farewell', text: "The festival's last day, then a farewell dinner and house party at the villa.", tag: 'Farewell', img: 'night-stage' },
  { d: 'Mon', date: '8 Feb', title: 'Departure', text: 'Breakfast, check-out and your airport drop.', tag: 'Home', img: 'goldpalm' },
];

export const included = [
  { k: 'Stay', title: 'A private villa', text: 'Four nights, 10–15 minutes from Hilltop, 2–3 guests per room.', img: 'pool' },
  { k: 'Festival', title: 'Your Hilltop pass', text: 'Weekend 2, 4–7 February, bought through the official channel.', img: 'wristbands' },
  { k: 'Food', title: 'Breakfast + dinner', text: "Every day, cooked fresh by the villa's cook, plus a welcome lunch.", img: 'bowl' },
  { k: 'Parties', title: 'Two house parties', text: 'Welcome and farewell sunset sessions with a DJ, drinks and decor.', img: 'decks' },
  { k: 'Rides', title: 'Every ride, sorted', text: 'Villa to Hilltop and back every day, plus Mopa or Dabolim airport pickup and drop.', img: 'beach' },
  { k: 'Memories', title: 'A photographer', text: 'A crew shoot and party coverage, so you can keep your phone in your pocket.', img: 'night-blue' },
];

export const notIncluded = [
  'Flights or trains to Goa',
  'Food and drinks inside the festival',
  'Lunches after day one',
  'Shopping and personal spends',
  'A private room (on request, at extra cost)',
];

export const plans = [
  {
    name: 'Shared room',
    price: '₹84,000',
    per: 'per person',
    note: '2–3 guests per room',
    points: ['Private villa, 4 nights', 'Hilltop Weekend 2 pass', 'Breakfast and dinner daily', 'Two house parties', 'Every ride, airport included', 'Photographer + welcome kit'],
    cta: 'Apply for a seat',
    featured: true,
  },
  {
    name: 'Private room',
    price: 'On request',
    per: '',
    note: 'Subject to availability',
    points: ['Everything in the shared plan', 'A room to yourself or your partner', 'Confirmed on our call'],
    cta: 'Ask about a private room',
  },
];

export const audiences = [
  { title: 'First-timers', text: 'Never been to a psy festival? Start with Hilltop, with people who know the way.' },
  { title: 'Psy and techno heads', text: "You've done festivals. You're done with the cab queues and the bad stays." },
  { title: 'Solo travellers', text: 'Come alone, leave with a crew. We match room partners before the trip.' },
  { title: 'Couples and friend groups', text: 'Bring your people. We handle the plan so nobody has to be the organiser.' },
];

export const steps = [
  { title: 'Apply', text: "Two minutes. Tell us who's coming and what kind of nights you love. It reaches us on WhatsApp." },
  { title: 'A short call', text: 'Fifteen minutes, so we know the trip and the crew are right for you.' },
  { title: 'Lock your seat', text: 'A 50% advance of ₹42,000 holds your place. The balance is due by 10 January.' },
  { title: 'Just arrive', text: 'Villa, passes, food and rides are handled. You join the crew WhatsApp group.' },
];

export const promises = [
  'One of your hosts stays sober every night.',
  'A female point of contact for every woman in the crew.',
  'Crew vehicles only. Nobody rides back alone at 5 am.',
  'Zero tolerance for drugs.',
  "House parties with permission, ending at 10 pm as Goa's rules require.",
  'Full terms in writing before you pay a rupee.',
];

export const faqs = [
  { q: 'Who is this trip for?', a: 'Anyone who loves psytrance or techno and wants Hilltop without the planning, the cab queues or the group chat chaos. First-timers are welcome. So are couples, friends and solo guests.' },
  { q: 'Can I come alone?', a: "Yes, and plenty of people do. The crew meets in a WhatsApp group before the trip, and we match room partners. If you'd rather have a private room, ask us and we'll confirm availability and the extra cost." },
  { q: 'Where is the villa?', a: 'In Anjuna, Vagator or Assagao, 10 to 15 minutes from Hilltop. We share the exact villa with confirmed guests.' },
  { q: 'Are flights included?', a: 'No. Fly or take the train to Goa yourself. We pick you up from Mopa or Dabolim airport at set times on 4 February and drop you back on 8 February.' },
  { q: 'How does payment work?', a: 'A 50% advance of ₹42,000 locks your seat, and the balance is due by 10 January. The trip runs once 12 guests confirm by 15 January; if it does not, your advance is refunded in full. Any applicable taxes are shown on your invoice before you pay.' },
  { q: 'What if the festival is cancelled or stopped?', a: 'Festivals in Goa can be stopped at short notice. If that happens, you get back whatever the organiser refunds for your pass, and the villa, food, house parties and the rest of the trip go ahead as planned. This is written into your terms.' },
  { q: "Who's playing?", a: "Hilltop announces the line-up. We share it in the crew group the day it's out." },
  { q: 'How do I reach you?', a: 'Call or WhatsApp Siddharth or Vinita, or send us a DM on Instagram. We reply personally, usually the same day.' },
  { q: 'Is Mooncrew part of Hilltop Festival?', a: 'No. We are independent hosts based in Goa. We buy your festival pass through the official channel and handle everything around it.' },
];

// Gallery: type is the filter chip.
export const gallery = [
  { img: 'night-stage', type: 'Hilltop', alt: 'The Hilltop stage glowing under the trees at night' },
  { img: 'day-canopy', type: 'Hilltop', alt: 'A psychedelic canopy and giant face sculpture over the afternoon crowd' },
  { img: 'night-purple', type: 'Hilltop', alt: 'A purple canopy lit up over the Hilltop crowd' },
  { img: 'day-stage', type: 'Hilltop', alt: 'Dancers in front of a neon stage in the afternoon sun' },
  { img: 'night-blue', type: 'Hilltop', alt: 'A blue-lit canopy and neon stage at night' },
  { img: 'day-stage-2', type: 'Hilltop', alt: 'A colourful festival stage under a fabric canopy' },
  { img: 'wristbands', type: 'Hilltop', alt: 'Two wrists with festival wristbands' },
  { img: 'uv-live', type: 'Goa nights', alt: 'A UV-painted stage with live drums and a DJ' },
  { img: 'decks', type: 'Goa nights', alt: 'A DJ mixing under a psychedelic canopy' },
  { img: 'techno', type: 'Goa nights', alt: 'A techno crowd under palms, smoke and coloured light' },
  { img: 'uv-stage', type: 'Goa nights', alt: 'A DJ on a glowing UV-painted stage' },
  { img: 'market', type: 'Goa nights', alt: 'A night market lane under palms and paper stars' },
  { img: 'moon', type: 'Goa nights', alt: 'The moon through clouds beside a palm' },
  { img: 'pool', type: 'Days', alt: 'A small yellow flower held over a villa pool at sunrise' },
  { img: 'view', type: 'Days', alt: 'Palm trees above a North Goa beach' },
  { img: 'boat', type: 'Days', alt: 'A painted fishing boat on the sand at dawn' },
  { img: 'beach', type: 'Days', alt: 'A cyclist and a dog on a wide beach at dusk' },
  { img: 'goldpalm', type: 'Days', alt: 'A lone palm against a golden sky' },
  { img: 'pink', type: 'Days', alt: 'Palm silhouettes against a pink sunset' },
  { img: 'coconut', type: 'Days', alt: 'Looking up into a coconut palm' },
  { img: 'bowl', type: 'Days', alt: 'A smoothie bowl at a beach cafe' },
  { img: 'lunch', type: 'Days', alt: 'A long lunch with a passion fruit cooler' },
  { img: 'flower', type: 'Days', alt: 'Pink and white frangipani flowers' },
];
