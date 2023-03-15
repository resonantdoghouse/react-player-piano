import { useState } from 'react';
import Piano from './components/Piano';
import './App.scss';
// song data
import avril14 from './data/songs/avril14.json';
import aisatsana from './data/songs/aisatsana.json';
import canon from './data/songs/canon.json';
import jynweythekYlow from './data/songs/jynweythekYlow.json';
import tommib from './data/songs/tommib.json';
import superMario from './data/songs/superMario.json';
import jurassicPark from './data/songs/jurassicPark.json';
import theEntertainer from './data/songs/entertainer.json';
import airOnTheGString from './data/songs/airOnTheGString.json';
import chopinNocturnOpN2 from './data/songs/chopinNocturneOp9N2.json';
import moonlightSonata from './data/songs/moonlightSonata.json';
import lotrMainTheme from './data/songs/lotrMainTheme.json';
import zeldasLullaby from './data/songs/zeldasLullaby.json';
import whiterShadeOfPale from './data/songs/whiterShadeOfPale.json';
import gymnopedie1 from './data/songs/gymnopedie1.json';
import chromaticFantasy from './data/songs/chromaticFantasy.json';
import prelude from './data/songs/preludeInG.json';

const App = () => {
  const [songData] = useState([
    {
      title: 'Avril 14',
      artist: 'Aphex Twin',
      data: avril14,
      img: 'https://picsum.photos/id/910/200/200',
    },
    {
      title: 'Aisatsana',
      artist: 'Aphex Twin',
      data: aisatsana,
      img: 'https://picsum.photos/id/902/200/200',
    },
    {
      title: 'Canon',
      artist: 'Johann Pachelbel',
      data: canon,
      img: 'https://picsum.photos/id/903/200/200',
    },
    {
      title: 'Jynweythek Ylow',
      artist: 'Aphex Twin',
      data: jynweythekYlow,
      img: 'https://picsum.photos/id/904/200/200',
    },
    {
      title: 'Tommib',
      artist: 'Squarepusher',
      data: tommib,
      img: 'https://picsum.photos/id/904/200/200',
    },
    {
      title: 'Super Mario Bros',
      artist: 'Koji Kondo',
      data: superMario,
      img: 'https://picsum.photos/id/905/200/200',
    },
    {
      title: 'Jurassic Park',
      artist: 'John Williams',
      data: jurassicPark,
      img: 'https://picsum.photos/id/906/200/200',
    },
    {
      title: 'The Entertainer',
      artist: 'Scott Joplin',
      data: theEntertainer,
      img: 'https://picsum.photos/id/907/200/200',
    },
    {
      title: 'Air on the G String',
      artist: 'Johann Sebastian Bach',
      data: airOnTheGString,
      img: 'https://picsum.photos/id/908/200/200',
    },
    {
      title: 'Nocturne Op.9 No.2',
      artist: 'Chopin',
      data: chopinNocturnOpN2,
      img: 'https://picsum.photos/id/908/200/200',
    },
    {
      title: 'Moonlight Sonata',
      artist: 'Ludwig Van Beethoven',
      data: moonlightSonata,
      img: 'https://picsum.photos/id/912/200/200',
    },
    {
      title: 'Lord Of The Rings - Medley',
      artist: 'Howard Shore, arranged by Alex Lag',
      data: lotrMainTheme,
      img: 'https://picsum.photos/id/913/200/200',
    },
    {
      title: "Zelda's Lullaby",
      artist: 'Koji Kondo',
      data: zeldasLullaby,
      img: 'https://picsum.photos/id/914/200/200',
    },
    {
      title: 'A Whiter Shade Of Pale',
      artist: 'Procol Harum',
      data: whiterShadeOfPale,
      img: 'https://picsum.photos/id/915/200/200',
    },
    {
      title: 'Gymnopédie No. 1',
      artist: 'Eric Satie',
      data: gymnopedie1,
      img: 'https://picsum.photos/id/932/200/200',
    },
    {
      title: 'Chromatic Fantasy',
      artist: 'Johann Sebastian Bach',
      data: chromaticFantasy,
      img: 'https://picsum.photos/id/934/200/200',
    },
    {
      title: 'Prélude',
      artist: 'Johann Sebastian Bach',
      data: prelude,
      img: 'https://picsum.photos/id/936/200/200',
    },
  ]);

  return (
    <div className="App">
      <Piano songData={songData} />
    </div>
  );
};

export default App;
