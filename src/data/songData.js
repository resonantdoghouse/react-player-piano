// song data
import avril14 from '../data/songs/avril14.json'
import aisatsana from '../data/songs/aisatsana.json'
import canon from '../data/songs/canon.json'
import jynweythekYlow from '../data/songs/jynweythekYlow.json'
import tommib from '../data/songs/tommib.json'
import superMario from '../data/songs/superMario.json'
import jurassicPark from '../data/songs/jurassicPark.json'
import theEntertainer from '../data/songs/entertainer.json'
import airOnTheGString from '../data/songs/airOnTheGString.json'
import chopinNocturnOpN2 from '../data/songs/chopinNocturneOp9N2.json'
import moonlightSonata from '../data/songs/moonlightSonata.json'
import lotrMainTheme from '../data/songs/lotrMainTheme.json'
import zeldasLullaby from '../data/songs/zeldasLullaby.json'
import whiterShadeOfPale from '../data/songs/whiterShadeOfPale.json'
import gymnopedie1 from '../data/songs/gymnopedie1.json'
import chromaticFantasy from '../data/songs/chromaticFantasy.json'
import prelude from '../data/songs/preludeInG.json'
import minuetInG from '../data/songs/minuetInG.json'

// images, album covers etc...
import jurassicParkImage from '../assets/images/jurassic-park.jpg'
import bachImage from '../assets/images/Johann_Sebastian_Bach.jpg'
import zeldaImage from '../assets/images/zelda-lullaby.jpg'
import procolHarumImage from '../assets/images/ProcolHarum.jpg'
import aphexTwinImage from '../assets/images/AphexTwinlogo.jpg'
import beethovenImage from '../assets/images/Beethoven.jpg'
import ericsatieImage from '../assets/images/Ericsatie.jpg'
import pachelbeJohannImage from '../assets/images/pachelbel_johann.jpg'
import lotrJohannImage from '../assets/images/lotr.jpg'
import scottJoplinImage from '../assets/images/Scott-Joplin.jpg'
import superMarioImage from '../assets/images/super-mario.jpg'
import squarepusherImage from '../assets/images/squarepusher.jpg'
import chopinImage from '../assets/images/chopin.jpg'

const songData = [
  {
    title: 'Minuet In G',
    artist: 'Johann Sebastian Bach',
    data: minuetInG,
    img: bachImage,
  },
  {
    title: 'Avril 14',
    artist: 'Aphex Twin',
    data: avril14,
    img: aphexTwinImage,
  },
  {
    title: 'Aisatsana',
    artist: 'Aphex Twin',
    data: aisatsana,
    img: aphexTwinImage,
  },
  {
    title: 'Canon',
    artist: 'Johann Pachelbel',
    data: canon,
    img: pachelbeJohannImage,
  },
  {
    title: 'Jynweythek Ylow',
    artist: 'Aphex Twin',
    data: jynweythekYlow,
    img: aphexTwinImage,
  },
  {
    title: 'Tommib',
    artist: 'Squarepusher',
    data: tommib,
    img: squarepusherImage,
  },
  {
    title: 'Super Mario Bros',
    artist: 'Koji Kondo',
    data: superMario,
    img: superMarioImage,
  },
  {
    title: 'Jurassic Park',
    artist: 'John Williams',
    data: jurassicPark,
    img: jurassicParkImage,
  },
  {
    title: 'The Entertainer',
    artist: 'Scott Joplin',
    data: theEntertainer,
    img: scottJoplinImage,
  },
  {
    title: 'Air on the G String',
    artist: 'Johann Sebastian Bach',
    data: airOnTheGString,
    img: bachImage,
  },
  {
    title: 'Nocturne Op.9 No.2',
    artist: 'Chopin',
    data: chopinNocturnOpN2,
    img: chopinImage,
  },
  {
    title: 'Moonlight Sonata',
    artist: 'Ludwig Van Beethoven',
    data: moonlightSonata,
    img: beethovenImage,
  },
  {
    title: 'Lord Of The Rings - Medley',
    artist: 'Howard Shore, arranged by Alex Lag',
    data: lotrMainTheme,
    img: lotrJohannImage,
  },
  {
    title: "Zelda's Lullaby",
    artist: 'Koji Kondo',
    data: zeldasLullaby,
    img: zeldaImage,
  },
  {
    title: 'A Whiter Shade Of Pale',
    artist: 'Procol Harum',
    data: whiterShadeOfPale,
    img: procolHarumImage,
  },
  {
    title: 'Gymnopédie No. 1',
    artist: 'Eric Satie',
    data: gymnopedie1,
    img: ericsatieImage,
  },
  {
    title: 'Chromatic Fantasy',
    artist: 'Johann Sebastian Bach',
    data: chromaticFantasy,
    img: bachImage,
  },
  {
    title: 'Prélude',
    artist: 'Johann Sebastian Bach',
    data: prelude,
    img: bachImage,
  },
]

export default songData
