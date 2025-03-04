interface SeedUser {
  name: string
  lastName: string
  email: string
  password: string
  phone: number
  cellPhone: number
}

interface SeedProperty {
  title: string
  description: string
  address: string
  images: string[]
  price: number
  slug: string
  tags: string[]
  area: number
  rooms: number
  beds: number
  baths: number
  status: boolean
}

type ValidSizes = 'Destacado' | 'Super Destacado' | 'Oferta' 

interface SeedData {
    properties: SeedProperty[
        
    ]
    users: SeedUser[]
}


export const initialData: SeedData = {
    properties: [
        {
            title: "Modern Family Home",
            description: "Beautiful modern home with spacious garden and pool.",
            address: "123 Elm Street, Springfield",
            images: ["house1.jpg", "garden1.jpg"],
            price: 250000,
            slug: "modern-family-home",
            tags: ["family", "modern", "pool"],
            area: 180,
            rooms: 5,
            beds: 3,
            baths: 2,
            status: true
          },
          {
            title: "Cozy Downtown Apartment",
            description: "Perfect apartment in the heart of the city.",
            address: "456 Main Avenue, Metropolis",
            images: ["apartment1.jpg"],
            price: 150000,
            slug: "cozy-downtown-apartment",
            tags: ["city", "apartment", "cozy"],
            area: 80,
            rooms: 3,
            beds: 2,
            baths: 1,
            status: true
          },
          {
            title: "Luxury Villa",
            description: "Stunning villa with sea views and private beach access.",
            address: "789 Ocean Drive, Miami",
            images: ["villa1.jpg", "beach1.jpg"],
            price: 950000,
            slug: "luxury-villa",
            tags: ["luxury", "beachfront", "sea-view"],
            area: 400,
            rooms: 8,
            beds: 5,
            baths: 4,
            status: true
          },
          {
            title: "Country House Retreat",
            description: "Peaceful country home with large farmland.",
            address: "321 Farm Lane, Countryside",
            images: ["countryhouse1.jpg"],
            price: 300000,
            slug: "country-house-retreat",
            tags: ["country", "retreat", "farm"],
            area: 250,
            rooms: 6,
            beds: 4,
            baths: 2,
            status: true
          },
          {
            title: "Small Studio Apartment",
            description: "Compact studio perfect for students.",
            address: "789 College Road, Boston",
            images: ["studio1.jpg"],
            price: 85000,
            slug: "small-studio-apartment",
            tags: ["studio", "student", "affordable"],
            area: 35,
            rooms: 1,
            beds: 1,
            baths: 1,
            status: true
          },
          {
            title: "Mountain Cabin",
            description: "Rustic cabin with incredible mountain views.",
            address: "654 Pine Road, Aspen",
            images: ["cabin1.jpg"],
            price: 200000,
            slug: "mountain-cabin",
            tags: ["mountain", "cabin", "nature"],
            area: 120,
            rooms: 4,
            beds: 2,
            baths: 1,
            status: true
          },
          {
            title: "Penthouse Suite",
            description: "Top-floor penthouse with skyline views.",
            address: "101 Sky Tower, New York",
            images: ["penthouse1.jpg"],
            price: 1200000,
            slug: "penthouse-suite",
            tags: ["luxury", "penthouse", "city-view"],
            area: 300,
            rooms: 5,
            beds: 3,
            baths: 3,
            status: true
          },
          {
            title: "Beach Bungalow",
            description: "Relaxed bungalow just steps from the sand.",
            address: "202 Shoreline Blvd, Santa Monica",
            images: ["bungalow1.jpg"],
            price: 400000,
            slug: "beach-bungalow",
            tags: ["beach", "bungalow", "chill"],
            area: 90,
            rooms: 3,
            beds: 2,
            baths: 1,
            status: true
          },
          {
            title: "Industrial Loft",
            description: "Stylish loft with open spaces and modern design.",
            address: "404 Factory Street, Detroit",
            images: ["loft1.jpg"],
            price: 220000,
            slug: "industrial-loft",
            tags: ["loft", "industrial", "modern"],
            area: 140,
            rooms: 3,
            beds: 2,
            baths: 1,
            status: true
          },
          {
            title: "Suburban Townhouse",
            description: "Comfortable townhouse in a quiet neighborhood.",
            address: "505 Maple Drive, Denver",
            images: ["townhouse1.jpg"],
            price: 275000,
            slug: "suburban-townhouse",
            tags: ["townhouse", "family", "suburban"],
            area: 160,
            rooms: 4,
            beds: 3,
            baths: 2,
            status: true
          }
    ],
    users: [
        {
            name: "Lucas",
            lastName: "Rojas",
            email: "lucas.rojas@example.com",
            password: "password123",
            phone: 1134567890,
            cellPhone: 1165432100
          },
          {
            name: "Caroline",
            lastName: "Forbes",
            email: "caroline.forbes@example.com",
            password: "mysticfalls",
            phone: 1147894561,
            cellPhone: 1187654321
          },
          {
            name: "Damon",
            lastName: "Salvatore",
            email: "damon.salvatore@example.com",
            password: "bloodlover",
            phone: 1123459876,
            cellPhone: 1199988776
          }
    ]
}