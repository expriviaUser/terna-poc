import React, { useState, useEffect } from 'react';
import './App.css';
import measurementsData from './data.json';
import myLogo from "./assets/2loghi.svg";
import profile from "./assets/frame-profilo.svg";
import { ChevronDown, ChevronUp } from "lucide-react";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showAreas, setShowAreas] = useState(true);
  const [showTensione, setShowTensione] = useState(true);
  const [showModelli, setShowModelli] = useState(true);
  const [showProtocolli, setShowProtocolli] = useState(true);
  const [showAnnoInst, setShowAnnoInst] = useState(true);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  const [filters, setFilters] = useState({
    areas: {
      nord: false,
      sud: false,
      centro: false,
      cnord: false,
      csud: false,
      calabria: false,
      sicilia: false,
      sardegna: false,

    },
    tensione: {
      at: false,
      mt: false
    },
    modelli: {
      a: false,
      b: false,
      c: false,
      d: false
    },
    protocolli: {
      g: false,
      ethernet: false,
      apiRestful: false,
      integrazioneCloud: false,
      frequenza: false,
      meccanismoAutoprotezione: false
    },
    fornitore: {
      furn1: false,
      furn2: false,
      furn3: false,
      furn4: false,
      furn5: false,
    },
    state: {
      online: false,
      offline: false,
      alert: false
    }
  });

  useEffect(() => {
    setData(measurementsData.measurements);
    setFilteredData(measurementsData.measurements);
  }, []);


  useEffect(() => {
    filterData();
  }, [filters, data]);

  const filterData = () => {
    let result = [...data];
    
    // Apply area filter (this is simulated since we don't have area data)
    const anyAreaSelected = Object.values(filters.areas).some(v => v);
    if (anyAreaSelected) {
      // For simulation, we'll filter based on Misuratore numbers
      if (filters.areas.nord) {
        result = result.filter(item => parseInt(item.Misuratore.split('-')[1]) <= 33);
      }
      if (filters.areas.sud) {
        result = result.filter(item => parseInt(item.Misuratore.split('-')[1]) > 33 && parseInt(item.Misuratore.split('-')[1]) <= 66);
      }
      if (filters.areas.centro) {
        result = result.filter(item => parseInt(item.Misuratore.split('-')[1]) > 66);
      }
    }
    
    // Apply tensione filter
    const anyTensioneSelected = Object.values(filters.tensione).some(v => v);
    if (anyTensioneSelected) {
      if (filters.tensione.at) {
        result = result.filter(item => item.Tensione > 70);
      }
      if (filters.tensione.mt) {
        result = result.filter(item => item.Tensione <= 70);
      }
    }
    
    // Apply modelli filter (simulated)
    const anyModelliSelected = Object.values(filters.modelli).some(v => v);
    if (anyModelliSelected) {
      if (filters.modelli.a) {
        result = result.filter(item => parseInt(item.Misuratore.split('-')[1]) % 4 === 0);
      }
      if (filters.modelli.b) {
        result = result.filter(item => parseInt(item.Misuratore.split('-')[1]) % 4 === 1);
      }
      if (filters.modelli.c) {
        result = result.filter(item => parseInt(item.Misuratore.split('-')[1]) % 4 === 2);
      }
      if (filters.modelli.d) {
        result = result.filter(item => parseInt(item.Misuratore.split('-')[1]) % 4 === 3);
      }
    }
    
    // Apply protocolli filters
    const anyProtocolliSelected = Object.values(filters.protocolli).some(v => v);
    if (anyProtocolliSelected) {
      if (filters.protocolli.misuraPotenza) {
        result = result.filter(item => item.PotenzaAttiva > 50);
      }
      if (filters.protocolli.tensione) {
        result = result.filter(item => item.Tensione > 80);
      }
      if (filters.protocolli.corrente) {
        result = result.filter(item => item.Corrente > 70);
      }
      if (filters.protocolli.frequenza) {
        result = result.filter(item => item.Frequenza > 50);
      }
    }
    
    // Apply anno installazione filter (simulated)
    if (filters.annoInstallazione) {
      result = result.filter(item => 
        parseInt(item.Misuratore.split('-')[1]) % 100 > parseInt(filters.annoInstallazione)
      );
    }
    
    // Apply sorting if sortConfig is not null
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Handle filter changes
  const handleFilterChange = (filterType, filterValue, isChecked) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      newFilters[filterType][filterValue] = isChecked;
      return newFilters;
    });
  };
  
  const handleAnnoInstallazioneChange = (value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      annoInstallazione: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      areas: {
        nord: false,
        sud: false,
        centro: false,
        cnord: false,
        csud: false,
        calabria: false,
        sicilia: false,
        sardegna: false,
  
      },
      tensione: {
        at: false,
        mt: false
      },
      modelli: {
        a: false,
        b: false,
        c: false,
        d: false
      },
      protocolli: {
        g: false,
        ethernet: false,
        apiRestful: false,
        integrazioneCloud: false,
        frequenza: false,
        meccanismoAutoprotezione: false
      },
      fornitore: {
        furn1: false,
        furn2: false,
        furn3: false,
        furn4: false,
        furn5: false,
      },
      state: {
        online: false,
        offline: false,
        alert: false
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={myLogo} alt="Description" width="300" />
        <nav>
          <ul>
            <li>Gestione Misuratori</li>
            <li>Validazione misure</li>
            <li>Reportistica</li>
          </ul>
        </nav>
        <img src={profile} alt="Description" width="300" />
      </header>
      <main>
        <aside className="filters">
          <h2>Filtri applicati</h2>
          <button onClick={clearFilters}>Cancella filtri</button>
          <div className="filter-group">
            <div className='filter-group-header' onClick={() => setShowAreas(!showAreas)}>
              <h3>Area zonali</h3>
              { showAreas ? <ChevronDown size={24} /> : <ChevronUp size={24} /> }
            </div>
            { showAreas &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.areas.nord}
                onChange={(e) => handleFilterChange('areas', 'nord', e.target.checked)}
              /> Nord
            </label>}
            { showAreas &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.areas.cnord}
                onChange={(e) => handleFilterChange('areas', 'cnord', e.target.checked)}
              /> CNord
            </label>}
            { showAreas && <label>
              <input 
                type="checkbox" 
                checked={filters.areas.sud}
                onChange={(e) => handleFilterChange('areas', 'sud', e.target.checked)}
              /> Sud
            </label> }
            { showAreas && <label>
              <input 
                type="checkbox" 
                checked={filters.areas.csud}
                onChange={(e) => handleFilterChange('areas', 'csud', e.target.checked)}
              /> CSud
            </label> }
            { showAreas && <label>
              <input 
                type="checkbox" 
                checked={filters.areas.centro}
                onChange={(e) => handleFilterChange('areas', 'centro', e.target.checked)}
              /> Centro
            </label> }
          </div>
          <div className="filter-group">
            <div className='filter-group-header' onClick={() => setShowTensione(!showTensione)}>
              <h3>Tensione</h3>
              { showTensione ? <ChevronDown size={24} /> : <ChevronUp size={24} /> }
            </div>
            {showTensione &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.tensione.at}
                onChange={(e) => handleFilterChange('tensione', 'at', e.target.checked)}
              /> AT
            </label>
            }
            {showTensione &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.tensione.mt}
                onChange={(e) => handleFilterChange('tensione', 'mt', e.target.checked)}
              /> MT
            </label>
            }
          </div>
          <div className="filter-group">
            <div className='filter-group-header' onClick={() => setShowModelli(!showModelli)}>
              <h3>Modelli</h3>
              { showModelli ? <ChevronDown size={24} /> : <ChevronUp size={24} /> }
            </div>
            {showModelli && 
            <label>
              <input 
                type="checkbox" 
                checked={filters.modelli.a}
                onChange={(e) => handleFilterChange('modelli', 'a', e.target.checked)}
              /> A
            </label>
            }
            {showModelli && 
            <label>
              <input 
                type="checkbox" 
                checked={filters.modelli.b}
                onChange={(e) => handleFilterChange('modelli', 'b', e.target.checked)}
              /> B
            </label>
            }
            {showModelli && 
            <label>
              <input 
                type="checkbox" 
                checked={filters.modelli.c}
                onChange={(e) => handleFilterChange('modelli', 'c', e.target.checked)}
              /> C
            </label>
            }
            {showModelli && 
            <label>
              <input 
                type="checkbox" 
                checked={filters.modelli.d}
                onChange={(e) => handleFilterChange('modelli', 'd', e.target.checked)}
              /> D
            </label>
            }
          </div>
          <div className="filter-group">
            <div className='filter-group-header' onClick={() => setShowProtocolli(!showProtocolli)}>
              <h3>Protocolli</h3>
              { showProtocolli ? <ChevronDown size={24} /> : <ChevronUp size={24} /> }
            </div>
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli.misuraPotenza}
                onChange={(e) => handleFilterChange('protocolli', 'misuraPotenza', e.target.checked)}
              /> Misura potenza
            </label>
            }
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli.tensione}
                onChange={(e) => handleFilterChange('protocolli', 'tensione', e.target.checked)}
              /> Tensione
            </label>
            }
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli.corrente}
                onChange={(e) => handleFilterChange('protocolli', 'corrente', e.target.checked)}
              /> Corrente
            </label>
            }
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli.fasi}
                onChange={(e) => handleFilterChange('protocolli', 'fasi', e.target.checked)}
              /> Fasi
            </label>
            }
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli.frequenza}
                onChange={(e) => handleFilterChange('protocolli', 'frequenza', e.target.checked)}
              /> Frequenza
            </label>
            }
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli.meccanismoAutoprotezione}
                onChange={(e) => handleFilterChange('protocolli', 'meccanismoAutoprotezione', e.target.checked)}
              /> Meccanismo di autoprotezione
            </label>
            }
          </div>
          <div className="filter-group">
            <div className='filter-group-header' onClick={() => setShowAnnoInst(!showAnnoInst)}>
              <h3>Anno installazione</h3>
              { showAnnoInst ? <ChevronDown size={24} /> : <ChevronUp size={24} /> }
            </div> 
            {showAnnoInst &&
            <input 
              type="text" 
              placeholder="Anno installazione*" 
              value={filters.annoInstallazione}
              onChange={(e) => handleAnnoInstallazioneChange(e.target.value)}
            />
            }
          </div>
        </aside>
        <section className="content">
          <div className="clusters">
            <div className="cluster">
              <h3>MANCANTI</h3>
              <p>72</p>
            </div>
            <div className="cluster">
              <h3>CORRETTE AUTOMATICAMENTE</h3>
              <p>20</p>
            </div>
            <div className="cluster">
              <h3>MISURE DERIVATE DA MISURATORI CON PROBABILI ANOMALIE</h3>
              <p>12</p>
            </div>
            <div className="cluster">
              <h3>VALIDATE AUTOMATICAMENTE</h3>
              <p>59.896</p>
            </div>
          </div>
          <div className="measurements">
            <h2>20 Misure Corrette Automaticamente</h2>
            <table>
              <thead>
                <tr>
                  <th onClick={() => requestSort('Time')} className={sortConfig.key === 'Time' ? sortConfig.direction : ''}>
                    Time {sortConfig.key === 'Time' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('Misuratore')} className={sortConfig.key === 'Misuratore' ? sortConfig.direction : ''}>
                    Misuratore {sortConfig.key === 'Misuratore' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('Nodo')} className={sortConfig.key === 'Nodo' ? sortConfig.direction : ''}>
                    Nodo {sortConfig.key === 'Nodo' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('Frequenza')} className={sortConfig.key === 'Frequenza' ? sortConfig.direction : ''}>
                    Frequenza {sortConfig.key === 'Frequenza' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('Tensione')} className={sortConfig.key === 'Tensione' ? sortConfig.direction : ''}>
                    Tensione {sortConfig.key === 'Tensione' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('Corrente')} className={sortConfig.key === 'Corrente' ? sortConfig.direction : ''}>
                    Corrente {sortConfig.key === 'Corrente' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => requestSort('PotenzaAttiva')} className={sortConfig.key === 'PotenzaAttiva' ? sortConfig.direction : ''}>
                    Potenza Attiva {sortConfig.key === 'PotenzaAttiva' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Time}</td>
                    <td>{item.Misuratore}</td>
                    <td>{item.Nodo}</td>
                    <td>{item.Frequenza}</td>
                    <td>{item.Tensione}</td>
                    <td>{item.Corrente}</td>
                    <td>{item.PotenzaAttiva}</td>
                    <td>
                      <button>Download</button>
                      <button>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={prevPage}>&lt;</button>
              <span>{currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</span>
              <button onClick={nextPage}>&gt;</button>
            </div>
            <div className="results-info">
              Showing {currentItems.length} of {filteredData.length} results
            </div>
          </div>
        </section>
        <aside className="inspector">
          <h2>Inspector</h2>
          <button>Crea Report</button>
          <button>Apri segnalazione</button>
          <div className="map">
            {/* Map image or component */}
          </div>
          <div className="characteristics">
            <h3>Caratteristiche misuratori</h3>
            <ul>
              <li>14) Model A</li>
              <li>26) Model B</li>
              <li>3) Model D</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;