export interface TouristAttraction {
  id: string
  name: string
  nameTamil: string
  description: string
  descriptionTamil: string
  city: string
  cityTamil: string
  category: string
  categoryTamil: string
  image: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface TamilCity {
  id: string
  name: string
  nameTamil: string
  description: string
  descriptionTamil: string
  attractions: TouristAttraction[]
}

export const TAMIL_CITIES: TamilCity[] = [
  {
    id: "chennai",
    name: "Chennai",
    nameTamil: "சென்னை",
    description: "The capital city of Tamil Nadu, known for its rich cultural heritage and beautiful beaches.",
    descriptionTamil: "தமிழ்நாட்டின் தலைநகரம், அதன் வளமான கலாச்சார பாரம்பரியம் மற்றும் அழகான கடற்கரைகளுக்கு பெயர் பெற்றது.",
    attractions: [
      {
        id: "marina-beach",
        name: "Marina Beach",
        nameTamil: "மெரினா கடற்கரை",
        description: "One of the longest urban beaches in the world, perfect for evening walks and local street food.",
        descriptionTamil: "உலகின் மிக நீளமான நகர்ப்புற கடற்கரைகளில் ஒன்று, மாலை நடைப்பயணம் மற்றும் உள்ளூர் தெரு உணவுக்கு ஏற்றது.",
        city: "Chennai",
        cityTamil: "சென்னை",
        category: "Beach",
        categoryTamil: "கடற்கரை",
        image: "/marina-beach-chennai-sunset.jpg",
      },
      {
        id: "kapaleeshwarar-temple",
        name: "Kapaleeshwarar Temple",
        nameTamil: "கபாலீஸ்வரர் கோயில்",
        description: "Ancient Shiva temple with stunning Dravidian architecture and colorful gopurams.",
        descriptionTamil: "அற்புதமான திராவிட கட்டிடக்கலை மற்றும் வண்ணமயமான கோபுரங்களுடன் கூடிய பழங்கால சிவன் கோயில்.",
        city: "Chennai",
        cityTamil: "சென்னை",
        category: "Temple",
        categoryTamil: "கோயில்",
        image: "/kapaleeshwarar-temple-chennai-gopuram.jpg",
      },
      {
        id: "fort-st-george",
        name: "Fort St. George",
        nameTamil: "செயின்ட் ஜார்ஜ் கோட்டை",
        description: "Historic British fort and museum showcasing colonial history and artifacts.",
        descriptionTamil: "காலனித்துவ வரலாறு மற்றும் கலைப்பொருட்களை காட்சிப்படுத்தும் வரலாற்று பிரிட்டிஷ் கோட்டை மற்றும் அருங்காட்சியகம்.",
        city: "Chennai",
        cityTamil: "சென்னை",
        category: "Historical",
        categoryTamil: "வரலாற்று",
        image: "/fort-st-george-chennai-historical-building.jpg",
      },
    ],
  },
  {
    id: "madurai",
    name: "Madurai",
    nameTamil: "மதுரை",
    description: "The temple city known for the magnificent Meenakshi Amman Temple and rich cultural traditions.",
    descriptionTamil: "அற்புதமான மீனாக்ஷி அம்மன் கோயில் மற்றும் வளமான கலாச்சார பாரம்பரியங்களுக்கு பெயர் பெற்ற கோயில் நகரம்.",
    attractions: [
      {
        id: "meenakshi-temple",
        name: "Meenakshi Amman Temple",
        nameTamil: "மீனாக்ஷி அம்மன் கோயில்",
        description:
          "Magnificent temple complex with towering gopurams and intricate sculptures dedicated to Goddess Meenakshi.",
        descriptionTamil: "மீனாக்ஷி தேவிக்கு அர்ப்பணிக்கப்பட்ட உயர்ந்த கோபுரங்கள் மற்றும் சிக்கலான சிற்பங்களுடன் கூடிய அற்புதமான கோயில் வளாகம்.",
        city: "Madurai",
        cityTamil: "மதுரை",
        category: "Temple",
        categoryTamil: "கோயில்",
        image: "/meenakshi-temple-madurai-colorful-gopuram.jpg",
      },
      {
        id: "thirumalai-nayakkar-palace",
        name: "Thirumalai Nayakkar Palace",
        nameTamil: "திருமலை நாயக்கர் மஹால்",
        description: "17th-century palace showcasing Indo-Saracenic architecture with grand pillars and courtyards.",
        descriptionTamil: "பிரமாண்டமான தூண்கள் மற்றும் முற்றங்களுடன் இந்தோ-சரசெனிக் கட்டிடக்கலையை காட்சிப்படுத்தும் 17ஆம் நூற்றாண்டு அரண்மனை.",
        city: "Madurai",
        cityTamil: "மதுரை",
        category: "Palace",
        categoryTamil: "அரண்மனை",
        image: "/thirumalai-nayakkar-palace-madurai-architecture.jpg",
      },
    ],
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    nameTamil: "கோயம்புத்தூர்",
    description: "Industrial city surrounded by the Western Ghats, known for textiles and hill stations nearby.",
    descriptionTamil:
      "மேற்கு தொடர்ச்சி மலைகளால் சூழப்பட்ட தொழில்துறை நகரம், ஜவுளி மற்றும் அருகிலுள்ள மலை நிலையங்களுக்கு பெயர் பெற்றது.",
    attractions: [
      {
        id: "marudamalai-temple",
        name: "Marudamalai Temple",
        nameTamil: "மருதமலை கோயில்",
        description: "Hilltop temple dedicated to Lord Murugan with scenic views and peaceful atmosphere.",
        descriptionTamil: "இயற்கை காட்சிகள் மற்றும் அமைதியான சூழலுடன் முருகன் பெருமானுக்கு அர்ப்பணிக்கப்பட்ட மலை உச்சி கோயில்.",
        city: "Coimbatore",
        cityTamil: "கோயம்புத்தூர்",
        category: "Temple",
        categoryTamil: "கோயில்",
        image: "/marudamalai-temple-coimbatore-hilltop.jpg",
      },
      {
        id: "isha-yoga-center",
        name: "Isha Yoga Center",
        nameTamil: "ஈஷா யோகா மையம்",
        description:
          "Spiritual center at the foothills of Velliangiri Mountains with meditation programs and Adiyogi statue.",
        descriptionTamil: "தியான திட்டங்கள் மற்றும் ஆதியோகி சிலையுடன் வெள்ளியங்கிரி மலைகளின் அடிவாரத்தில் உள்ள ஆன்மீக மையம்.",
        city: "Coimbatore",
        cityTamil: "கோயம்புத்தூர்",
        category: "Spiritual",
        categoryTamil: "ஆன்மீகம்",
        image: "/isha-yoga-center-adiyogi-statue-coimbatore.jpg",
      },
    ],
  },
  {
    id: "trichy",
    name: "Tiruchirappalli",
    nameTamil: "திருச்சிராப்பள்ளி",
    description: "Historic city with ancient temples and the famous Rock Fort temple complex.",
    descriptionTamil: "பழங்கால கோயில்கள் மற்றும் புகழ்பெற்ற ராக் கோட்டை கோயில் வளாகத்துடன் கூடிய வரலாற்று நகரம்.",
    attractions: [
      {
        id: "rock-fort-temple",
        name: "Rock Fort Temple",
        nameTamil: "ராக் கோட்டை கோயில்",
        description: "Ancient temple complex built on a massive rock formation with panoramic city views.",
        descriptionTamil: "நகரின் பரந்த காட்சிகளுடன் பிரமாண்டமான பாறை அமைப்பின் மீது கட்டப்பட்ட பழங்கால கோயில் வளாகம்.",
        city: "Tiruchirappalli",
        cityTamil: "திருச்சிராப்பள்ளி",
        category: "Temple",
        categoryTamil: "கோயில்",
        image: "/rock-fort-temple-trichy-ancient-rock-formation.jpg",
      },
      {
        id: "srirangam-temple",
        name: "Srirangam Temple",
        nameTamil: "ஸ்ரீரங்கம் கோயில்",
        description: "Largest functioning Hindu temple complex in the world, dedicated to Lord Ranganatha.",
        descriptionTamil: "ரங்கநாத பெருமானுக்கு அர்ப்பணிக்கப்பட்ட உலகின் மிகப்பெரிய செயல்படும் இந்து கோயில் வளாகம்.",
        city: "Tiruchirappalli",
        cityTamil: "திருச்சிராப்பள்ளி",
        category: "Temple",
        categoryTamil: "கோயில்",
        image: "/srirangam-temple-complex-trichy-gopuram.jpg",
      },
    ],
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    nameTamil: "கன்னியாகுமரி",
    description: "Southernmost tip of India where three seas meet, famous for sunrise and sunset views.",
    descriptionTamil: "மூன்று கடல்கள் சந்திக்கும் இந்தியாவின் தென்கோடி, சூரிய உதயம் மற்றும் சூரிய அஸ்தமனக் காட்சிகளுக்கு பிரபலமானது.",
    attractions: [
      {
        id: "vivekananda-rock",
        name: "Vivekananda Rock Memorial",
        nameTamil: "விவேகானந்த பாறை நினைவிடம்",
        description: "Memorial built on a rock where Swami Vivekananda meditated, accessible by ferry.",
        descriptionTamil: "சுவாமி விவேகானந்தர் தியானம் செய்த பாறையின் மீது கட்டப்பட்ட நினைவிடம், படகு மூலம் செல்லலாம்.",
        city: "Kanyakumari",
        cityTamil: "கன்னியாகுமரி",
        category: "Memorial",
        categoryTamil: "நினைவிடம்",
        image: "/vivekananda-rock-memorial-kanyakumari-ocean.jpg",
      },
      {
        id: "thiruvalluvar-statue",
        name: "Thiruvalluvar Statue",
        nameTamil: "திருவள்ளுவர் சிலை",
        description: "133-feet tall statue of the great Tamil poet and philosopher Thiruvalluvar.",
        descriptionTamil: "மகான் தமிழ் கவிஞர் மற்றும் தத்துவஞானி திருவள்ளுவரின் 133 அடி உயர சிலை.",
        city: "Kanyakumari",
        cityTamil: "கன்னியாகுமரி",
        category: "Monument",
        categoryTamil: "நினைவுச்சின்னம்",
        image: "/thiruvalluvar-statue-kanyakumari-tall-monument.jpg",
      },
    ],
  },
]

export const ATTRACTION_CATEGORIES = [
  { id: "all", name: "All Attractions", nameTamil: "அனைத்து இடங்கள்" },
  { id: "temple", name: "Temples", nameTamil: "கோயில்கள்" },
  { id: "beach", name: "Beaches", nameTamil: "கடற்கரைகள்" },
  { id: "historical", name: "Historical", nameTamil: "வரலாற்று" },
  { id: "palace", name: "Palaces", nameTamil: "அரண்மனைகள்" },
  { id: "spiritual", name: "Spiritual", nameTamil: "ஆன்மீகம்" },
  { id: "memorial", name: "Memorials", nameTamil: "நினைவிடங்கள்" },
  { id: "monument", name: "Monuments", nameTamil: "நினைவுச்சின்னங்கள்" },
]
