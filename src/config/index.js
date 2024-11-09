import { images } from "../constant";

export const API_URL = 'https://neoestudio.net/api/'
export const IMAGE_URL = 'https://neoestudio.net/public/userImage/'

export const playstore_url = "https://play.google.com/store/apps/details?id=com.neostudio"
export const appstore_url = "https://apps.apple.com/us/app/neoestudio-guardia-civil-2023/id1531939360"
export const directo_url = "https://webversion.neoestudio.net/directo?id="

export const home_array = [
    {
        id: 1,
        image: images.planing_image,
        title: "Planificación",
        array: [
            {
                id: 11,
                image: images.activities_image,
                title: "Planning",
                type: "activities"
            },
            {
                id: 12,
                image: images.calendar_image,
                title: "Calendario",
                type: "calendar"
            },
        ]
    },
    {
        id: 2,
        image: images.classess_image,
        title: "Clases",
        array: [
            {
                id: 21,
                image: images.clases_garbadas_image,
                title: "Clases grabadas",
                type: "classes"
            },
            {
                id: 22,
                image: images.directo_image,
                title: "Clase en directo",
                type: "directo"
            },
            {
                id: 23,
                image: images.entertainment_image,
                title: "Entrenamiento",
                type: "entertainment"
            },
        ]
    },
    {
        id: 3,
        image: images.tests_image,
        title: "Tests",
        array: [
            {
                id: 31,
                image: images.examen_image,
                title: "Exámenes",
                type: "exams",
            },
            {
                id: 32,
                image: images.repaso_image,
                title: "Repaso",
                type: "repaso"
            },
            {
                id: 33,
                image: images.batalla_image,
                title: "Personalizados",
                type: "battle"

            },
        ]
    },
    {
        id: 4,
        image: images.dudas_image,
        title: "Dudas",
        array: [
            {
                id: 41,
                image: images.ai_image,
                title: "Inteligencia artificial",
                type: "ai"
            },
            {
                id: 42,
                image: images.profesorado_image,
                title: "Resolución de dudas",
                type: "stripe_support"
            },
            {
                id: 43,
                image: images.profesorado_image,
                title: "Soporte técnico",
                type: "whatsapp_support"
            },
            // {
            //     id: 42,
            //     image: images.profesorado_image,
            //     title: "Profesorado"
            // },
            // {
            //     id: 43,
            //     image: images.profesorado_image,
            //     title: "Preguntas\nfrecuentes"
            // },
        ]
    },
    {
        id: 5,
        image: images.repaso_image,
        title: "Repaso",
        array: [
            {
                id: 52,
                image: images.audio_image,
                title: "Audiolibro",
                type: "audio"
            },
            {
                id: 51,
                image: images.videos_image,
                title: "Videos",
                type: "video"
            },
            {
                id: 53,
                image: images.temario_image,
                title: "Temario en pdf",
                type: "pdf"
            },
        ]
    },
    {
        id: 7,
        image: images.repaso_image,
        title: "Estadísticas",
        array: [
            {
                id: 72,
                image: images.ranking_image,
                title: "Ranking por materias",
                type: "home_modal"
            },
            {
                id: 71,
                image: images.ranking_image,
                title: "Ranking por temas",
                type: "exam_modal"
            },
            {
                id: 73,
                image: images.ranking_image,
                title: "Ranking global",
                type: "ranking"
            },
        ]
    },
    {
        id: 6,
        image: images.otros_image,
        title: "Ajustes",
        array: [
            {
                id: 62,
                image: images.pidelo_image,
                title: "Página web",
                type: "pagina"
            },
            {
                id: 66,
                image: images.descargas_image,
                title: "Descargas",
                type: "descargas"

            },
            {
                id: 65,
                image: images.entervista_image,
                title: "Entrevista",
                type: "entervista"
            },
            {
                id: 63,
                image: images.adjustes_image,
                title: "Ajustes",
                type: "ajustes"
            },
            {
                id: 61,
                image: images.logout_image,
                title: "Salir",
                type: "logout"
            },
        ]
    },
]