
import React, { useState } from "react";
import { Container, Card, Button, Row, Col, Navbar, Form, Modal, Toast} from "react-bootstrap";
import DashboardNavbar from "./DashboardNavbar";

const plants = [
  {
    id: 1,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    price: "₹299",
    image: "https://m.media-amazon.com/images/I/81XWpVvk5AL.jpg",
    care: {
      sunlight: "Bright, indirect sunlight",
      watering: "Water deeply but infrequently (every 2-3 weeks)",
      soil: "Well-draining sandy soil",
      temperature: "18-30°C",
    },
  },
  {
    id: 2,
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    price: "₹399",
    image: "https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w",
    care: {
      sunlight: "Low to bright indirect light",
      watering: "Water every 2-4 weeks, allowing soil to dry out",
      soil: "Well-draining potting mix",
      temperature: "15-28°C",
    },
  },
  {
    id: 3,
    name: "Peace Lily",
    scientificName: "Spathiphyllum spp.",
    price: "₹499",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDodWGGab6Wdurua1rA_uvxJlT4hqSnl3VSg&s",
    care: {
      sunlight: "Low to medium indirect light",
      watering: "Water once a week, keeping soil moist but not soggy",
      soil: "Rich, well-draining soil",
      temperature: "18-27°C",
    },
  },
  {
    id: 4,
    name: "Money Plant",
    scientificName: "Epipremnum aureum",
    price: "₹249",
    image: "https://www.rollingnature.com/cdn/shop/products/PLEMPCECUEMJ-W-Main.jpg?v=1580906714",
    care: {
      sunlight: "Bright, indirect light or partial shade",
      watering: "Once a week",
      soil: "Moist, well-draining soil",
      temperature: "18-30°C"
    }
  },
  {
    id: 5,
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    price: "₹599",
    image: "https://greenkin.in/cdn/shop/products/rubber-burgundy-xlarge-cotton-grey-greenkin.jpg?v=1674928385&width=900",
    care: {
      sunlight: "Bright, indirect light",
      watering: "Once a week, allow soil to dry between waterings",
      soil: "Well-draining, rich soil",
      temperature: "16-27°C"
    }
  },
  {
    id: 6,
    name: "Areca Palm",
    scientificName: "Dypsis lutescens",
    price: "₹699",
    image: "https://www.houseplant.co.uk/cdn/shop/files/Areca_Palm_Dypsis_Lutescens_Chrysalidocarpus_Tropical_Indoor_Air_Purifying_Pet_Safe_Beginner_Friendly_Colourful_Houseplant.jpg?v=1736949282",
    care: {
      sunlight: "Bright, indirect sunlight",
      watering: "Every 2-3 days, keep soil slightly moist",
      soil: "Well-draining, peat-based soil",
      temperature: "18-30°C"
    }
  },
  {
    id: 7,
    name: "Jade Plant",
    scientificName: "Crassula ovata",
    price: "₹349",
    image: "https://m.media-amazon.com/images/I/51n0fa4c-iL.jpg",
    care: {
      sunlight: "Bright, indirect sunlight",
      watering: "Once every 2 weeks, allow soil to dry out",
      soil: "Well-draining, sandy soil",
      temperature: "15-25°C"
    }
  },
  {
    id: 8,
    name: "Fiddle Leaf Fig",
    scientificName: "Ficus lyrata",
    price: "₹899",
    image: "https://www.waldecks.com.au/cdn/shop/articles/sha256_3dcca1e61065ab655844a2869dfbbc6b6de498f8e37158fd806dbb8048d3483f.jpg?v=1648540508&width=2048",
    care: {
      sunlight: "Bright, indirect light",
      watering: "Once a week, keep soil slightly moist",
      soil: "Well-draining, rich soil",
      temperature: "18-27°C"
    }
  },
  {
    id: 9,
    name: "Pothos (Devil's Ivy)",
    scientificName: "Epipremnum aureum",
    price: "₹279",
    image: "https://m.media-amazon.com/images/I/41N9eAPY2EL.jpg",
    care: {
      sunlight: "Low to bright indirect light",
      watering: "Once a week, allow topsoil to dry between waterings",
      soil: "Well-draining potting mix",
      temperature: "18-30°C"
    }
  },

  {
    id: 10,
    name: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    price: "₹499",
    image: "https://nurturinggreen.in/cdn/shop/products/PKP01002_1_1080x.jpg?v=1647424430",
    care: {
      sunlight: "Low to bright indirect light",
      watering: "Once every 2-3 weeks, allow soil to dry out",
      soil: "Well-draining, sandy soil",
      temperature: "18-26°C"
    }
  },
  {
    id: 11,
    name: "Chinese Money Plant",
    scientificName: "Pilea peperomioides",
    price: "₹549",
    image: "https://bouqs.com/blog/wp-content/uploads/2023/07/shutterstock_2153053059-min-1080x720.jpg",
    care: {
      sunlight: "Bright, indirect light",
      watering: "Once a week, keep soil slightly moist",
      soil: "Well-draining, peat-based soil",
      temperature: "15-25°C"
    }
  },
  {
    id: 12,
    name: "Calathea",
    scientificName: "Calathea spp.",
    price: "₹699",
    image: "https://greenkin.in/cdn/shop/files/calathea-peacock-plant-white-ceramic-pot-medium-greenkin.jpg?v=1701677366&width=1946",
    care: {
      sunlight: "Low to medium indirect light",
      watering: "Keep soil consistently moist, water every few days",
      soil: "Well-draining, rich organic soil",
      temperature: "18-27°C"
    }
  },
  {
    id: 13,
    name: "African Violet",
    scientificName: "Saintpaulia ionantha",
    price: "₹600",
    image: "https://m.media-amazon.com/images/I/51eBvJY-duL._AC_UF1000,1000_QL80_.jpg",
    care: {
      sunlight: "Bright, indirect light",
      watering: "Keep soil consistently moist but not soggy",
      soil: "Well-draining, peat-based soil",
      temperature: "18-24°C"
    }
  },
  {
    id: 14,
    name: "Anthurium",
    scientificName: "Anthurium andraeanum",
    price: "₹499",
    image: "https://m.media-amazon.com/images/I/61QxEhESY7L.jpg",
    care: {
      sunlight: "Bright, indirect light",
      watering: "Water when the top inch of soil is dry",
      soil: "Well-draining, rich organic soil",
      temperature: "16-30°C"
    }
  },
  {
    id: 15,
    name: "Yucca",
    scientificName: "Yucca elephantipes",
    price: "₹399",
    image: "https://www.thespruce.com/thmb/z4UTbw615ISpdugEmeaIz0m-Kqs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spineless-yucca-plant-profile-5158420-hero-2514c67b596344bd86d0fbb5d29b8dcb.jpg",
    care: {
      sunlight: "Bright, indirect to direct sunlight",
      watering: "Allow soil to dry out completely between waterings",
      soil: "Well-draining sandy or cactus soil",
      temperature: "18-32°C"
    }
  },
  {
    id: 16,
    name: "Asparagus Fern",
    scientificName: "Asparagus setaceus",
    price: "₹600",
    image: "https://lalitenterprise.com/cdn/shop/files/Untitleddesign_53_8_4b5f7af7-493d-4dbb-a898-646bf734b30a.webp?v=1686818566",
    care: {
      sunlight: "Bright, indirect light or partial shade",
      watering: "Keep soil slightly moist, avoid overwatering",
      soil: "Rich, well-draining potting mix",
      temperature: "18-25°C"
    }
  },
  {
    id: 17,
    name: "Begonia",
    scientificName: "Begonia spp.",
    price: "₹400",
    image: "https://www.whiteflowerfarm.com/mas_assets/cache/image/9/1/d/4/37332.Jpg",
    care: {
      sunlight: "Bright, indirect light",
      watering: "Water when top inch of soil feels dry",
      soil: "Well-draining, slightly acidic soil",
      temperature: "15-25°C"
    }
  },
  {
    id: 18,
    name: "Bird of Paradise",
    scientificName: "Strelitzia reginae",
    price: "₹500",
    image: "https://m.media-amazon.com/images/I/61qzGi8gT+L.jpg",
    care: {
      sunlight: "Bright, indirect light to direct sunlight",
      watering: "Keep soil slightly moist, allow topsoil to dry out",
      soil: "Well-draining, nutrient-rich soil",
      temperature: "18-30°C"
    }
  },
  {
    id: 19,
    name: "Bird's Nest Fern",
    scientificName: "Asplenium nidus",
    price: "₹650",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3VPU3jFHfYGeIvDXUVEPWcGifbVR2JtopA&s",
    care: {
      sunlight: "Indirect light to partial shade",
      watering: "Keep soil consistently moist but not soggy",
      soil: "Well-draining, rich organic soil",
      temperature: "18-27°C"
    }
  },
  {
    id: 20,
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    price: "₹550",
    image: "https://nurserylive.com/cdn/shop/products/nurserylive-nephrolepis-exaltata-bosteniensis-boston-fern-plant-1-737114_512x683.jpg?v=1679750689",
    care: {
      sunlight: "Bright, indirect light",
      watering: "Keep soil consistently moist, mist leaves regularly",
      soil: "Rich, well-draining, peat-based soil",
      temperature: "16-24°C"
    }
  },
  {
    id: 21,
    name: "Cast Iron Plant",
    scientificName: "Aspidistra elatior",
    price: "₹500",
    image: "https://www.healthyhouseplants.com/wp-content/uploads/2024/08/Cast-Iron-Plant-Aspidistra-elatior.jpg",
    care: {
        sunlight: "Low to medium indirect light",
        watering: "Water sparingly; allow the top soil to dry out between watering",
        soil: "Well-draining, loamy soil",
        temperature: "7–29°C",
    }
},

{
  id: 22,
  name: "Chinese Evergreen",
  scientificName: "Aglaonema spp.",
  price: "₹600",
  image: "https://www.goinggreens.in/cdn/shop/files/ChineseEvergreen.jpg?v=1719403530",
  care: {
      sunlight: "Low to medium indirect light",
      watering: "Water when the topsoil dries out",
      soil: "Well-draining, peat-based or loamy soil",
      temperature: "18–27°C"
  }
},
{
  id: 23,
  name: "Christmas Cactus",
  scientificName: "Schlumbergera spp.",
  price: "₹450",
  image: "https://budsnblush.com/cdn/shop/files/red_christmas_cactus_budsnblush.jpg?v=1736672548",
  care: {
      sunlight: "Bright, indirect light",
      watering: "Water when the top inch of soil is dry",
      soil: "Well-draining, slightly acidic potting mix",
      temperature: "15–24°C"
  }
},

{
  id: 24,
  name: "Chrysanthemum",
  scientificName: "Chrysanthemum spp.",
  price: "₹690",
  image: "https://m.media-amazon.com/images/I/61XsEmfuJhL._AC_UF1000,1000_QL80_.jpg",
  care: {
      sunlight: "Bright, direct or indirect light",
      watering: "Water frequently to keep the soil moist",
      soil: "Well-draining, nutrient-rich soil",
      temperature: "10–24°C"
  }
},
{
  id: 25,
  name: "Ctenanthe",
  scientificName: "Ctenanthe burle-marxii",
  price: "₹620",
  image: "https://cdn.shopify.com/s/files/1/1637/3125/files/FoliaCollective-CtenantheBurle-Marxii-4in-detail2-web_1024x1024.jpg?v=1608602766",
  care: {
      sunlight: "Indirect, filtered light",
      watering: "Keep soil consistently moist, but not soggy",
      soil: "Well-draining, peat-based mix",
      temperature: "18–26°C"
  }
},

{
  id: 26,
  name: "Daffodils",
  scientificName: "Narcissus spp.",
  price: "₹399",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyp36zQt8kWsUdCj1j3RJjiG6PcsrScy6OjA&s",
  care: {
      sunlight: "Bright, direct sunlight",
      watering: "Water regularly but allow soil to dry between waterings",
      soil: "Well-draining, sandy or loamy soil",
      temperature: "10–18°C"
  }
},
{
  "id": 27,
  "name": "Dracaena",
  "scientificName": "Dracaena spp.",
  "price": "₹549",
  "image": "https://www.bhg.com/thmb/6C8s4WEOURnfiX2szudRgVYtPyI=/1500x0/filters:no_upscale():strip_icc()/dracaena-houseplant-01-hero--68f36341781e404eb08d61587ac9bf3d.jpg",
  "care": {
      "sunlight": "Low to medium, indirect light",
      "watering": "Allow soil to dry between waterings",
      "soil": "Well-draining, peat-based soil",
      "temperature": "18–27°C"
  }
},

{
  "id": 28,
  "name": "Dumb Cane",
  "scientificName": "Dieffenbachia spp.",
  "price": "₹500",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSSnlZWOEjiyZmnETUgO0gvOoaF3M8iLh_tw&s",
  "care": {
      "sunlight": "Indirect light, can tolerate low light",
      "watering": "Water when the top inch of soil is dry",
      "soil": "Well-draining potting mix",
      "temperature": "18–26°C"
  }
},
{
  "id": 29,
  "name": "Elephant Ear",
  "scientificName": "Colocasia spp.",
  "price": "₹490",
  "image": "https://m.media-amazon.com/images/I/612F1PzPVrL._AC_UF1000,1000_QL80_.jpg",
  "care": {
      "sunlight": "Bright, indirect light",
      "watering": "Keep soil consistently moist but not soggy",
      "soil": "Rich, well-draining soil",
      "temperature": "20–30°C"
  }
},
{
  "id": 30,
  "name": "English Ivy",
  "scientificName": "Hedera helix",
  "price": "₹600",
  "image": "https://plantorbit.com/cdn/shop/files/English_Ivy.webp?v=1731067491",
  "care": {
      "sunlight": "Prefers indirect light; can tolerate low light",
      "watering": "Keep soil slightly moist but avoid overwatering",
      "soil": "Well-draining potting mix",
      "temperature": "15–25°C",
      "humidity": "Prefers high humidity levels"
  }
},
{
  "id": 31,
  "name": "Hyacinth",
  "scientificName": "Hyacinthus orientalis",
  "price": "₹640",
  "image": "https://m.media-amazon.com/images/I/71-VGrJSYxL._AC_UF1000,1000_QL80_.jpg",
  "care": {
      "sunlight": "Full sun to partial shade",
      "watering": "Water moderately; keep soil evenly moist but not soggy",
      "soil": "Well-drained, fertile soil",
      "temperature": "15–20°C",
      "specialCare": "Remove faded flowers to encourage healthy growth"
  }
},
{
  "id": 32,
  "name": "Iron Cross Begonia",
  "scientificName": "Begonia masoniana",
  "price": "₹390",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDXyhbEtBD71f9fnWNiBIp2mOAU81HozBaQ&s",
  "care": {
      "sunlight": "Thrives in bright, indirect light",
      "watering": "Keep soil consistently moist but not soggy",
      "soil": "Well-draining, peat-based potting mix",
      "temperature": "18–24°C",
      "humidity": "Requires high humidity; mist occasionally",
      "specialCare": "Avoid direct sunlight to prevent leaf burn"
  }
},
{
  "id": 33,
  "name": "Kalanchoe",
  "scientificName": "Kalanchoe blossfeldiana",
  "price": "₹540",
  "image": "https://greenparadiselive.com/cdn/shop/files/ZZ_PLANT_8_1200x1200.png?v=1718262988",
  "care": {
      "sunlight": "Prefers bright light, can tolerate direct sunlight",
      "watering": "Allow soil to dry between waterings; water sparingly",
      "soil": "Well-draining cactus or succulent mix",
      "temperature": "15–25°C",
      "humidity": "Prefers low to moderate humidity",
      "specialCare": "Deadhead flowers to encourage new blooms"
  }
},
{
  "id": 32,
  "name": "Iron Cross Begonia",
  "scientificName": "Begonia masoniana",
  "price": "₹390",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDXyhbEtBD71f9fnWNiBIp2mOAU81HozBaQ&s",
  "care": {
      "sunlight": "Thrives in bright, indirect light",
      "watering": "Keep soil consistently moist but not soggy",
      "soil": "Well-draining, peat-based potting mix",
      "temperature": "18–24°C",
      "humidity": "Requires high humidity; mist occasionally",
      "specialCare": "Avoid direct sunlight to prevent leaf burn"
  }
},
{
  "id": 33,
  "name": "Kalanchoe",
  "scientificName": "Kalanchoe blossfeldiana",
  "price": "₹540",
  "image": "https://greenparadiselive.com/cdn/shop/files/ZZ_PLANT_8_1200x1200.png?v=1718262988",
  "care": {
      "sunlight": "Prefers bright light, can tolerate direct sunlight",
      "watering": "Allow soil to dry between waterings; water sparingly",
      "soil": "Well-draining cactus or succulent mix",
      "temperature": "15–25°C",
      "humidity": "Prefers low to moderate humidity",
      "specialCare": "Deadhead flowers to encourage new blooms"
  }
},
{
  "id": 36,
  "name": "Monstera Deliciosa",
  "scientificName": "Monstera deliciosa",
  "price": "₹690",
  "image": "https://greenboog.com/wp-content/uploads/2023/11/Monstera-deliciosa.webp",
  "care": {
      "sunlight": "Thrives in bright, indirect light",
      "watering": "Water when the topsoil feels dry",
      "soil": "Well-draining, peat-based soil mix",
      "temperature": "18–27°C",
      "humidity": "Prefers high humidity",
      "specialCare": "Wipe leaves regularly to remove dust and promote healthy growth"
  }
},
{
  "id": 37,
  "name": "Orchid",
  "scientificName": "Orchidaceae",
  "price": "₹450",
  "image": "https://masonhome.in/cdn/shop/files/IMG_5069.jpg?v=1717071576&width=1500",
  "care": {
      "sunlight": "Prefers bright, indirect light",
      "watering": "Water once a week and ensure proper drainage",
      "soil": "Well-aerated orchid mix (bark, sphagnum moss, perlite)",
      "temperature": "16–24°C",
      "humidity": "Thrives in 50–70% humidity",
      "specialCare": "Avoid overwatering; mist occasionally to maintain humidity"
  }
},
{
  "id": 38,
  "name": "Parlor Palm",
  "scientificName": "Chamaedorea elegans",
  "price": "₹550",
  "image": "https://www.rollingnature.com/cdn/shop/products/PLPPMCEAPGL-W-Part2.jpg?v=1669452844&width=1946",
  "care": {
      "sunlight": "Grows best in low to medium light",
      "watering": "Keep soil slightly moist but not soggy",
      "soil": "Well-draining, peat-based soil mix",
      "temperature": "18–27°C",
      "humidity": "Prefers moderate to high humidity",
      "specialCare": "Wipe leaves occasionally to prevent dust buildup and maintain health"
  }
},
{
  "id": 39,
  "name": "Poinsettia",
  "scientificName": "Euphorbia pulcherrima",
  "price": "₹660",
  "image": "https://greenbook.co.in/wp-content/uploads/2023/09/9-2.png",
  "care": {
      "sunlight": "Needs bright, indirect light",
      "watering": "Water when the top inch of soil is dry",
      "soil": "Well-draining, slightly acidic soil",
      "temperature": "16–24°C",
      "humidity": "Prefers moderate humidity",
      "specialCare": "Avoid cold drafts and sudden temperature changes; keep away from direct heat sources"
  }
},
{
  "id": 40,
  "name": "Polka Dot Plant",
  "scientificName": "Hypoestes phyllostachya",
  "price": "₹580",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpYx2ew4DSiYO-n13yAEvCUb1OtBHn1QlBg&s",
  "care": {
      "sunlight": "Thrives in bright, indirect light",
      "watering": "Keep soil evenly moist but not waterlogged",
      "soil": "Well-draining, peat-based soil",
      "temperature": "18–26°C",
      "humidity": "Prefers high humidity",
      "specialCare": "Pinch off leggy stems to maintain a bushy shape"
  }
},
{
  "id": 41,
  "name": "Ponytail Palm",
  "scientificName": "Beaucarnea recurvata",
  "price": "₹720",
  "image": "https://costafarms.com/cdn/shop/files/DSC03549-Edit--cream.jpg?v=1724867777",
  "care": {
      "sunlight": "Prefers bright, indirect light",
      "watering": "Water sparingly, allowing soil to dry out completely between waterings",
      "soil": "Well-draining, sandy soil",
      "temperature": "18–30°C",
      "humidity": "Prefers low to moderate humidity",
      "specialCare": "Avoid overwatering as it is drought-tolerant; suitable for indoor and outdoor settings"
  }
},
{
  "id": 42,
  "name": "Rattlesnake Plant",
  "scientificName": "Goeppertia insignis",
  "price": "₹590",
  "image": "https://www.thesill.com/cdn/shop/files/the-sill_calathea-rattlesnake_variant_medium_hyde_mint_1.jpg?v=1739220464&width=416",
  "care": {
      "sunlight": "Thrives in indirect light and high humidity",
      "watering": "Keep soil consistently moist but avoid waterlogging",
      "soil": "Well-draining, peat-based soil",
      "temperature": "18–27°C",
      "humidity": "Requires high humidity",
      "specialCare": "Mist leaves regularly and keep away from direct sunlight to prevent leaf curling"
  }
},
{
  "id": 43,
  "name": "Sago Palm",
  "scientificName": "Cycas revoluta",
  "price": "₹770",
  "image": "https://www.thespruce.com/thmb/8PjPlTWcWzMW5lsXioICj7NgxqM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grow-sago-palms-1902770-06-b83d3d47262a499c889900a6c83625f7.jpg",
  "care": {
      "sunlight": "Needs bright, indirect to direct light",
      "watering": "Water sparingly; allow soil to dry out between waterings",
      "soil": "Well-draining sandy or loamy soil",
      "temperature": "15–25°C",
      "humidity": "Prefers moderate humidity",
      "specialCare": "Toxic to pets and humans if ingested; avoid overwatering to prevent root rot"
  }
},
{
  "id": 44,
  "name": "Schefflera",
  "scientificName": "Schefflera arboricola",
  "price": "₹640",
  "image": "https://nurserylive.com/cdn/shop/products/nurserylive-g-plant-schefflera-variegated-plant-in-5-inch-13-cm-grower-round-plastic-black-pot-428187.jpg?v=1679751107",
  "care": {
      "sunlight": "Thrives in bright, indirect light but can tolerate low light",
      "watering": "Water when the topsoil is dry; avoid overwatering",
      "soil": "Well-draining potting mix",
      "temperature": "18–27°C",
      "humidity": "Prefers moderate to high humidity",
      "specialCare": "Prune occasionally to maintain shape; keep away from cold drafts"
  }
},
{
  "id": 45,
  "name": "Tradescantia",
  "scientificName": "Tradescantia zebrina",
  "price": "₹500",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqWeMmJjaMSsFtyv_ZsdwPEHV0QU_FcY3-Q&s",
  "care": {
      "sunlight": "Prefers bright, indirect light; can tolerate partial shade",
      "watering": "Keep soil slightly moist but not soggy",
      "soil": "Well-draining potting mix",
      "temperature": "15–25°C",
      "humidity": "Thrives in moderate to high humidity",
      "specialCare": "Trim regularly to maintain shape and promote growth"
  }
},
{
  "id": 46,
  "name": "Tulip",
  "scientificName": "Tulipa spp.",
  "price": "₹600",
  "image": "https://m.media-amazon.com/images/I/71sQOlkixLL.jpg",
  "care": {
      "sunlight": "Needs full sun (at least 6 hours per day)",
      "watering": "Water regularly but allow soil to dry slightly between waterings",
      "soil": "Well-drained, sandy or loamy soil",
      "temperature": "10–18°C",
      "humidity": "Moderate humidity preferred",
      "specialCare": "Plant bulbs in autumn for spring blooms; avoid overwatering to prevent rot"
  }
},
{
  "id": 47,
  "name": "Venus Flytrap",
  "scientificName": "Dionaea muscipula",
  "price": "₹490",
  "image": "https://m.media-amazon.com/images/I/51SVbh1j8JL._AC_UF1000,1000_QL80_.jpg",
  "care": {
      "sunlight": "Requires bright, direct to indirect sunlight (4–6 hours daily)",
      "watering": "Use distilled or rainwater only; avoid tap water",
      "soil": "Nutrient-poor, well-draining soil (peat moss and sand mix)",
      "temperature": "20–30°C",
      "humidity": "Prefers high humidity levels",
      "specialCare": "Do not fertilize; avoid triggering traps excessively as it weakens the plant"
  }
},
];



