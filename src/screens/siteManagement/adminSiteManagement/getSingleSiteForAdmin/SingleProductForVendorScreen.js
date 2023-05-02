import React, { useEffect, useState } from "react";
import MainScreen from "../../../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	authHeaderForVendor,
	deleteProductByVendor,
	updateProductByVendor,
} from "../../../../actions/productManagementActions/productActions";
import ErrorMessage from "../../../../components/ErrorMessage";
import Loading from "../../../../components/Loading";
import swal from "sweetalert";
import "./singleProduct.css";
import { API_ENDPOINT } from "../../../../config";

function SingleProductForVendorScreen({ match, history }) {
	const [vendorEmail, setVendorEmail] = useState();
	const [title, setTitle] = useState();
	const [category, setCategory] = useState();
	const [productBrand, setProductBrand] = useState();
	const [productCode, setProductCode] = useState();
	const [description, setDescription] = useState();
	const [picURL, setPicUrl] = useState();
	const [price, setPrice] = useState();
	const [ingredients, setIngredients] = useState();
	const [usage, setUsage] = useState();
	const [warnings, setWarnings] = useState();
	const [discountNote, setDiscountNote] = useState();
	const [discountPrice, setDiscountPrice] = useState();
	const [quantity, setQuantity] = useState();
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();

	const productUpdateByVendor = useSelector((state) => state.productUpdateByVendor);
	const { loading, error } = productUpdateByVendor;

	const productDeleteByVendor = useSelector((state) => state.productDeleteByVendor);
	const { loading: loadingDelete, error: errorDelete } = productDeleteByVendor;

	const vendor_Login = useSelector((state) => state.vendor_Login);
	const { vendorInfo } = vendor_Login;

	const resetHandler = () => {
		setTitle("");
		setCategory("");
		setProductBrand("");
		setProductCode("");
		setDescription("");
		setPrice();
		setIngredients("");
		setUsage("");
		setWarnings("");
		setDiscountNote("");
		setDiscountPrice();
		setQuantity();
	};

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteProductByVendor(id));
					swal({
						title: "Success!",
						text: "Deleted Product Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});

					history.push("/vendor-products");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Note",
					type: "error",
				});
			});
	};

	const postDetails = (pics) => {
		if (pics === "https://res.cloudinary.com/dfmnpw0yp/image/upload/v1679235307/assets/tsuh9f6v1reihgqxwxrz.ico") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "vendorProducts");
			data.append("cloud_name", "dfmnpw0yp");
			fetch("https://api.cloudinary.com/v1_1/dfmnpw0yp/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPicUrl(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	useEffect(() => {
		if (vendorInfo != null) {
			const fetching = async () => {
				const { data } = await axios.get(`${API_ENDPOINT}/items/products/vendor/product/get/${match.params.id}`, {
					headers: authHeaderForVendor(),
				});
				setVendorEmail(data.vendorEmail);
				setTitle(data.title);
				setCategory(data.category);
				setProductBrand(data.productBrand);
				setProductCode(data.productCode);
				setDescription(data.description);
				setPicUrl(data.picURL);
				setPrice(data.price);
				setIngredients(data.ingredients);
				setUsage(data.usage);
				setWarnings(data.warnings);
				setDiscountNote(data.discountNote);
				setDiscountPrice(data.discountPrice);
				setQuantity(data.quantity);
			};

			fetching();
		}
	}, [match.params.id, vendorInfo]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProductByVendor(
				match.params.id,
				vendorEmail,
				title,
				category,
				productBrand,
				productCode,
				description,
				picURL,
				price,
				ingredients,
				usage,
				warnings,
				discountNote,
				discountPrice,
				quantity
			)
		);
		if (
			!vendorEmail ||
			!title ||
			!category ||
			!productBrand ||
			!productCode ||
			!description ||
			!picURL ||
			!price ||
			!ingredients ||
			!usage ||
			!warnings ||
			!discountNote ||
			!discountPrice ||
			!quantity
		)
			return;

		resetHandler();

		swal({
			title: "Success !!!",
			text: "Product Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/vendor-products";
		}, 2000);
	};
	if (vendorInfo) {
		return (
			<div className="productEditBg">
				<br></br>
				<MainScreen title="Edit Your Product">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/vendor-products"
					>
						{" "}
						Back to product List
					</Button>
					<br></br>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							paddingLeft: 25,
							paddingRight: 25,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<div className="productContainer">
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{loading && <Loading />}
							</div>
							<Row className="ProductContainer">
								<Col md={6}>
									<Form onSubmit={updateHandler}>
										{loadingDelete && <Loading />}
										{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
										{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
										<Form.Group controlId="productFormBasicVendorEmail">
											<Form.Label>Vendor Email</Form.Label>
											<Form.Control
												type="email"
												value={vendorEmail}
												onChange={(e) => setVendorEmail(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicProductTitle">
											<Form.Label>Product Name</Form.Label>
											<Form.Control
												type="text"
												value={title}
												placeholder="Enter Title"
												onChange={(e) => setTitle(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicCategory">
											<Form.Label>Product Category</Form.Label>
											<Form.Control
												type="text"
												value={category}
												placeholder="Enter Product Category"
												onChange={(e) => setCategory(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicBrand">
											<Form.Label>Product Brand</Form.Label>
											<Form.Control
												type="text"
												value={productBrand}
												placeholder="Enter Product Brand"
												onChange={(e) => setProductBrand(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicCode">
											<Form.Label>Product Code</Form.Label>
											<Form.Control
												type="text"
												value={productCode}
												placeholder="Enter Product Code"
												onChange={(e) => setProductCode(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicDescription">
											<Form.Label>Product Description</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={description}
												placeholder="Enter Product Description"
												onChange={(e) => setDescription(e.target.value)}
												required
												rows={7}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicPrice">
											<Form.Label>Product Price</Form.Label>
											<Form.Control
												type="text"
												value={price}
												placeholder="Enter Product Price"
												onChange={(e) => setPrice(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicIngredients">
											<Form.Label>Product Ingredients</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={ingredients}
												placeholder="Enter Product Ingredients"
												onChange={(e) => setIngredients(e.target.value)}
												required
												rows={3}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicUsage">
											<Form.Label>Product Usage</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={usage}
												placeholder="Enter Product Usage"
												onChange={(e) => setUsage(e.target.value)}
												required
												rows={2}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicWarnings">
											<Form.Label>Product Warnings</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={warnings}
												placeholder="Enter Product Warnings"
												onChange={(e) => setWarnings(e.target.value)}
												required
												rows={3}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicDiscountNote">
											<Form.Label>Discount Note</Form.Label>
											<textarea
												style={{
													width: "100%",
													fontSize: "16px",
													borderRadius: "5px",
												}}
												value={discountNote}
												placeholder="Enter Discount Note"
												onChange={(e) => setDiscountNote(e.target.value)}
												required
												rows={2}
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicDiscountPrice">
											<Form.Label>Discount Price</Form.Label>
											<Form.Control
												type="text"
												value={discountPrice}
												placeholder="Enter Discount Price"
												onChange={(e) => setDiscountPrice(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										<Form.Group controlId="productFormBasicQuantity">
											<Form.Label>Quantity</Form.Label>
											<Form.Control
												type="text"
												value={quantity}
												placeholder="Enter Quantity"
												onChange={(e) => setQuantity(e.target.value)}
												required
											/>
										</Form.Group>
										<br></br>
										{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
										<Form.Group controlId="pic">
											<Form.Label>Product Picture</Form.Label>
											&emsp;
											<input
												type="file"
												accept="image/*"
												id="product-pic"
												onChange={(e) => postDetails(e.target.files[0])}
											/>
										</Form.Group>
										<br></br>
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Update Product
										</Button>
										&emsp;
										<Button
											variant="danger"
											onClick={deleteHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Delete Product
										</Button>
										&emsp;
									</Form>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<img
										src={picURL}
										alt={title}
										className="profilePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 25,
											background: "white",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
							</Row>
							<br></br>
						</div>
					</Card>
					<br></br>
				</MainScreen>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}

export default SingleProductForVendorScreen;
