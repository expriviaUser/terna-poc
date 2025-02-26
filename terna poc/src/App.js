import React, { useState, useEffect } from 'react';
import './App.css';
import measurementsData from './data.json';
import myLogo from "./assets/2loghi.svg";
import profile from "./assets/frame-profilo.svg";
import { ChevronDown, ChevronUp } from "lucide-react";
import Form from 'react-bootstrap/Form';

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
      all: false,
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
      at: true,
      mt: true
    },
    modelli: {
      all: false,
      a: false,
      b: false,
      c: false,
      d: false
    },
    protocolli: {
      all: false,
      g: false,
      ethernet: false,
      apiRestful: false,
      integrazioneCloud: false
    },
    fornitore: {
      all: false,
      furn1: false,
      furn2: false,
      furn3: false,
      furn4: false,
      furn5: false,
    },
    state: {
      all: false,
      online: false,
      offline: false,
      alert: false
    }
  });

  useEffect(() => {
    // Transform the data to flatten the latest measurement with device info
    const transformedData = measurementsData.misuratori.map(device => {
      const latestMeasurement = device.Grandezze[device.Grandezze.length - 1];
      return {
        Misuratore: device.Misuratore,
        Nodo: device.Nodo,
        Zona: device.Zona,
        Livello_Tensione: device.Livello_Tensione,
        Modello_Misuratore: device.Modello_Misuratore,
        Protocolli_Supportati: device.Protocolli_Supportati,
        Anno_Installazione: device.Anno_Installazione,
        Prezzo_Unitario: device.Prezzo_Unitario,
        Fase: device.Fase,
        ...latestMeasurement,
        Cluster: device.Cluster
      };
    });
    
    setData(transformedData);
    setFilteredData(transformedData);
  }, []);

  useEffect(() => {
    filterData();
  }, [filters, data]);

  useEffect(() => {
    if (sortConfig.key) {
      const sortedData = [...filteredData];
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  }, [sortConfig]);

  const filterData = () => {
    let result = [...data];
    
    // Apply area filter based on Zona field
    const anyAreaSelected = Object.values(filters.areas).some(v => v);
    if (anyAreaSelected) {
      result = result.filter(item => {
        if (filters.areas.nord && item.Zona === "Nord") return true;
        if (filters.areas.sud && item.Zona === "Sud") return true;
        if (filters.areas.centro && item.Zona === "Centro") return true;
        return false;
      });
    }
    
    // Apply tensione filter based on Livello_Tensione field
    const anyTensioneSelected = Object.values(filters.tensione).some(v => v);
    if (anyTensioneSelected) {
      result = result.filter(item => {
        if (filters.tensione.at && item.Livello_Tensione === "AT") return true;
        if (filters.tensione.mt && item.Livello_Tensione === "MT") return true;
        return false;
      });
    }
    
    // Updated modelli filter to use Modello_Misuratore field
    const anyModelliSelected = Object.values(filters.modelli).some(v => v);
    if (anyModelliSelected) {
      result = result.filter(item => {
        if (filters.modelli.a && item.Modello_Misuratore === "A") return true;
        if (filters.modelli.b && item.Modello_Misuratore === "B") return true;
        if (filters.modelli.c && item.Modello_Misuratore === "C") return true;
        if (filters.modelli.d && item.Modello_Misuratore === "D") return true;
        return false;
      });
    }
    
    // Apply protocolli filters based on Protocolli_Supportati array
    const anyProtocolliSelected = Object.values(filters.protocolli).some(v => v);
    if (anyProtocolliSelected) {
      result = result.filter(item => {
        const protocols = item.Protocolli_Supportati.map(p => p.toLowerCase());
        if (filters.protocolli.gsm && protocols.includes("interfaccia gsm")) return true;
        if (filters.protocolli["4g"] && protocols.includes("4g")) return true;
        if (filters.protocolli["5g"] && protocols.includes("5g")) return true;
        return false;
      });
    }
    
    // Apply anno installazione filter
    if (filters.annoInstallazione) {
      result = result.filter(item => 
        item.Anno_Installazione >= parseInt(filters.annoInstallazione)
      );
    }
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate cluster statistics
  const clusterStats = data.reduce((stats, item) => {
    if (item.Cluster.Misure_Mancanti) stats.mancanti++;
    if (item.Cluster.Misure_Corrette_Automaticamente) stats.corrette++;
    if (item.Cluster.Misure_Anomale) stats.anomalie++;
    if (item.Cluster.Misure_Validate_Automaticamente) stats.validate++;
    return stats;
  }, { mancanti: 0, corrette: 0, anomalie: 0, validate: 0 });

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
    if (filterValue !== 'all') {
      filters[filterType].all = false;
    } 
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
        all: false,
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
        all: false,
        a: false,
        b: false,
        c: false,
        d: false
      },
      protocolli: {
        all: false,
        g: false,
        ethernet: false,
        apiRestful: false,
        integrazioneCloud: false,
      },
      fornitore: {
        all: false,
        furn1: false,
        furn2: false,
        furn3: false,
        furn4: false,
        furn5: false,
      },
      state: {
        all: false,
        online: false,
        offline: false,
        alert: false
      }
    });
  };
  const clearAreas = () => {
    filters.areas = {
      all: true,
      nord: false,
      sud: false,
      centro: false,
      cnord: false,
      csud: false,
      calabria: false,
      sicilia: false,
      sardegna: false,
    }
  }
  const clearModelli = () => {
    filters.modelli = {
      all: true,
      a: false,
      b: false,
      c: false,
      d: false
    }
  }
  const clearProtocolli = () => {
    filters.protocolli = {
      all: true,
      g: false,
      ethernet: false,
      apiRestful: false,
      integrazioneCloud: false,
      frequenza: false,
      meccanismoAutoprotezione: false
    }
  }
  const clearFornitore = () => {
    filters.fornitore = {
      all: true,
      furn1: false,
      furn2: false,
      furn3: false,
      furn4: false,
      furn5: false,
    }
  }
  const clearState = () => {
    filters.state = {
      all: true,
      online: false,
      offline: false,
      alert: false
    }
  }

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
                checked={filters.areas.all}
                onChange={(e) => {handleFilterChange('areas', 'all', e.target.checked); clearAreas()}}
              /> Tutti
            </label>}
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
                checked={filters.areas.calabria}
                onChange={(e) => handleFilterChange('areas', 'calabria', e.target.checked)}
              /> Calabria
            </label> }
            { showAreas && <label>
              <input 
                type="checkbox" 
                checked={filters.areas.Sicilia}
                onChange={(e) => handleFilterChange('areas', 'Sicilia', e.target.checked)}
              /> Sicilia
            </label> }
            { showAreas && <label>
              <input 
                type="checkbox" 
                checked={filters.areas.sardegna}
                onChange={(e) => handleFilterChange('areas', 'sardegna', e.target.checked)}
              /> Sardegna
            </label> }
          </div>
          <div className="filter-group">
          <div className='filter-group-header' onClick={() => setShowTensione(!showTensione)}>
              <h3>Tensione</h3>
              { showTensione ? <ChevronDown size={24} /> : <ChevronUp size={24} /> }
            </div>
            {showTensione &&
            <label>
              <Form.Switch // prettier-ignore
        id="custom-switch"
        label="AT"
        checked={filters.tensione.at}
                onChange={(e) => handleFilterChange('tensione', 'at', e.target.checked)}
      />
       
            </label>
            }
            {showTensione &&
            <label>
              <Form.Switch // prettier-ignore
        id="custom-switch"
        label="MT"
        checked={filters.tensione.mt}
                onChange={(e) => handleFilterChange('tensione', 'mt', e.target.checked)}
      />
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
                checked={filters.modelli.all}
                onChange={(e) => {handleFilterChange('modelli', 'all', e.target.checked); clearModelli()}}
              /> Tutti
            </label>
            }
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
                checked={filters.protocolli.gsm}
                onChange={(e) => handleFilterChange('protocolli', 'gsm', e.target.checked)}
              /> GSM
            </label>
            }
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli['4g']}
                onChange={(e) => handleFilterChange('protocolli', '4g', e.target.checked)}
              /> 4G
            </label>
            }
            {showProtocolli &&
            <label>
              <input 
                type="checkbox" 
                checked={filters.protocolli['5g']}
                onChange={(e) => handleFilterChange('protocolli', '5g', e.target.checked)}
              /> 5G
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
              <p>{clusterStats.mancanti}</p>
            </div>
            <div className="cluster">
              <h3>CORRETTE AUTOMATICAMENTE</h3>
              <p>{clusterStats.corrette}</p>
            </div>
            <div className="cluster">
              <h3>MISURE DERIVATE DA MISURATORI CON PROBABILI ANOMALIE</h3>
              <p>{clusterStats.anomalie}</p>
            </div>
            <div className="cluster">
              <h3>VALIDATE AUTOMATICAMENTE</h3>
              <p>{clusterStats.validate}</p>
            </div>
          </div>
          <div className="measurements">
            <h2>Misure</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => requestSort('Misuratore')}>Misuratore</th>
                    <th onClick={() => requestSort('Nodo')}>Nodo</th>
                    <th onClick={() => requestSort('Zona')}>Zona</th>
                    <th onClick={() => requestSort('Livello_Tensione')}>Livello Tensione</th>
                    <th onClick={() => requestSort('Modello_Misuratore')}>Modello</th>
                    <th>Protocolli</th>
                    <th onClick={() => requestSort('Anno_Installazione')}>Anno</th>
                    <th onClick={() => requestSort('Fase')}>Fase</th>
                    <th onClick={() => requestSort('Tensione')}>Tensione</th>
                    <th onClick={() => requestSort('Corrente')}>Corrente</th>
                    <th onClick={() => requestSort('Frequenza')}>Frequenza</th>
                    <th onClick={() => requestSort('Potenza_Attiva')}>P. Attiva</th>
                    <th onClick={() => requestSort('Potenza_Reattiva')}>P. Reattiva</th>
                    <th onClick={() => requestSort('Potenza_Apparente')}>P. Apparente</th>
                    <th onClick={() => requestSort('Timestamp')}>Timestamp</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Misuratore}</td>
                      <td>{item.Nodo}</td>
                      <td>{item.Zona}</td>
                      <td>{item.Livello_Tensione}</td>
                      <td>{item.Modello_Misuratore}</td>
                      <td>{item.Protocolli_Supportati.join(", ")}</td>
                      <td>{item.Anno_Installazione}</td>
                      <td>{item.Fase}</td>
                      <td>{item.Tensione.toFixed(3)}</td>
                      <td>{item.Corrente.toFixed(3)}</td>
                      <td>{item.Frequenza.toFixed(3)}</td>
                      <td>{item.Potenza_Attiva.toFixed(3)}</td>
                      <td>{item.Potenza_Reattiva.toFixed(3)}</td>
                      <td>{item.Potenza_Apparente.toFixed(3)}</td>
                      <td>{new Date(item.Timestamp).toLocaleString()}</td>
                      <td>
                        <button>Details</button>
                        <button>Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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