const PlantShop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlants, setFilteredPlants] = useState(plants);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSearch = () => {
    const filtered = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  const handleBuyNow = (plant) => {
    setSelectedPlant(plant);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPlant(null);
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      {/* Navbar */}
      <DashboardNavbar /> 

      {/* Main Content */}
      <Container className="text-center mt-5">
        <h2 className="mb-4">🌱 Shop Indoor Plants 🌿</h2>

        <div className="d-flex justify-content-center mb-4">
          <Form.Control
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px", marginRight: "10px" }}
          />
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </div>

        <Row className="g-4">
          {filteredPlants.map((plant) => (
            <Col key={plant.id} md={3} sm={6}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={plant.image}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
                <Card.Body>
  <Card.Title>{plant.name}</Card.Title>
  <Card.Subtitle className="text-muted"><i>{plant.scientificName}</i></Card.Subtitle> {/* Added scientific name */}
  <br></br>
  <Card.Text><strong>{plant.price}</strong></Card.Text>

  {/* Care Details */}
  <details>
    <summary style={{ cursor: "pointer", color: "green", fontWeight: "bold" }}>Care Instructions</summary>
    <ul style={{ textAlign: "left", paddingLeft: "15px" }}>
      <li><strong>Sunlight:</strong> {plant.care.sunlight}</li>
      <li><strong>Watering:</strong> {plant.care.watering}</li>
      <li><strong>Soil:</strong> {plant.care.soil}</li>
      <li><strong>Temperature:</strong> {plant.care.temperature}</li>
    </ul>
  </details>

  <br></br>

  <Button variant="success" onClick={() => handleBuyNow(plant)}>Buy Now</Button>
</Card.Body>

              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal Form */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Purchase {selectedPlant?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your address" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" min="1" defaultValue="1" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="success" onClick={handleConfirmPurchase}>Confirm Purchase</Button>
          </Modal.Footer>
        </Modal>

        {/* Success Toast Notification */}
        <Toast
          show={showSuccessMessage}
          onClose={() => setShowSuccessMessage(false)}
          delay={3000}
          autohide
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Toast.Body>✅ Purchase Successful!</Toast.Body>
        </Toast>
      </Container>
    </>
  );
};

export default PlantShop;