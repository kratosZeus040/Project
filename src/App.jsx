import { useState } from 'react'
import './App.css'

const initialCars = [
  { id: 1, name: 'Toyota Prius', seats: 4, price: 40 },
  { id: 2, name: 'Honda Civic', seats: 4, price: 35 },
  { id: 3, name: 'Ford Explorer', seats: 7, price: 55 },
]

function App() {
  const [selectedCar, setSelectedCar] = useState(null)
  const [booking, setBooking] = useState({ name: '', date: '' })
  const [bookings, setBookings] = useState([])

  const handleSelect = (car) => {
    setSelectedCar(car)
    setBooking({ name: '', date: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedCar && booking.name && booking.date) {
      setBookings([...bookings, { ...booking, car: selectedCar }])
      setSelectedCar(null)
    }
  }

  return (
    <div className="app-container">
      <h1>Car Booking</h1>
      <ul className="car-list">
        {initialCars.map((car) => (
          <li key={car.id} className="car-item">
            <div>
              <strong>{car.name}</strong> - {car.seats} seats - ${car.price}/day
            </div>
            <button onClick={() => handleSelect(car)}>Book</button>
          </li>
        ))}
      </ul>
      {selectedCar && (
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Book {selectedCar.name}</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={booking.name}
            onChange={(e) => setBooking({ ...booking, name: e.target.value })}
          />
          <input
            type="date"
            value={booking.date}
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
          />
          <div>
            <button type="submit">Confirm Booking</button>
            <button type="button" onClick={() => setSelectedCar(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {bookings.length > 0 && (
        <div className="bookings">
          <h2>Your Bookings</h2>
          <ul>
            {bookings.map((b, idx) => (
              <li key={idx}>
                {b.name} booked {b.car.name} for {b.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
