import { ChevronDown, ChevronUp, CircleX } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './App.css';
import myImage from "./assets/graph.svg";
import { default as measurementsData } from './complete1.json';
import { default as measurementsData2 } from './complete2.json';
import GraphModule from './components/GraphModule';
import ProgressBarLabel from "./ProgressBar";

function Misuratori() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showAreas, setShowAreas] = useState(true);
  const [showTensione, setShowTensione] = useState(true);
  const [showModelli, setShowModelli] = useState(true);
  const [showProtocolli, setShowProtocolli] = useState(true);
  const [showFurn, setShowFurn] = useState(true);
  const [showState, setShowState] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [groupedNodo, setGroupedNodo] = useState({});
  /*  useEffect(() => {
    getManutenzioni();
  }, [manutenzioni]); */
  const getManutenzioni = () => {
    const man = [];
    filteredData.forEach((item, index) => {
      if (item.Operazioni_Pianificate && item.Operazioni_Pianificate?.Operazione === 'Manutenzione') {
        man.push(item);
      }
    })
    return man;
  };
  /* useEffect(() => {
    getSostituzioni();
  }, [sostituzioni]); */
  const getSostituzioni = () => {
    const sost = [];
    filteredData.forEach((item, index) => {
      if (item.Operazioni_Pianificate && item.Operazioni_Pianificate?.Operazione === 'Sostituzione') {
        sost.push(item);
      }
    })
    return sost;
  };
  const [manutenzioni, setManutenzioni] = useState(getManutenzioni());
  const [sostituzioni, setSostituzioni] = useState(getSostituzioni());
  const [selectedItem, setSelectedItem] = useState(null);
  //const [clusterStats, setClusterStats] = useState(null);
  let [selectedCard, setSelectedCard] = useState(0);
  let todayDate = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",  // Full day name (e.g., "Mercoledì")
    year: "numeric",  // 4-digit year
    month: "long",    // Full month name (e.g., "Febbraio")
    day: "2-digit",   // 2-digit day
    hour: "numeric",  // Hour in 12-hour format
    minute: "2-digit", // 2-digit minute
  }).format(new Date());
  let countdown = "05:00";

  const onSelectRow = (index, item) => {
    if (selectedRow === index) {
      setSelectedRow(null);
      setSelectedItem(null);
      return;
    }
    setSelectedRow(index);
    setSelectedItem(item);
  }

  const groupByNodo = (data) => {
    const groupedByNodo = data.reduce((acc, item) => {
      if (!acc[item.Nodo]) {
        acc[item.Nodo] = [];
      }
      if (item.Operazioni_Pianificate?.Operazione === 'Manutenzione')
        acc[item.Nodo].push(item);
      return acc;
    }, {});
    console.log(groupedByNodo);
    setGroupedNodo(groupedByNodo);
  }




  const [currentDate, setCurrentDate] = useState(todayDate);
  const [currentCountdown, setCurrentCountdown] = useState(countdown);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Intl.DateTimeFormat("it-IT", {
        weekday: "long",  // Full day name (e.g., "Mercoledì")
        year: "numeric",  // 4-digit year
        month: "long",    // Full month name (e.g., "Febbraio")
        day: "2-digit",   // 2-digit day
        hour: "numeric",  // Hour in 12-hour format
        minute: "2-digit", // 2-digit minute
      }).format(new Date());
      setCurrentDate(newDate);

      const [minutes, seconds] = currentCountdown.split(':').map(Number);
      if (minutes === 0 && seconds === 0) {
        setCurrentCountdown('05:00');
        setSelectedCard(0);
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
            Operazioni_Pianificate: device.Operazioni_Pianificate,
            Fase: device.Fase,
            ...latestMeasurement,
            ...device,
            Cluster: device.Cluster
          };
        });
        const transformedData2 = measurementsData2.misuratori.map(device => {
          const latestMeasurement2 = device.Grandezze[device.Grandezze.length - 1];
          return {
            Misuratore: device.Misuratore,
            Nodo: device.Nodo,
            Zona: device.Zona,
            Livello_Tensione: device.Livello_Tensione,
            Modello_Misuratore: device.Modello_Misuratore,
            Protocolli_Supportati: device.Protocolli_Supportati,
            Anno_Installazione: device.Anno_Installazione,
            Prezzo_Unitario: device.Prezzo_Unitario,
            Operazioni_Pianificate: device.Operazioni_Pianificate,
            Fase: device.Fase,
            ...latestMeasurement2,
            ...device,
            Cluster: device.Cluster
          };
        });

        const randomNum = Math.random() < 0.5 ? 0 : 1;

        const data = randomNum === 0 ? transformedData : transformedData2;
        setData(data);
        setFilteredData(data);

        clusterStats = data.reduce((stats, item) => {
          if (item.Stato === 'online') stats.online++;
          if (item.Stato === 'offline') stats.offline++;
          if (item.Stato === 'alert') stats.alert++;
          if (item.Operazioni_Pianificate && item.Operazioni_Pianificate?.Operazione === 'Manutenzione') stats.manutenzione++;
          return stats;
        }, { alert: 0, offline: 0, manutenzione: 0, online: 0 });

        groupByNodo(data);

        return;
      }
      let totalSeconds = minutes * 60 + seconds - 1;
      const newMinutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      const newSeconds = (totalSeconds % 60).toString().padStart(2, '0');
      setCurrentCountdown(`${newMinutes}:${newSeconds}`);
      setManutenzioni(getManutenzioni());
      setSostituzioni(getSostituzioni());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentCountdown]);



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
    tens: false,
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
  
  const [filtersLabel] = useState({
    areas: {
      all: 'Aree zonali: tutte',
      nord: 'Nord',
      sud: 'Sud',
      centro: 'Centro',
      cnord: 'CNord',
      csud: 'CSud',
      calabria: 'Calabria',
      sicilia: 'Sicilia',
      sardegna: 'Sardegna',

    },
    tens: 'Tensione',
    tensione: {
      at: "Tensione: AT",
      mt: "Tensione: MT"
    },
    modelli: {
      all: 'Modelli: tutti',
      a: "Modello A",
      b: "Modello B",
      c: "Modello C",
      d: "Modello D"
    },
    protocolli: {
      all: "Potocolli: tutti",
      g: "4G/5G",
      ethernet: "Ethernet",
      apiRestful: "API RESTful",
      integrazioneCloud: "Integrazione cloud via HTTP/HTTPS"
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
      all: "Stato: tutti",
      online: "Stato: online",
      offline: "Stato: offline",
      alert: "Stato: alert"
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
        Operazioni_Pianificate: device.Operazioni_Pianificate,
        Fase: device.Fase,
        ...latestMeasurement,
        ...device,
        Cluster: device.Cluster
      };
    });
    const transformedData2 = measurementsData2.misuratori.map(device => {
      const latestMeasurement2 = device.Grandezze[device.Grandezze.length - 1];
      return {
        Misuratore: device.Misuratore,
        Nodo: device.Nodo,
        Zona: device.Zona,
        Livello_Tensione: device.Livello_Tensione,
        Modello_Misuratore: device.Modello_Misuratore,
        Protocolli_Supportati: device.Protocolli_Supportati,
        Anno_Installazione: device.Anno_Installazione,
        Prezzo_Unitario: device.Prezzo_Unitario,
        Operazioni_Pianificate: device.Operazioni_Pianificate,
        Fase: device.Fase,
        ...latestMeasurement2,
        ...device,
        Cluster: device.Cluster
      };
    });

    const randomNum = Math.random() < 0.5 ? 0 : 1;

    const data = randomNum === 0 ? transformedData : transformedData2;
    setData(data);
    setFilteredData(data);
    setManutenzioni(getManutenzioni());
    setSostituzioni(getSostituzioni());
    groupByNodo(data);
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

  const setCard = (index) => {
    if (selectedCard === index) {
      setSelectedCard(0);
      selectedCard = 0;
      filterData();
      return;
    }
    setSelectedCard(index);
    selectedCard = index;
    filterData();
  }

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

    result = result.filter(item => {
      if (filters.tens && item.Livello_Tensione === "AT") return true;
      if (!filters.tens && item.Livello_Tensione === "MT") return true;
      return false;
    });


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

    if (selectedCard > 0) {
      result = result.filter(item => {
        if (selectedCard === 1 && item.Stato === 'alert') return true;
        if (selectedCard === 2 && item.Stato === 'offline') return true;
        if (selectedCard === 3 && item.Operazioni_Pianificate && item.Operazioni_Pianificate?.Operazione === 'Manutenzione') return true;
        if (selectedCard === 4 && item.Stato === 'online') return true;
        return false;
      });
    }

    setFilteredData(result);
    setManutenzioni(getManutenzioni());
    setSostituzioni(getSostituzioni());
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate cluster statistics
  let clusterStats = data.reduce((stats, item) => {
    if (item.Stato === 'online') stats.online++;
    if (item.Stato === 'offline') stats.offline++;
    if (item.Stato === 'alert') stats.alert++;
    if (item.Operazioni_Pianificate && item.Operazioni_Pianificate.Operazione === 'Manutenzione') stats.manutenzione++;
    return stats;
  }, { alert: 0, offline: 0, manutenzione: 0, online: 0 });




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
    if (filterValue && filterValue !== 'all') {
      filters[filterType].all = false;
    }
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (filterValue) {
        newFilters[filterType][filterValue] = isChecked;
      } else {
        newFilters[filterType] = isChecked;
      }
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
      tens: false,
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
    <main>
      <aside className="filters">
        <h2>Filtri applicati</h2>
        <button onClick={clearFilters}>Cancella filtri <CircleX size={18} /></button>
        <div className="filter-group">
          <div className='filter-group-header' onClick={() => setShowAreas(!showAreas)}>
            <h3>Area zonali</h3>
            {showAreas ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
          {showAreas &&
            <label>
              <input
                type="checkbox"
                checked={filters.areas.all}
                onChange={(e) => { handleFilterChange('areas', 'all', e.target.checked); clearAreas() }}
              /> Tutti
            </label>}
          {showAreas &&
            <label>
              <input
                type="checkbox"
                checked={filters.areas.nord}
                onChange={(e) => handleFilterChange('areas', 'nord', e.target.checked)}
              /> Nord
            </label>}
          {showAreas &&
            <label>
              <input
                type="checkbox"
                checked={filters.areas.cnord}
                onChange={(e) => handleFilterChange('areas', 'cnord', e.target.checked)}
              /> CNord
            </label>}
          {showAreas && <label>
            <input
              type="checkbox"
              checked={filters.areas.sud}
              onChange={(e) => handleFilterChange('areas', 'sud', e.target.checked)}
            /> Sud
          </label>}
          {showAreas && <label>
            <input
              type="checkbox"
              checked={filters.areas.csud}
              onChange={(e) => handleFilterChange('areas', 'csud', e.target.checked)}
            /> CSud
          </label>}
          {showAreas && <label>
            <input
              type="checkbox"
              checked={filters.areas.calabria}
              onChange={(e) => handleFilterChange('areas', 'calabria', e.target.checked)}
            /> Calabria
          </label>}
          {showAreas && <label>
            <input
              type="checkbox"
              checked={filters.areas.Sicilia}
              onChange={(e) => handleFilterChange('areas', 'Sicilia', e.target.checked)}
            /> Sicilia
          </label>}
          {showAreas && <label>
            <input
              type="checkbox"
              checked={filters.areas.sardegna}
              onChange={(e) => handleFilterChange('areas', 'sardegna', e.target.checked)}
            /> Sardegna
          </label>}
        </div>
        <div className="filter-group">
          <div className='filter-group-header' onClick={() => setShowTensione(!showTensione)}>
            <h3>Tensione</h3>
            {showTensione ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
          {showTensione &&
            <label className='tensione'>
              MT
              <Form.Switch // prettier-ignore
                id="custom-switch"
                label="AT"
                checked={filters.tens}
                onChange={(e) => handleFilterChange('tens', null, e.target.checked)/* {filters.tensione.at = !filters.tensione.at; filters.tensione.mt = !filters.tensione.mt;} */}
              />

            </label>
          }
        </div>
        <div className="filter-group">
          <div className='filter-group-header' onClick={() => setShowModelli(!showModelli)}>
            <h3>Modelli</h3>
            {showModelli ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
          {showModelli &&
            <label>
              <input
                type="checkbox"
                checked={filters.modelli.all}
                onChange={(e) => { handleFilterChange('modelli', 'all', e.target.checked); clearModelli() }}
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
            {showProtocolli ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
          {showProtocolli &&
            <label>
              <input
                type="checkbox"
                checked={filters.protocolli.all}
                onChange={(e) => { handleFilterChange('protocolli', 'gsm', e.target.checked); clearProtocolli() }}
              /> Tutti
            </label>
          }
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
                checked={filters.protocolli['g']}
                onChange={(e) => handleFilterChange('protocolli', 'g', e.target.checked)}
              /> 4G/5G
            </label>
          }
          {showProtocolli &&
            <label>
              <input
                type="checkbox"
                checked={filters.protocolli.ethernet}
                onChange={(e) => handleFilterChange('protocolli', 'ethernet', e.target.checked)}
              /> Ethernet
            </label>
          }
          {showProtocolli &&
            <label>
              <input
                type="checkbox"
                checked={filters.protocolli.apiRestful}
                onChange={(e) => handleFilterChange('protocolli', 'apiRestful', e.target.checked)}
              /> API RESTful
            </label>
          }
          {showProtocolli &&
            <label>
              <input
                type="checkbox"
                checked={filters.protocolli.integrazioneCloud}
                onChange={(e) => handleFilterChange('protocolli', 'integrazioneCloud', e.target.checked)}
              /> Integrazione cloud via HTTP/HTTPS
            </label>
          }

        </div>
        <div className="filter-group">
          <div className='filter-group-header' onClick={() => setShowFurn(!showFurn)}>
            <h3>Fornitore</h3>
            {showFurn ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.fornitore.all}
                onChange={(e) => { handleFilterChange('fornitore', 'all', e.target.checked); clearFornitore() }}
              /> Tutti
            </label>
          }
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.fornitore.furn1}
                onChange={(e) => handleFilterChange('fornitore', 'furn1', e.target.checked)}
              /> Fornitore 1
            </label>
          }
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.fornitore.furn2}
                onChange={(e) => handleFilterChange('fornitore', 'furn2', e.target.checked)}
              /> Fornitore 2
            </label>
          }
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.fornitore.furn3}
                onChange={(e) => handleFilterChange('fornitore', 'furn3', e.target.checked)}
              /> Fornitore 3
            </label>
          }
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.fornitore.furn4}
                onChange={(e) => handleFilterChange('fornitore', 'furn4', e.target.checked)}
              /> Fornitore 4
            </label>
          }
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.fornitore.furn5}
                onChange={(e) => handleFilterChange('fornitore', 'furn5', e.target.checked)}
              /> Fornitore 5
            </label>
          }
        </div>
        <div className="filter-group">
          <div className='filter-group-header' onClick={() => setShowState(!showState)}>
            <h3>Stato</h3>
            {showState ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
          {showState &&
            <label>
              <input
                type="checkbox"
                checked={filters.fornitore.all}
                onChange={(e) => { handleFilterChange('fornitore', 'all', e.target.checked); clearState() }}
              /> Tutti
            </label>
          }
          {showState &&
            <label>
              <input
                type="checkbox"
                checked={filters.state.online}
                onChange={(e) => handleFilterChange('state', 'online', e.target.checked)}
              /> Online
            </label>
          }
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.state.offline}
                onChange={(e) => handleFilterChange('state', 'offline', e.target.checked)}
              /> Offline
            </label>
          }
          {showFurn &&
            <label>
              <input
                type="checkbox"
                checked={filters.state.alert}
                onChange={(e) => handleFilterChange('state', 'alert', e.target.checked)}
              /> Alert
            </label>
          }
        </div>
      </aside>
      <section className="content">
        {/* <StaticExample /> */}
        <div className="date-filter">
          <div className='date-left'>
            <div className="date-today">
              Today: {todayDate}
            </div>
            <div className="next-update">
              Prossimo aggiornamento: {currentCountdown}
            </div>
          </div>
          <div className="select-date">

          </div>
        </div>
        <h3 className='page-title'>Gestione Misuratori</h3>
        <div className="content-reports-child">
                        <h5>Filtri applicati</h5>
                        <div className="applied-filters">
                            {Object.keys(filters).map(filter => {
                               {typeof filters[filter] === 'object' && Object.keys(filters[filter]).map(f => {
                                    return filters[filter][f] && <button key={filter} className="filter">{filtersLabel[filter]}</button>
                                })}

})}
                        </div>
                    </div>
        <h4 className='page-title'>Overview</h4>
        <div className="clusters">
          <div className={"cluster " + (selectedCard && selectedCard === 1 ? 'active' : 'notActive')} onClick={() => { setCard(1) }}>
            <p>{clusterStats.alert}</p>
            <h3>Alert</h3>
            <img src={myImage} alt="Description" width="100%" />
          </div>
          <div className={"cluster " + (selectedCard && selectedCard === 2 ? 'active' : 'notActive')} onClick={() => { setCard(2) }}>
            <p>{clusterStats.offline}</p>
            <h3>Offline</h3>
            <img src={myImage} alt="Description" width="100%" />
          </div>
          <div className={"cluster " + (selectedCard && selectedCard === 3 ? 'active' : 'notActive')} onClick={() => { setCard(3) }}>
            <p>{clusterStats.manutenzione}</p>
            <h3>In Manutezione</h3>
            <img src={myImage} alt="Description" width="100%" />
          </div>
          <div className={"cluster " + (selectedCard && selectedCard === 4 ? 'active' : 'notActive')} onClick={() => { setCard(4) }}>
            <p>{clusterStats.online}</p>
            <h3>Online</h3>
            <img src={myImage} alt="Description" width="100%" />
          </div>
        </div>
        <div className="measurements">
        <div className='header-table'>
              <h2>{selectedCard===1 ? clusterStats.alert : selectedCard===2 ? clusterStats.offline : selectedCard===3 ? clusterStats.manutenzione : selectedCard===4 ? clusterStats.online : ''} {selectedCard===1 ? "alert" : selectedCard===2 ? "offline" : selectedCard===3 ? "in manutenzione" : selectedCard===4 ? "online" : ''}</h2>
              {
                  selectedCard===1 && <p>Sono stati rilevati {clusterStats.alert} misuratori con valori mancanti o fuori scala</p>
              }
              {
                  selectedCard===2 && <p>Sono stati rilevati {clusterStats.offline} misuratori offline</p>
              }
              {
                  selectedCard===3 && <p>Sono stati rilevati {clusterStats.manutenzione} misuratori in manutenzione</p>
              }
              {
                  selectedCard===4 && <p>Sono stati rilevati {clusterStats.online} misuratori online</p>
              }
            </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => requestSort('Misuratore')}>Matricola / Modello</th>
                  <th onClick={() => requestSort('Zona')}>Zona</th>
                  <th onClick={() => requestSort('Nodo')}>Nodo</th>
                  <th onClick={() => requestSort('Stato')}>Stato</th>
                  <th onClick={() => requestSort('Timestamp')}>Ultimo Agg</th>
                  <th onClick={() => requestSort('Operazioni_Pianificate')}>Pianificaz interv</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} onClick={() => onSelectRow(index, item)} className={selectedRow === index ? 'selected' : ''}>
                    <td >{item.Misuratore}</td>
                    <td >{item.Zona}</td>
                    <td >{item.Nodo}</td>
                    <td >{item.Stato}</td>
                    <td >{new Date(item.Timestamp).toLocaleString()}</td>
                    <td >{item.Operazioni_Pianificate?.Operazione}</td>
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
        <h2>{selectedItem ? `Matricola ${selectedItem.Modello_Misuratore}-${selectedItem.Misuratore}` : 'Inspector'}</h2>
        <div className="inspector-btns">
          <Button>Crea Report</Button>
          <Button>Apri segnalazione</Button>
        </div>
        {!selectedItem &&
          <div className="inspector-manutenzioni">
            <span className="title-aside-section">Nodi in manutenzione</span>
            <span style={{ textAlign: "left" }}>Attività di manutenzione sui nodi che possono impattare sullo stato o sulle misure dei misuratori correlati</span>
            <div className="manutenzioni">
              {Object.entries(groupedNodo)?.map(([key, value], i) => {
                return value?.map((node, j) => {
                  return <div key={`${i}-${j}`}>
                    <h3>{node.Zona}</h3>
                    <ProgressBarLabel now={(groupedNodo[key].length / data.length) * 100} />
                  </div>
                  })
                })
              }
            </div>
          </div>
        }

        {!selectedItem && manutenzioni.length > 0 &&
          <div className="inspector-manutenzioni">
            <span className="title-aside-section">Manutenzioni Pianificate</span>
            <div className="manutenzioni">
              {manutenzioni.map((manutenzione, index) => (
                <div key={index} className="manutenzione">
                  <div>
                    <p><b>{manutenzione.Operazioni_Pianificate.Operazione}</b></p>
                    <p>{new Intl.DateTimeFormat("it-IT", {
                      year: "numeric",  // 4-digit year
                      month: "numeric",    // Full month name (e.g., "Febbraio")
                      day: "2-digit",   // 2-digit day
                    }).format(new Date(manutenzione.Operazioni_Pianificate.Data))}
                    </p>
                  </div>
                  <div>
                    <p>Model {manutenzione.Modello_Misuratore}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
        {!selectedItem && sostituzioni.length > 0 &&
          <div className="inspector-manutenzioni">
            <span className="title-aside-section">Attività di sostituzione</span>
            <div className="manutenzioni">
              {sostituzioni.map((sost, index) => (
                <div key={index} className="manutenzione">
                  <div>
                    <p><b>{sost.Operazioni_Pianificate.Operazione}</b></p>
                    <p>{new Intl.DateTimeFormat("it-IT", {
                      year: "numeric",  // 4-digit year
                      month: "numeric",    // Full month name (e.g., "Febbraio")
                      day: "2-digit",   // 2-digit day
                    }).format(new Date(sost.Operazioni_Pianificate.Data))}
                    </p>
                  </div>
                  <div>
                    <p>Model {sost.Modello_Misuratore}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }

        {selectedItem &&
          <div className="inspector-details">
            <h3>Dettaglio</h3>
            <div className="details">
              <div className="detail">
                Modello {selectedItem.Modello_Misuratore}
              </div>
              <div className="detail">
                Tensione {selectedItem.Livello_Tensione}
              </div>
              <div className="detail">
                <b>Protocolli supportati: </b> {selectedItem.Protocolli_Supportati.join(', ')}
              </div>
            </div>
          </div>
        }
        {selectedItem && selectedItem.Grandezze && selectedItem.Grandezze.length > 0 &&
          <div className="inspector-details">
            <h3>Misure</h3>
            <GraphModule selectedItem={filteredData} item={selectedItem}/>
        </div>
        }
      </aside>
    </main>
  );
}

export default Misuratori;