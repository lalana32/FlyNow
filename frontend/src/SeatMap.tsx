// import React, { useState } from 'react';

// type Seat = {
//   id: string;
//   side: 'left' | 'right';
//   row: number;
//   taken: boolean;
// };

// const seats: Seat[] = [];

// const rows = 6;
// const seatLettersLeft = ['A', 'B', 'C'];
// const seatLettersRight = ['D', 'E', 'F'];

// const takenSeatsSet = new Set(['1B', '2C', '3D', '4A', '5F', '6E']);

// for (let row = 1; row <= rows; row++) {
//   seatLettersLeft.forEach((letter) => {
//     const id = `${row}${letter}`;
//     seats.push({ id, side: 'left', row, taken: takenSeatsSet.has(id) });
//   });
//   seatLettersRight.forEach((letter) => {
//     const id = `${row}${letter}`;
//     seats.push({ id, side: 'right', row, taken: takenSeatsSet.has(id) });
//   });
// }

// const SeatMap = () => {
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

//   const toggleSeat = (id: string) => {
//     const seat = seats.find((s) => s.id === id);
//     if (!seat || seat.taken) return;

//     if (selectedSeats.includes(id)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== id));
//     } else {
//       setSelectedSeats([...selectedSeats, id]);
//     }
//   };

//   return (
//     <div
//       style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial, sans-serif' }}
//     >
//       <h2 style={{ textAlign: 'center' }}>Select your seats</h2>

//       {[...Array(rows)].map((_, index) => {
//         const row = index + 1;
//         return (
//           <div
//             key={row}
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               marginBottom: 20,
//               gap: 40,
//             }}
//           >
//             <div style={{ display: 'flex', gap: 15 }}>
//               {seats
//                 .filter((seat) => seat.row === row && seat.side === 'left')
//                 .map(({ id, taken }) => {
//                   const isSelected = selectedSeats.includes(id);
//                   const bgColor = taken
//                     ? '#e57373'
//                     : isSelected
//                     ? '#81c784'
//                     : '#90caf9';
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => toggleSeat(id)}
//                       style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 6,
//                         backgroundColor: bgColor,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         cursor: taken ? 'not-allowed' : 'pointer',
//                         userSelect: 'none',
//                         fontWeight: 'bold',
//                         color: '#0d47a1',
//                         boxShadow: isSelected ? '0 0 8px 2px #4caf50' : 'none',
//                         transition: 'background-color 0.3s',
//                       }}
//                       title={taken ? 'Taken' : 'Available'}
//                     >
//                       {id}
//                     </div>
//                   );
//                 })}
//             </div>

//             <div style={{ width: 40 }}></div>

//             <div style={{ display: 'flex', gap: 15 }}>
//               {seats
//                 .filter((seat) => seat.row === row && seat.side === 'right')
//                 .map(({ id, taken }) => {
//                   const isSelected = selectedSeats.includes(id);
//                   const bgColor = taken
//                     ? '#e57373'
//                     : isSelected
//                     ? '#81c784'
//                     : '#90caf9';
//                   return (
//                     <div
//                       key={id}
//                       onClick={() => toggleSeat(id)}
//                       style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 6,
//                         backgroundColor: bgColor,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         cursor: taken ? 'not-allowed' : 'pointer',
//                         userSelect: 'none',
//                         fontWeight: 'bold',
//                         color: '#0d47a1',
//                         boxShadow: isSelected ? '0 0 8px 2px #4caf50' : 'none',
//                         transition: 'background-color 0.3s',
//                       }}
//                       title={taken ? 'Taken' : 'Available'}
//                     >
//                       {id}
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//         );
//       })}

//       <div style={{ textAlign: 'center', marginTop: 20, fontWeight: '600' }}>
//         Selected seats:{' '}
//         {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
//       </div>
//     </div>
//   );
// };

// export default SeatMap;
