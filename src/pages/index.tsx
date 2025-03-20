import LetterGrid from '../components/LetterGrid';

export default function Home() {
  const coordinatesToHighlight = [
    { x: 5, y: 2 },
    { x: 15, y: 7 },
    { x: 19, y: 19 },
  ];


  return (
    <div>
      <LetterGrid highlightedCoordinates={coordinatesToHighlight} gridSize={50} />
    </div>
  );
}