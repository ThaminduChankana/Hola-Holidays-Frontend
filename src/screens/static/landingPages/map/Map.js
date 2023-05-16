import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text } from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { useRef, useState } from "react";

const cent = { lat: 6.9271, lng: 79.8612 };

const Map = () => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyCLCWX5QpCAYmebl2FRbXZMuSuRaER2ggg",
		libraries: ["places"],
	});

	const [map, setMap] = useState(null);
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [distance, setDistance] = useState("");
	const [duration, setDuration] = useState("");
	const [center, setCenter] = useState(cent);

	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [error, setError] = useState("");

	const geolocationAPI = navigator.geolocation;

	const getUserCoordinates = () => {
		if (!geolocationAPI) {
			setError("Geolocation API is not available in your browser!");
		} else {
			geolocationAPI.getCurrentPosition(
				(position) => {
					const { coords } = position;
					setLat(coords.latitude);
					setLng(coords.longitude);
					setCenter({ lat: lat, lng: lng });
				},
				(error) => {
					setError("Something went wrong getting your position!");
				}
			);
		}
	};

	/** @type React.MutableRefObject<HTMLInputElement> */
	const originRef = useRef();
	/** @type React.MutableRefObject<HTMLInputElement> */
	const destiantionRef = useRef();

	if (!isLoaded) {
		return <SkeletonText />;
	}

	async function calculateRoute() {
		if (originRef.current.value === "" || destiantionRef.current.value === "") {
			return;
		}
		// eslint-disable-next-line no-undef
		const directionsService = new google.maps.DirectionsService();
		const results = await directionsService.route({
			origin: originRef.current.value,
			destination: destiantionRef.current.value,
			// eslint-disable-next-line no-undef
			travelMode: google.maps.TravelMode.DRIVING,
		});
		setDirectionsResponse(results);
		setDistance(results.routes[0].legs[0].distance.text);
		setDuration(results.routes[0].legs[0].duration.text);
	}

	function clearRoute() {
		setDirectionsResponse(null);
		setDistance("");
		setDuration("");
		originRef.current.value = "";
		destiantionRef.current.value = "";
	}

	return (
		<div>
			{error}
			<Flex position="relative" flexDirection="column" alignItems="center" h="100vh">
				<Box position="absolute" left={0} top={0} h="100%" w="100%">
					<GoogleMap
						center={center}
						zoom={7}
						mapContainerStyle={{ width: "100%", height: "100%" }}
						onLoad={(map) => setMap(map)}
					>
						<Marker position={center} />
						{directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
					</GoogleMap>
				</Box>
				<Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md" zIndex="1">
					<HStack spacing={2} justifyContent="space-between">
						<Box flexGrow={1}>
							<Autocomplete>
								<Input type="text" placeholder="Origin" ref={originRef} />
							</Autocomplete>
						</Box>
						<Box flexGrow={1}>
							<Autocomplete>
								<Input type="text" placeholder="Destination" ref={destiantionRef} />
							</Autocomplete>
						</Box>

						<ButtonGroup>
							<Button colorScheme="green" type="submit" onClick={calculateRoute}>
								Calculate Distance
							</Button>
							<IconButton aria-label="center back" icon={<FaTimes />} onClick={clearRoute} />
						</ButtonGroup>
					</HStack>
					<HStack spacing={4} mt={4} justifyContent="space-between">
						<Text>Distance: {distance} </Text>
						<Text>Duration: {duration} </Text>
						<IconButton
							aria-label="center back"
							icon={<FaLocationArrow />}
							isRound
							onClick={() => {
								map.setZoom(15);
								getUserCoordinates();
							}}
						/>
					</HStack>
				</Box>
			</Flex>
		</div>
	);
};

export default Map;
