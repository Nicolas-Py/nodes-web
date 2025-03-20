import LetterGrid from '../components/LetterGrid';
function getCircleCoordinates(center: { x: number, y: number }, radius: number, gridSize: number) {
  const coordinates = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if ((x - center.x) ** 2 + (y - center.y) ** 2 <= radius ** 2) {
        coordinates.push({ x, y });
      }
    }
  }
  return coordinates;
}

export default function Home() {
  const gridSize = 50;
  const circleCenter = { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) };
  const circleRadius = 20; 
  
  
  const coordinatesToHighlight = getCircleCoordinates(circleCenter, circleRadius, gridSize);

  return (
    <div>
      <LetterGrid highlightedCoordinates={coordinatesToHighlight} gridSize={gridSize} />
    </div>
  );
}