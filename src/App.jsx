import { useState } from "react"


export default function App() {

  const [nameInput, setNameInput] = useState('')
  const [kmInput, setKmInput] = useState('')
  const [age, setAge] = useState('')
  const [ticketsData, setTicketsData] = useState([])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (nameInput !== '' || kmInput !== '' || age !== '') {
      setTicketsData([...ticketsData, { name: nameInput, km: kmInput, age: age }]);
    }

    setNameInput('');
    setKmInput('');
    setAge('')
  }

  const discountForMinor = (basePrice) => {
    const discount = (basePrice * 20 / 100).toFixed(2);
    const discountedPrice = (basePrice - discount).toFixed(2);
    return discountedPrice;
  }

  const discountForOver65 = (basePrice) => {
    const discount = (basePrice * 40 / 100).toFixed(2);
    const discountedPrice = (basePrice - discount).toFixed(2);
    return discountedPrice;
  }

  const price = (km, age) => {
    const pricePerKil = 0.21;
    const basePrice = (pricePerKil * km).toFixed(2);
    if (age === "Minorenne") {
      return discountForMinor(basePrice);
    }
    if (age === "Maggiorenne") {
      return basePrice;
    }
    if (age === "Over 65") {
      return discountForOver65(basePrice);
    }
  }

  return (
    <>
      <div className="bg">
        <h1 className="text-center tx-color m-0">Calcola il tuo biglietto</h1>
      </div>
      <div className="bg-form">
        <form id="ticket-form" className="form-position" onSubmit={(e) => { handleFormSubmit(e) }}>
          <div>
            <label htmlFor="name" className="text-white">Nome e cognome</label>
            <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} type="text" id="name" name="name" className="form-control input-width" required/>
          </div>
          <div>
            <label htmlFor="kilometri" className="text-white">Km da percorrere</label>
            <input value={kmInput} onChange={(e) => setKmInput(parseInt(e.target.value))} type="number" id="kilometri" name="kilometri" className="form-control input-width" required/>
          </div>
          <div>
            <label htmlFor="age" className="text-white">Età</label>
            <select value={age} onChange={(e) => setAge(e.target.value)} name="age" id="age" className="form-control input-width" required>
              <option value="">Seleziona</option>
              <option value="Minorenne">Minorenne</option>
              <option value="Maggiorenne">Maggiorenne</option>
              <option value="Over 65">Over 65</option>
            </select>
          </div>
          <div>
            <button id="invio-dati" className="btn btn-primary">Calcola</button>
          </div>
        </form>
      </div>
      <div className="text-center train-ticket bg pb-5">
        <h2 className="pb-3 tx-color">Il tuoi biglietti</h2>
        <div className="container">

          <table className= {`custom-table ${ticketsData.length === 0 ? 'd-none' :''}`} id="ticket">
            <thead>
              <tr>
                <th>Nome passeggero</th>
                <th>Km da percorrere</th>
                <th>Età</th>
                <th>Prezzo biglietto</th>
              </tr>
            </thead>
            <tbody>
              {
                ticketsData.reverse().map(({ name, km, age }, index) => {
                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{`${km} Km`}</td>
                      <td>{age}</td>
                      <td>{`${price(km, age)} €`}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

