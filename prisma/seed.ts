import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Western States 100
  const westernStates = await prisma.race.create({
    data: {
      slug: "western-states-100",
      name: "Western States Endurance Run",
      shortName: "Western States 100",
      distances: ["100-mile"],
      distanceKm: 160.9,
      raceType: "TRAIL",
      terrain: ["mountain", "trail", "technical", "river-crossings"],
      city: "Olympic Valley",
      state: "California",
      stateSlug: "california",
      country: "United States",
      countrySlug: "united-states",
      countryCode: "US",
      continent: "North America",
      latitude: 39.1968,
      longitude: -120.2354,
      elevationGainM: 5500,
      elevationLossM: 7000,
      highestPointM: 2667,
      courseDescription:
        "Point-to-point from Olympic Valley to Auburn, California. The course follows the Western States Trail through the Sierra Nevada mountains, crossing deep canyons and exposed ridgelines. Runners ford the American River and endure extreme heat in the canyons before finishing on the Placer High School track.",
      typicalMonth: 6,
      yearEstablished: 1974,
      maxParticipants: 369,
      qualificationRequired: true,
      qualificationDetails:
        "Must complete a qualifying 100-mile or 100K race within certain time standards. Entry is by lottery for qualified applicants.",
      entryMethod: "LOTTERY",
      entryFeeUsd: 395,
      officialWebsite: "https://www.wser.org",
      organizerName: "Western States Endurance Run Foundation",
      description:
        "The Western States Endurance Run is the oldest 100-mile trail race in the world. Known as the 'Super Bowl of ultrarunning,' it traverses the Sierra Nevada mountains from Olympic Valley to Auburn, California. The race began in 1974 when Gordy Ainsleigh completed the course on foot after his horse was pulled from the Tevis Cup ride.",
      history:
        "Founded in 1974 when Gordy Ainsleigh proved a human could complete the 100-mile Tevis Cup horse trail on foot in under 24 hours. The race has grown into the most prestigious 100-mile race in the world.",
      notableFacts: [
        "Oldest 100-mile trail race in the world",
        "Silver buckle awarded for sub-24-hour finishes",
        "Course record: 14:09:28 by Jim Walmsley (2019)",
      ],
      tags: ["prestigious", "bucket-list", "lottery", "california", "sierra-nevada"],
      status: "ACTIVE",
      dataQualityScore: 95,
    },
  });

  await prisma.raceEdition.create({
    data: {
      raceId: westernStates.id,
      year: 2026,
      startDate: new Date("2026-06-27T05:00:00Z"),
      endDate: new Date("2026-06-28T11:00:00Z"),
      lifecycleStatus: "UPCOMING",
      entryFee: "$395",
    },
  });

  await prisma.fAQ.createMany({
    data: [
      {
        raceId: westernStates.id,
        question: "How do I qualify for Western States?",
        answer:
          "You must complete a qualifying ultra marathon (100 miles or 100K) within specified time cutoffs during the qualifying period. See wser.org for the current list of qualifying races and time standards.",
        category: "REGISTRATION",
        sortOrder: 1,
      },
      {
        raceId: westernStates.id,
        question: "What is the lottery process?",
        answer:
          "Qualified runners enter a weighted lottery held in December. Your odds increase with each year of unsuccessful entry. Some spots are reserved for top finishers and sponsors.",
        category: "REGISTRATION",
        sortOrder: 2,
      },
      {
        raceId: westernStates.id,
        question: "How hot does it get on course?",
        answer:
          "Temperatures in the canyons can exceed 110°F (43°C). The race is known for extreme heat, particularly in the canyons between Michigan Bluff and the river crossings. Heat training is essential for preparation.",
        category: "COURSE",
        sortOrder: 3,
      },
    ],
  });

  // UTMB
  const utmb = await prisma.race.create({
    data: {
      slug: "utmb-mont-blanc",
      name: "Ultra-Trail du Mont-Blanc",
      shortName: "UTMB",
      distances: ["100-mile"],
      distanceKm: 171,
      raceType: "TRAIL",
      terrain: ["mountain", "alpine", "technical", "high-altitude"],
      city: "Chamonix",
      state: null,
      stateSlug: null,
      country: "France",
      countrySlug: "france",
      countryCode: "FR",
      continent: "Europe",
      latitude: 45.9237,
      longitude: 6.8694,
      elevationGainM: 10000,
      elevationLossM: 10000,
      highestPointM: 2537,
      courseDescription:
        "A circular route around Mont Blanc passing through France, Italy, and Switzerland. The course features dramatic alpine terrain, multiple high-altitude passes, and stunning views of the Mont Blanc massif.",
      typicalMonth: 8,
      yearEstablished: 2003,
      maxParticipants: 2500,
      qualificationRequired: true,
      qualificationDetails:
        "Runners must accumulate UTMB Index points from qualifying races. A lottery determines final entry from the qualified pool.",
      entryMethod: "LOTTERY",
      entryFeeUsd: 350,
      officialWebsite: "https://utmbmontblanc.com",
      organizerName: "UTMB Group",
      description:
        "The Ultra-Trail du Mont-Blanc (UTMB) is one of the most prestigious ultra trail races in the world. The 171km course circumnavigates Mont Blanc through three countries — France, Italy, and Switzerland — with approximately 10,000m of elevation gain.",
      history:
        "First held in 2003, UTMB was created to offer a single-stage race around the Tour du Mont Blanc hiking route. It has grown into the centerpiece of a festival week that includes multiple race distances.",
      notableFacts: [
        "Passes through three countries: France, Italy, Switzerland",
        "Part of the UTMB World Series",
        "Approximately 10,000m of total elevation gain",
      ],
      tags: ["prestigious", "international", "alpine", "bucket-list", "europe"],
      status: "ACTIVE",
      dataQualityScore: 90,
    },
  });

  await prisma.raceEdition.create({
    data: {
      raceId: utmb.id,
      year: 2026,
      startDate: new Date("2026-08-28T18:00:00Z"),
      endDate: new Date("2026-08-30T18:00:00Z"),
      lifecycleStatus: "UPCOMING",
      entryFee: "€350",
    },
  });

  await prisma.fAQ.createMany({
    data: [
      {
        raceId: utmb.id,
        question: "What qualifying points do I need for UTMB?",
        answer:
          "You need a minimum number of UTMB Index points from qualifying races completed within a specified period. The exact requirements are updated annually on the UTMB website.",
        category: "REGISTRATION",
        sortOrder: 1,
      },
      {
        raceId: utmb.id,
        question: "Do I need a passport to run UTMB?",
        answer:
          "Yes. The course passes through France, Italy, and Switzerland. EU citizens need a valid ID; non-EU runners need a passport. Check visa requirements for each country.",
        category: "LOGISTICS",
        sortOrder: 2,
      },
    ],
  });

  // Big's Backyard Ultra
  const bigs = await prisma.race.create({
    data: {
      slug: "bigs-backyard-ultra",
      name: "Big's Backyard Ultra",
      shortName: "Big's Backyard",
      distances: ["backyard"],
      distanceKm: null,
      raceType: "BACKYARD",
      terrain: ["trail", "road", "mixed"],
      city: "Bell Buckle",
      state: "Tennessee",
      stateSlug: "tennessee",
      country: "United States",
      countrySlug: "united-states",
      countryCode: "US",
      continent: "North America",
      latitude: 35.5890,
      longitude: -86.3622,
      elevationGainM: null,
      elevationLossM: null,
      courseDescription:
        "A 4.167-mile (6.706 km) loop that must be completed every hour, on the hour. The race continues until only one runner remains. The last person standing wins; the second-to-last gets a DNF.",
      typicalMonth: 10,
      yearEstablished: 2012,
      maxParticipants: 75,
      qualificationRequired: true,
      qualificationDetails:
        "Invitation only. Runners are selected based on performance at other backyard ultras and their standing in the backyard ultra community.",
      entryMethod: "INVITATION",
      officialWebsite: "https://backyardultra.com",
      organizerName: "Lazarus Lake",
      description:
        "Big's Backyard Ultra is the original and most prestigious backyard ultra format race, created by Lazarus Lake (Gary Cantrell). Runners must complete a 4.167-mile loop every hour. The last person standing wins — everyone else receives a DNF, even the second-to-last runner.",
      history:
        "Created in 2012 by Lazarus Lake (also known for creating the Barkley Marathons), the backyard ultra format has since spawned hundreds of satellite events worldwide.",
      notableFacts: [
        "Created the backyard ultra format now used worldwide",
        "Only the last person standing gets a finish — everyone else DNFs",
        "World record: 108 loops (450 miles) by Harvey Lewis in 2023",
      ],
      tags: ["backyard", "last-person-standing", "invitation-only", "iconic"],
      status: "ACTIVE",
      dataQualityScore: 85,
    },
  });

  await prisma.raceEdition.create({
    data: {
      raceId: bigs.id,
      year: 2026,
      startDate: new Date("2026-10-17T07:00:00Z"),
      lifecycleStatus: "UPCOMING",
    },
  });

  await prisma.fAQ.createMany({
    data: [
      {
        raceId: bigs.id,
        question: "How does a backyard ultra work?",
        answer:
          "Runners must complete a 4.167-mile loop at the start of every hour. If you fail to start the next loop on time, you're out. The race has no set distance — it continues until only one runner remains.",
        category: "GENERAL",
        sortOrder: 1,
      },
      {
        raceId: bigs.id,
        question: "How do I get invited to Big's Backyard?",
        answer:
          "Invitations are based on performance at other backyard ultras and Lazarus Lake's selection. There is no open registration. Competing well at satellite backyard ultras is the best path to an invitation.",
        category: "REGISTRATION",
        sortOrder: 2,
      },
      {
        raceId: bigs.id,
        question: "Why does everyone except the winner get a DNF?",
        answer:
          "In backyard ultra format, only the last person standing is the finisher. The second-to-last runner — called the 'assist' — and all others receive a DNF because the race distance is defined by the winner's total.",
        category: "GENERAL",
        sortOrder: 3,
      },
    ],
  });

  console.log("Seeding complete!");
  console.log(`Created 3 races, 3 editions, and 8 FAQs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
