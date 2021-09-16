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
      img: 'https://picsum.photos/id/908/200/300',
    },
  ]);

  return (
    <div className="App">
      <Piano songData={songData} />
    </div>
  );
};

export default App;
