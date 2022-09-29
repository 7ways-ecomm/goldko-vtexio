import React, {
    useRef,
    useMemo,
    useState,
    useEffect,
    useCallback,
    useLayoutEffect,
} from "react";

import {
    Circle,
    Marker,
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    useLoadScript,
} from "@react-google-maps/api";

import { 
    Spinner 
} from 'vtex.styleguide';

import Geocode from "react-geocode";

import style from "./styles.css";
import defaults from "./defaults";

const mapContainerStyle = {
    height: "600px",
    width: "100%",
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: -23.1524536,
    lng: -46.5906947,
};
var zoom = 4;

const circle = {
    lat: -23.1524536,
    lng: -46.5906947,
    radius: 100000000000,
    strokeColor: "#ff0000",
};

var fim = false;
var map = {};
var bounds = {};
var markers = [];
var circles = [];
var myMarker = [];
var allStores = [];
var storeIntoBounds = [];

function OurStores() {
    const [cep, setCep] = useState("");
    const [raio, setRaio] = useState(0);
    const [stores, setStores] = useState("");
    const [fetchingStores, setFetchingStores] = useState(Boolean);

    const mapRef = useRef();
    const onMapLoad = useCallback((el) => {
        mapRef.current = el;
        map = el;

        fetchAllStores();
    });

    // Input de Busca
    const searchHandler = (ev) => {
        setCep(ev.currentTarget.parentNode.querySelector("#cep").value);
        setRaio(ev.currentTarget.parentNode.parentNode.querySelector("#raio").value);
    }

    // Input de Busca
    useEffect(() => {
        if (cep == "") return;
        console.log("cep -> ", cep);
        Geocode.setApiKey(defaults.google.maps.key);
        Geocode.setLanguage("pt-BR");
        Geocode.fromAddress(cep).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                circle.lat = lat;
                circle.lng = lng;

                bounds.setMap(null);
                bounds = new window.google.maps.Circle({
                    map: map,
                    fillOpacity: 0,
                    strokeOpacity: .0,
                    fillColor: '#fff',
                    strokeColor: '#000',
                    center: { lat: lat, lng: lng },
                    radius: raio * 1000,
                });

                markers.forEach(marker => marker.setMap(null));

                if (myMarker.length > 0) myMarker[0].setMap(null);
                myMarker.push(new window.google.maps.Marker({
                    position: {lat: parseFloat(lat), lng: parseFloat(lng)},
                    zIndex: 99999999,
                    map: map
                }));
                mapRef.current.panTo({
                    lat: parseFloat(lat), 
                    lng: parseFloat(lng)
                });
                mapRef.current.setZoom(13);

                storeIntoBounds = [];
                const allStores = JSON.parse(localStorage.getItem("stores"));
                
                Object.keys(allStores).forEach(i => {
                    if (bounds.getBounds().contains({
                        lat: parseFloat(allStores[i].latitude),
                        lng: parseFloat(allStores[i].longitude)
                    })) {
                        let marker = new window.google.maps.Marker({
                            position: { 
                                lat: parseFloat(allStores[i].latitude), 
                                lng: parseFloat(allStores[i].longitude)
                            },
                            map: map
                        })
                        markers.push(marker);

                        let content = `
                            <div class="item-map">
                                <div style="position:relative; padding:30px; border-radius:5px;">
                                    <div><h3>${allStores[i].razaoSocial}</h3></div>
                                    <p>${allStores[i].endereco}</p>
                                    <ul style="
                                        list-style: none;
                                        padding: 0;
                                    ">
                                        <li>${allStores[i].telefone}</li>
                                    </ul>
                                </div>
                            </div>`;
        
                        var infowindow = new google.maps.InfoWindow();
        
                        google.maps.event.addListener(marker, 'click', (function (marker, content) {
                            return function () {
                                infowindow.setContent(content);
                                infowindow.open(map, marker);
                            }
                        })(marker, content));

                        storeIntoBounds.push(allStores[i]);
                    }
                });
                setStores(storeIntoBounds);
            },
            error => {
                console.error(error);
            }
        )
    }, [cep, raio]);

    const fetchAllStores = async () => {
        let rangeFinal = 99;
        let rangeInitial = 0;
        const locatedStores = localStorage.getItem("stores");
        let url = "/api/dataentities/OE/search?_fields=_all";
        let settings = {
            method: "GET",
            timeout: 0,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.vtex.ds.v10+json",
                "REST-Range": "resources=",
                "x-vtex-api-appKey": defaults.vtex.appKey,
                "x-vtex-api-appToken": defaults.vtex.appToken
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false
        };

        if (locatedStores == null) {
            setFetchingStores(true);

            let i = 0;
            while (!fim) {
                settings.headers["REST-Range"] = "resources=" + rangeInitial + "-" + rangeFinal;
    
                rangeFinal = rangeFinal + 100;
                rangeInitial = rangeInitial + 100;
                
                let data = await (await fetch(url, settings)).json();
    
                Object.keys(data).forEach(i => {allStores.push(data[i])});
    
                i = ++i;
                if (i == 10 || data.length == 0) fim = true;
                console.log(allStores);
            }

            localStorage.setItem("stores", JSON.stringify(allStores));
            setFetchingStores(false);
            initialStores();
        } else {
            initialStores();
        }
    }

    const initialStores = () => {
        if (circles.length == 1) circles[0].setMap(null);
        bounds = new window.google.maps.Circle({
            map: map,
            fillColor: '#fff',
            fillOpacity: 0,
            strokeColor: '#000',
            strokeOpacity: .0,
            center: { lat: circle.lat, lng: circle.lng },
            radius: circle.radius,
        })
        circles.push(bounds);

        storeIntoBounds = [];
        const allStores = JSON.parse(localStorage.getItem("stores"));

        console.log("allStores: ", allStores);
        Object.keys(allStores).forEach(i => {
            if (bounds.getBounds().contains({ lat: parseFloat(allStores[i].latitude), lng: parseFloat(allStores[i].longitude) })) {
                let marker = new window.google.maps.Marker({
                    position: { lat: parseFloat(allStores[i].latitude), lng: parseFloat(allStores[i].longitude) },
                    map: map
                });
                markers.push(marker);

                let content = `
                    <div class="item-map">
                        <div style="position:relative; padding:30px; border-radius:5px;">
                            <div><h3>${allStores[i].razaoSocial}</h3></div>
                            <p>${allStores[i].endereco}</p>
                            <ul style="
                                list-style: none;
                                padding: 0;
                            ">
                                <li>${allStores[i].telefone} </li>
                            </ul>
                        </div>
                    </div>`;

                let infowindow = new google.maps.InfoWindow();

                google.maps.event.addListener(marker, 'click', (function (marker, content) {
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker, content));

                storeIntoBounds.push(allStores[i]);
            }
        });
        setStores(storeIntoBounds);
    }

    // Renderiza a estrutura de HTML novamente quando carregar as lojas
    useEffect(() => {}, [stores]);
    useEffect(() => {}, [fetchingStores]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: defaults.google.maps.key,
    })

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <>
            {
                fetchingStores ? 
                    <>
                        <div className={style.overlayFetchingStores}></div>
                        <div className={style.modalFetchingStores}>
                            <Spinner size="18" color="#1675bf" />
                            <p>Carregando as nossas lojas.</p>
                        </div>
                    </>
                : null
            }
            <div className={style.main}>
                <div>
                    <div className={style.inputGroup}>
                        <h1>Nossas Lojas</h1>
                        <p>Digite seu CEP, Cidade ou Estado para encontrar a GoldKo mais próxima de você!</p>
                        <div className={style.inputGroupSearch}>
                            <input id="cep" className={style.cep} type="text" />
                            <div className={style.inputGroupRaio}>
                                <span>Raio de</span>
                                <input id="raio" size="1" type="number" />
                                <span>Km</span>
                            </div>
                        </div>
                        <button className={style.search} onClick={searchHandler}>Buscar</button>
                    </div>
                    <GoogleMap
                        zoom={zoom}
                        center={center}
                        onLoad={onMapLoad}
                        options={options}
                        mapContainerStyle={mapContainerStyle} />
                </div>

                <div className={style.cityCards}>
                    {stores != "" ?
                        Object.keys(stores).map(i => {
                            return (
                                <div className={style.cityCard}>
                                    { stores[i].dataEntityId == "OE" ? 
                                        <span className={style.flag}>Revenda</span>
                                    :
                                        <span className={style.flag}>Loja Oficial</span>}
                                    <p className={style.Title}>{stores[i].LOJA}</p>
                                    <p>{stores[i].CIDADE}</p>
                                    <p className={style.Endereco}>{stores[i].ENDERECO}</p>
                                    <p className={style.Cep}>CEP: {stores[i].CEP}</p>
                                    <div className={style.ContactPhones}>
                                        <span>{stores[i].TELEFONE}</span>
                                    </div>
                                </div>
                            )
                        })
                        : null}
                </div>
            </div>
        </>
    )
}

export default OurStores