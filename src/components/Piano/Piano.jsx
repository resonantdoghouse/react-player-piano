import { useState, useEffect, useRef, useCallback } from 'react'
import * as Tone from 'tone'
import Key from '../Key/'
import pianoKeys from './pianoKeys.json'
import PianoControls from '../PianoControls'
import pianoSampler, { filter, reverb } from './pianoSampler'
import { randomFromArray } from '../../lib/utils'
import './Piano.scss'

const Piano = ({ songData }) => {
  const pianoKeysRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [keyElements, setKeyElements] = useState([])
  const [melodyPart, setMelodyPart] = useState(null)
  const [bassPart, setBassPart] = useState()
  const [activeSong, setActiveSong] = useState(randomFromArray(songData))
  const [filterLevel, setFilterLevel] = useState(0)
  const [reverbLevel, setReverbLevel] = useState(0.65)
  const [playbackSpeed, setPlaybackSpeed] = useState(120)

  const createPianoKeys = useCallback(() => {
    const mappedKeys = pianoKeys.map((key, i) => {
      if (key.includes('#')) {
        return (
          <Key
            key={i}
            note={key}
            data-note={key}
            handleKeyPress={handleKeyPress}
            isActive={false}
            isSharp
          />
        )
      } else {
        return (
          <Key
            key={i}
            note={key}
            data-note={key}
            handleKeyPress={handleKeyPress}
            isActive={false}
          />
        )
      }
    })
    return mappedKeys
  }, [])

  useEffect(() => {
    filter.set({ wet: filterLevel })
  }, [filterLevel])

  useEffect(() => {
    reverb.set({ wet: reverbLevel })
  }, [reverbLevel])

  useEffect(() => {
    setKeyElements(createPianoKeys())
  }, [createPianoKeys])

  // active song changed
  useEffect(() => {
    if (activeSong) {
      // right hand
      const newMelodyPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          )
        }
        animateKey(note, 'rh')
      }, activeSong.data.tracks[0].notes).start()
      // left hand
      const newBassPart = new Tone.Part((time, note) => {
        if (pianoSampler.loaded) {
          pianoSampler.triggerAttackRelease(
            note.name,
            note.duration,
            time,
            note.velocity
          )
        }
        animateKey(note, 'lh')
      }, activeSong.data.tracks[1].notes).start()
      setMelodyPart(newMelodyPart)
      setBassPart(newBassPart)
      return () => {
        newMelodyPart.dispose()
        newBassPart.dispose()
      }
    }
  }, [activeSong, playbackSpeed])

  useEffect(() => {
    Tone.Transport.bpm.rampTo(playbackSpeed, 2)
  }, [playbackSpeed])

  // Key Animation
  const animateKey = (note, hand) => {
    const keysArray = Array.from(pianoKeysRef.current.children)
    const keyElement = keysArray.find(
      (element) => element.getAttribute('data-note') === note.name
    )
    if (keyElement) {
      keyElement.classList.add(
        hand === 'rh' ? 'Key--rh-active' : 'Key--lh-active'
      )
      setTimeout(() => {
        keyElement.classList.remove('Key--lh-active')
        keyElement.classList.remove('Key--rh-active')
      }, note.duration * 600)
    }
  }

  const handleKeyPress = ({
    target: {
      dataset: { note },
    },
  }) => {
    if (pianoSampler.loaded) pianoSampler.triggerAttackRelease([note], 0.5)
  }

  // Toggle play pause
  const handlePlaySong = () => {
    if (!isPlaying) {
      Tone.Transport.start()
      setIsPlaying(true)
    } else {
      Tone.Transport.stop()
      setIsPlaying(false)
    }
    if (Tone.context.state !== 'running') {
      Tone.context.resume()
    }
  }

  const handleSelectSong = (event) => {
    const { value } = event.target
    const newSong = songData.find((song) => song.title === value)
    if (melodyPart) melodyPart.dispose()
    if (bassPart) bassPart.dispose()
    setActiveSong((prevSong) => (prevSong !== newSong ? newSong : prevSong))
  }

  const handleToggleReverb = () => {
    if (reverbLevel === 0) {
      setReverbLevel(0.65)
    } else {
      setReverbLevel(0)
    }
  }

  const handleToggleFilter = () => {
    if (filterLevel === 0) {
      setFilterLevel(1)
    } else {
      setFilterLevel(0)
    }
  }

  const renderSongOptions = () =>
    songData
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map((song) => <option key={song.title}>{song.title}</option>)

  // song data json files are quite large!
  if (!songData) {
    return <p>Loading song data...</p>
  }

  return (
    <main>
      <h1 className="hidden">React Player Piano</h1>
      <div className="Piano">
        <PianoControls
          activeSong={activeSong}
          isPlaying={isPlaying}
          handleSelectSong={handleSelectSong}
          handlePlaySong={handlePlaySong}
          renderSongOptions={renderSongOptions}
          handleToggleReverb={handleToggleReverb}
          reverbLevel={reverbLevel}
          handleToggleFilter={handleToggleFilter}
          filterLevel={filterLevel}
          setPlaybackSpeed={setPlaybackSpeed}
        />
        <div className="Piano__keys" ref={pianoKeysRef}>
          {keyElements}
        </div>
      </div>
    </main>
  )
}

export default Piano
