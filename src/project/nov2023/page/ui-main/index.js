import BaseUi from "../base-ui";
import {Box, Grid, Table, TableBody, TableCell, TableRow, Typography, useTheme} from "@mui/material";
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import L, {divIcon} from "leaflet";
import 'leaflet/dist/leaflet.css';
import data from "../../data/data.json";
import {useEffect, useRef, useState} from "react";
import MapMarkerPurple from "../../../../assets/map-marker-purple.png"
import * as ReactDOMServer from "react-dom/server";
import ChatComponent from "./chat-component";

const UiMain = () => {
    const theme = useTheme()
    const styles = {
        title: {
            fontSize: "20px"
        },
        grid: {
            mt: 1,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "auto",
        },
        paper: {
            p: 2,
            width: '250px',
            textTransform: 'none'
        },
        icon: {
            fontSize: 60,
            color: theme.palette.primary.main
        },
        polygonSelected: {
            opacity: 0.5,
            weight: 1,
            color: 'red'
        },
        polygonUnSelected: {
            opacity: 0.5,
            weight: 1,
            color: 'blue'
        },
        tableFirstCell: {
            fontWeight:'bold'
        }
    }

    const chatWidth = 750
    const geojsonRef = useRef()
    const [featureId, setFeatureId] = useState(null)
    const [map, setMap] = useState(null)
    const [block, setBlock] = useState(null)

    useEffect(() => {
        if (!featureId || !geojsonRef.current) return;
        geojsonRef.current.eachLayer((layer) => {
            if (layer["feature"]["properties"]["name"] === featureId) {
                layer.setStyle(styles.polygonSelected)
            } else {
                layer.setStyle(styles.polygonUnSelected)
            }
        })
        geojsonRef.current = data["blocks"].features.filter((district) => {
            return district.properties.name === featureId;
        });
    }, [featureId]);

    const setBlocksLabel = ({properties}, latlng) => {
        return L.marker(latlng, {
            icon: divIcon({
                html: properties.name,
                className: "icon"
            })
        });
    };

    const setWellMarker = ({properties}, latlng) => {
        return L.marker(latlng, {
            icon: new L.Icon({
                iconUrl: MapMarkerPurple,
                iconSize: [32, 32], // Size of the icon
            })
        });
    };

    const handleLayerBlock = (feature, layer) => {
        const popupContent = ReactDOMServer.renderToString(
            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Block Name</TableCell>
                            <TableCell>: {feature["properties"]["name"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Status</TableCell>
                            <TableCell>: {feature["properties"]["status"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Operator</TableCell>
                            <TableCell>: {feature["properties"]["operator"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Number of well</TableCell>
                            <TableCell>: {feature["properties"]["num_well"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Square (km)</TableCell>
                            <TableCell>: {feature["properties"]["sq_km"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Reserve</TableCell>
                            <TableCell>: {feature["properties"]["reserve"]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
        layer.bindPopup(popupContent);

        layer.on({
            click: (e) => {
                setFeatureId(feature.properties.name)
                setBlock(feature)
            }
        });
    }

    const handleLayerWell = (feature, layer) => {
        const popupContent = ReactDOMServer.renderToString(
            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Well Name</TableCell>
                            <TableCell>: {feature["properties"]["name"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Orientation</TableCell>
                            <TableCell>: {feature["properties"]["orient"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Status</TableCell>
                            <TableCell>: {feature["properties"]["status"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Purpose</TableCell>
                            <TableCell>: {feature["properties"]["purpose"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Type</TableCell>
                            <TableCell>: {feature["properties"]["type"]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={styles.tableFirstCell}>Block</TableCell>
                            <TableCell>: {feature["properties"]["block"]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
        layer.bindPopup(popupContent);
    }

    return (<BaseUi title={<Typography sx={styles.title}>Dashboard</Typography>}>
        <Grid container>
            <Grid item xs={10.3}>
                <MapContainer
                    style={{
                        position: "absolute",
                        width: `calc(100% - ${chatWidth}px)`,
                        height: `calc(100% - 70px)`,
                        zIndex: -1,
                    }}
                    center={data["initial"]["center"]}
                    zoom={data["initial"]["zoom"]}
                    ref={setMap}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {map && (
                        <GeoJSON ref={geojsonRef} data={data["blocks"]} style={styles.polygonUnSelected}
                                 onEachFeature={handleLayerBlock}/>
                    )}
                    <GeoJSON data={data["blocksLabel"]} pointToLayer={setBlocksLabel}/>
                    <GeoJSON data={data["wells"]} pointToLayer={setWellMarker} onEachFeature={handleLayerWell}/>
                </MapContainer>
            </Grid>
            <Grid item>
                <Box style={{
                    position: "absolute",
                    left: `calc(100% - ${chatWidth}px)`,
                }} sx={{p: 2}}>
                    <ChatComponent/>
                </Box>
            </Grid>
        </Grid>
    </BaseUi>)
}
export default UiMain