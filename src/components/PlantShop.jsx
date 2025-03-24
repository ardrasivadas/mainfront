
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Navbar, Form, Modal, Toast} from "react-bootstrap";
import DashboardNavbar from "./DashboardNavbar";
import { useCart } from "./CartContext";

const plants = [
  {
    id: 1,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    price: "299",
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
    price: "399",
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
    price: "499",
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
    price: "249",
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
    price: "599",
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
    price: "699",
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
    price: "349",
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
    price: "899",
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
    price: "279",
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
    price: "499",
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
    price: "549",
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
    price: "699",
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
    price: "600",
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
    price: "499",
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
    price: "399",
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
    price: "600",
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
    price: "400",
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
    price: "500",
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
    price: "650",
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
    price: "550",
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
    price: "500",
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
  price: "600",
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
  price: "450",
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
  price: "690",
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
  price: "620",
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
  price: "399",
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
  "price": "549",
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
  "price": "500",
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
  "price": "490",
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
  "price": "600",
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
  "price": "640",
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
  "price": "390",
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
  "price": "540",
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
  "id": 34,
  "name": "Prayer Plant",
  "scientificName": "Maranta leuconeura",
  "price": "390",
  "image": "data:image/jpeg;base64,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",
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
  "id": 35,
  "name": "Lily of the valley",
  "scientificName": "Convallaria majalis",
  "price": "540",
  "image": "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTj1iXe9bL8ZiZeywWfB5oVVs1FuBcrgo_TdC5CRzK9o0aMxSq8ktlAd4_VGHgLmegpQODMylQQeLc30aEKItcQXzqvHYwK4w",
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
  "price": "690",
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
  "price": "450",
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
  "price": "550",
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
  "price": "660",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS048nTVttR-X4ptvB1eWXIwmnd4qAEwU5PGw&s",
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
  "price": "580",
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
  "price": "720",
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
  "price": "590",
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
  "price": "770",
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
  "price": "640",
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
  "price": "500",
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
  "price": "600",
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
  "price": "490",
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
  const { addToCart } = useCart();
  // const [quantity, setQuantity] = useState(1);
  const [filteredPlants, setFilteredPlants] = useState(plants);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const [showCartMessage, setShowCartMessage] = useState(false);
const [wishlistMessage, setWishlistMessage] = useState("");
const [wishlist, setWishlist] = useState([]); 

// Function to add plant to wishlist
const addToWishlist = (plant) => {
  let updatedWishlist = [];

  // Check if the plant is already in the wishlist
  if (wishlist.some((item) => item.id === plant.id)) {
    setWishlistMessage(`⚠️ ${plant.name} is already in your Wishlist!`);
    return;
  } else {
    updatedWishlist = [...wishlist, plant];
    setWishlist(updatedWishlist);
    setWishlistMessage(`✅ ${plant.name} added to Wishlist!`);
  }

  // Save the updated wishlist to localStorage
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

  setShowSuccessMessage(true);
  setTimeout(() => setShowSuccessMessage(false), 3000);
};

// Load Wishlist from localStorage when the component mounts
useEffect(() => {
  const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  setWishlist(savedWishlist);
}, []);

  


const handleAddToCart = (plant) => {
  addToCart({ ...plant, price: Number(plant.price), quantity: 1 });
// Use context function instead of local state
  setShowCartMessage(true);
  setTimeout(() => setShowCartMessage(false), 2000);
};

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
  console.log("Wishlist items:", wishlist);
  useEffect(() => {
    console.log("Updated Wishlist:", wishlist);
  }, [wishlist]);
  


  return (
    <>
      {/* Navbar */}
      <DashboardNavbar /> 
      <div style={{ 
      backgroundColor: "#FAE1DD           ",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>

      {/* Main Content */}
      <Container className="text-center mt-5">
        

        <div className="d-flex justify-content-center mb-4">
          <Form.Control
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "300px", marginRight: "10px" }}
          />
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </div><br></br>

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
  {/* <Form.Control 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ width: "60px", display: "inline-block", marginRight: "10px" }}
      /> */}
  <Card.Text><strong>{plant.price}</strong></Card.Text>
  {/* <Button variant="success" onClick={() => handleBuyNow(plant)}>Buy Now</Button> */}
  <button onClick={() => addToWishlist(plant)} className="btn btn-primary">
      Add to Wishlist
    </button>
<Button variant="warning" className="ms-2" onClick={() => handleAddToCart(plant)}>Add to Cart</Button>
<br></br>
<br/>


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

  {/* <Button variant="success" onClick={() => handleBuyNow(plant)}>Buy Now</Button> */}
</Card.Body>

              </Card>
            </Col>
          ))}
        </Row>

        <Toast
  show={showCartMessage}
  onClose={() => setShowCartMessage(false)}
  delay={2000}
  autohide
  style={{
    position: "fixed",
    bottom: "70px",
    right: "20px",
    backgroundColor: "#ffc107",
    color: "black",
    padding: "10px",
    borderRadius: "5px",
  }}
>
  <Toast.Body>🛒 Added to Cart!</Toast.Body>
</Toast>


        {/* Modal Form
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
              <Form.Group className="mb-3">
  <Form.Check type="checkbox" label="Cash on Delivery" />
</Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="success" onClick={handleConfirmPurchase}>Confirm Purchase</Button>
          </Modal.Footer>
        </Modal> */}

{/* <ul>
        {wishlist.length > 0 ? (
          wishlist.map((item) => <li key={item.id}>{item.name}</li>)
        ) : (
          <p>No items in wishlist</p>
        )}
      </ul> */}

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
        <Toast.Body>🛒 Added to wishlist</Toast.Body>
      </Toast>
      </Container>
      </div>
    </>
    
  );
};

export default PlantShop;