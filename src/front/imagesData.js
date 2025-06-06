
//podemas ir agregando las imagenes aca para tener la galeria poco a poco//
//esto es provisional//


const imagesData = [
  {
    id: 1,
    src: "/img/imagen1.jpg",
    category: "misticos",
     country: "republica checa",
    favorite: false,
    location: { lat: 49.9614, lng: 15.2886  },
    name: "Capilla de los huesos Osario de Sedlec, república checa",
    description: "Esta iglesia está decorada con 30.000 huesos de víctimas de la peste, La iglesia gótica de Sedlec, cerca de la pintoresca ciudad de Kutná Hora,parece bastante normal desde fuera, pero si echas un vistazo al sótano descubrirás algo escalofriante.",
    comments: []
  },
    {
    id: 2,
    src: "/img/imagen2.jpg",
    category: "naturales",
     country: "rumania",
    favorite: false,
    location: { lat: 46.7706, lng: 23.5222 },
    name: "Bosque de Hoia Baciu,Rumania-Transilvania",
    description: "Es un lugar conocido por su misterio y las numerosas leyendas que lo rodean, como Fenómenos Paranormales,Avistamientos de OVNIS,tiene sucesos misteriosos y desapariciones inexplicables.Estas historias han contribuido a la fama de Hoia Baciu como un lugar misterioso y encantado, donde la realidad se entrelaza con la ficción.",
    comments: []
  },
  {
    id: 3,
    src: "/img/imagen3.jpg",
    category: "paranormal",
     country: "venecia",
    favorite: false,
    location: { lat: 45.3819, lng: 12.3308 },
    name: "La isla de Poveglia, en la laguna de Venecia",
    description: "Poveglia es una pequeña isla situada entre Venecia y Lido, al norte de Italia. Un pequeño canal la divide en dos partes y los mismos venecianos la conocen popularmente como la isla de los fantasmas o la isla sin retorno.La isla está tan llena de historia oscura y macabra, muchísima gente murió allí y realmente cuando estás allí te haces una idea de los horrores que sucedieron mientras caminas sus calles",
    comments: []
  },
  {
    id: 4,
    src: "/img/imagen4.jpg",
    category: "naturales",
     country: "tanzania",
    favorite: false,
    location: { lat: 2.4167, lng: 36.0167 },
    name: "Lago Natron,Gran Valle del Rift,Africa Oriental,Tanzania",
    description: "Presenta una peculiar costra de sal rojiza, y se trata de uno de los más salados y alcalinos en la Tierra. Todas estas características hacen que sea uno de los lagos más peligrosos del mundo,al atardecer, el reflejo del sol lo hace parecer un espejo de fuego.Es el principal sitio de reproducción de los flamencos enanos unico animal que puede sobrevivir en este lugar,su temperatura es de 60°C",
    comments: []
  },
  {
    id: 5,
    src: "/img/imagen5.jpg",
    category: "naturales",
     country: "yemen",
    favorite: false,
    location: { lat: 12.4634, lng: 53.8230 },
    name: "Socotra (Yemen)",
    description: "Sus paisajes son tan extraños que se le llama el lugar más alienígena de la Tierra,es considerada un excelente ejemplo de diversidad biológica. Debido al largo aislamiento geológico del archipiélago, junto con el fuerte calor y la sequía, se ha creado una espectacular flora endémica que es vulnerable",
    comments: []
  },
  {
    id: 6,
    src: "/img/imagen6.jpg",
    category: "hechos por el hombre",
    country: "estados unidos",
    favorite: false,
    location: { lat: 40.8593, lng: -119.3313 },
    name: "Fly Geyser (Nevada, EE.UU.)",
    description: "El géiser Fly fue creado accidentalmente durante la perforación de pozos​ en 1917, mientras se exploraba nuevas fuentes de energía geotérmica.El agua que produce el géiser contiene algas termófilas, que proliferan en ambientes húmedos y cálidos, coloreando las rocas con brillantes tonos verdes y rojos .",
    comments: []
  },
  {
    id: 7,
    src: "/img/imagen7.jpg",
    category: "paranormal",
    country: "japon",
    favorite: false,
    location: { lat: 35.4714, lng: 138.6081 },
    name: "Bosque de Aokigahara,Japón.",
    description: "Ubicado al noroeste de la base del monte Fuji.Es el lugar en el que más gente se ha suicidado en Japón y el segundo en el mundo, después del puente Golden Gate",
    comments: []
  },
  {
    id: 8,
    src: "/img/imagen8.jpg",
    category: "paranormal",
    country: "estados unidos",
    favorite: false,
    location: { lat: 37.3184, lng: -121.9511 },
    name: "La Mansión Winchester (California, EE.UU.)",
    description: "Las almas de todas las personas que murieron por culpa del famoso rifle creado por su familia se dedican a perseguirla. La maldición de la casa Winchester está basada en hechos reales.",
    comments: []
  },
  {
    id: 9,
    src: "/img/imagen9.jpg",  
    category: "misticos",
    country: "estados unidos",
    favorite: false,
    location: { lat: 36.6821, lng:-117.5694 },
    name: "El Misterio de las Piedras Deslizantes (EE.UU.)",
    description: "El misterio de las piedras deslizantes se da en Racetrack Playa, un lago seco en el Parque Nacional del Valle de la Muerte, California. Se trata de un fenómeno geológico que consiste en el desplazamiento de grandes rocas sin intervención humana o animal. ",
    comments: []
  },
  {
    id: 10,
    src: "/img/imagen10.jpg",
    category: "hechos por el hombre",
    country: "Turquia",
    favorite: false,
    location: { lat: 37.2233, lng: 38.9224 },
    name: "Göbekli Tepe (Turquía)",
    description: "El templo más antiguo del mundo (11,000 años), Göbekli Tepe es el lugar de culto religioso más antiguo del mundo descubierto hasta ahora, Los relieves de los pilares incluyen zorros, leones, jabalíes, asnos salvajes, garzas, patos, escorpiones, hormigas, arañas, muchas serpientes y unas pocas figuras antropomorfas.",
    comments: []
  },
  {
    id: 11,
    src: "/img/imagen11.jpg",
    category: "hechos por el hombre",
    country: "india",
    favorite: false,
    location: { lat: 27.0980, lng: 76.2869 },
    name: "Rajgarh Alwar, Bhangarh (India)",
    description: "La ciudad fantasma más embrujada de Asia.Según la leyenda, un hechizo maldijo este lugar, y hoy está prohibido entrar después del atardecer.",
    comments: []
  },
  {
    id: 12,
    src: "/img/imagen12.jpg",
    category: "hechos por el hombre",
    country: "irlanda",
    favorite: false,
    location: { lat: 53.6946, lng: 6.4755 },
    name: "Newgrange (Irlanda)",
    description: "Tumba prehistórica iluminada solo en el solsticio de invierno.Más antigua que las pirámides, se dice que era un sitio de renacimiento espiritual.Newgrange es conocido por la iluminación de su pasadizo y cámara con el sol del solsticio de invierno . Sobre la entrada del pasadizo de Newgrange hay una abertura llamada caja de techo. ",
    comments: []
  },
  
];

export default imagesData;


