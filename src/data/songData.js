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
import skyrimImage from '../assets/images/skyrim.jpg'

const songData = [
  {
    title: 'Minuet In G',
    artist: 'Johann Sebastian Bach',
    loadData: () => import('../data/songs/minuetInG.json'),
    img: bachImage,
  },
  {
    title: 'Avril 14',
    artist: 'Aphex Twin',
    loadData: () => import('../data/songs/avril14.json'),
    img: aphexTwinImage,
  },
  {
    title: 'Aisatsana',
    artist: 'Aphex Twin',
    loadData: () => import('../data/songs/aisatsana.json'),
    img: aphexTwinImage,
  },
  {
    title: 'Canon',
    artist: 'Johann Pachelbel',
    loadData: () => import('../data/songs/canon.json'),
    img: pachelbeJohannImage,
  },
  {
    title: 'Jynweythek Ylow',
    artist: 'Aphex Twin',
    loadData: () => import('../data/songs/jynweythekYlow.json'),
    img: aphexTwinImage,
  },
  {
    title: 'Tommib',
    artist: 'Squarepusher',
    loadData: () => import('../data/songs/tommib.json'),
    img: squarepusherImage,
  },
  {
    title: 'Super Mario Bros',
    artist: 'Koji Kondo',
    loadData: () => import('../data/songs/superMario.json'),
    img: superMarioImage,
  },
  {
    title: 'Jurassic Park',
    artist: 'John Williams',
    loadData: () => import('../data/songs/jurassicPark.json'),
    img: jurassicParkImage,
  },
  {
    title: 'The Entertainer',
    artist: 'Scott Joplin',
    loadData: () => import('../data/songs/entertainer.json'),
    img: scottJoplinImage,
  },
  {
    title: 'Air on the G String',
    artist: 'Johann Sebastian Bach',
    loadData: () => import('../data/songs/airOnTheGString.json'),
    img: bachImage,
  },
  {
    title: 'Nocturne Op.9 No.2',
    artist: 'Chopin',
    loadData: () => import('../data/songs/chopinNocturneOp9N2.json'),
    img: chopinImage,
  },
  {
    title: 'Moonlight Sonata',
    artist: 'Ludwig Van Beethoven',
    loadData: () => import('../data/songs/moonlightSonata.json'),
    img: beethovenImage,
  },
  {
    title: 'Lord Of The Rings - Medley',
    artist: 'Howard Shore, arranged by Alex Lag',
    loadData: () => import('../data/songs/lotrMainTheme.json'),
    img: lotrJohannImage,
  },
  {
    title: "Zelda's Lullaby",
    artist: 'Koji Kondo',
    loadData: () => import('../data/songs/zeldasLullaby.json'),
    img: zeldaImage,
  },
  {
    title: 'A Whiter Shade Of Pale',
    artist: 'Procol Harum',
    loadData: () => import('../data/songs/whiterShadeOfPale.json'),
    img: procolHarumImage,
  },
  {
    title: 'Gymnopédie No. 1',
    artist: 'Eric Satie',
    loadData: () => import('../data/songs/gymnopedie1.json'),
    img: ericsatieImage,
  },
  {
    title: 'Chromatic Fantasy',
    artist: 'Johann Sebastian Bach',
    loadData: () => import('../data/songs/chromaticFantasy.json'),
    img: bachImage,
  },
  {
    title: 'Prélude',
    artist: 'Johann Sebastian Bach',
    loadData: () => import('../data/songs/preludeInG.json'),
    img: bachImage,
  },
  {
    title: 'Skyrim Main Theme',
    artist: 'Jeremy Soule',
    loadData: () => import('../data/songs/skyrimMainTheme.json'),
    img: skyrimImage,
  },
]

export default songData
