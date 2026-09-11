import eyebrows from "../beauty/eyebrows.png";
import upperLip from "../beauty/upper-lip.png";
import normalFacial from "../beauty/normal-facial.png";
import premiumFacial from "../beauty/premium-facial.png";
import haircut from "../beauty/haircut.png";
import hairSpa from "../beauty/hair-spa.png";
import cleanup from "../beauty/cleanup.png";
import waxing from "../beauty/waxing.png";
import manicure from "../beauty/manicure.png";
import pedicure from "../beauty/pedicure.png";


const beautyServices = [

    {
        id: 1,
        name: "Eyebrows",
        category: "Threading",
        price: 50,
        image: eyebrows
    },

    {
        id: 2,
        name: "Upper Lip",
        category: "Threading",
        price: 40,
        image: upperLip
    },

    {
        id: 3,
        name: "Normal Facial",
        category: "Facial",
        price: 500,
        image: normalFacial
    },

    {
        id: 4,
        name: "Premium Facial",
        category: "Facial",
        price: 900,
        image: premiumFacial
    },

    {
        id: 5,
        name: "Haircut",
        category: "Hair",
        price: 200,
        image: haircut
    },

    {
        id: 6,
        name: "Hair Spa",
        category: "Hair",
        price: 600,
        image: hairSpa
    },

    {
        id: 7,
        name: "Cleanup",
        category: "Skin Care",
        price: 350,
        image: cleanup
    },

    {
        id: 8,
        name: "Waxing",
        category: "Skin Care",
        price: 400,
        image: waxing
    },

    {
        id: 9,
        name: "Manicure",
        category: "Nails",
        price: 300,
        image: manicure
    },

    {
        id: 10,
        name: "Pedicure",
        category: "Nails",
        price: 350,
        image: pedicure
    }

];


export default beautyServices;