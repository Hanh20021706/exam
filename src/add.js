import axios from "axios";
import $ from "jquery";
import validate from "jquery-validation";
import { add } from "./api/products";
/* eslint-disable linebreak-style */
const addProduct = {
    async render() {
        return /* html */`
        <form id="form_add" method="POST">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" class="form-control" id="name_product" name="name_product">
         
             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">image</label>
                <input type="file" class="form-control" id="img_product"  >
         
             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">price</label>
                <input type="number" class="form-control" id="price_product" name="price_product">
         
             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">desc</label>
                <textarea class="form-control" id="desc_product" rows="3" name="desc_product"></textarea>
         
            
            <button type="submit" class="btn btn-primary">Submit</button>
      </form>
        `;
    },
    afterRender() {
        const formAdd = $("#form_add");
        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dkpulhfe7/image/upload";
        const CLOUDINARY_PRESET = "mobctept";
        formAdd.validate({
            rules: {
                name_product: {
                    required: true,
                    minlength: 10,
                },
                // price_product: {
                //     required: true,
                //     step: 10,
                // },
                desc_product: {
                    required: true,
                    minlength: 10,
                },
            },
            messgaes: {
                name_product: {
                    required: "Không để trống trường này!",
                    minlength: "Ít nhất phải trên 10 ký tự",
                },
                // price_product: {
                //     required: "Không để trống trường này!",
                //     minlength: "nhap so duong",
                // },
                desc_product: {
                    required: "Không để trống trường này!",
                    minlength: "Ít nhất phải trên 10 ký tự",
                },
            },
            submitHandler: () => {
                async function handleAddProduct() {
                    const file = document.querySelector("#img_product").files[0];
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", CLOUDINARY_PRESET);
                    const { data } = await axios.post(CLOUDINARY_API, formData, {
                        headers: {
                            "Content-Type": "application/form-data",
                        },
                    });
                    add({
                        name: document.querySelector("#name_product").value,
                        img: data.url,
                        price: document.querySelector("#price_product").value,
                        desc: document.querySelector("#desc_product").value,
                    });
                }
                handleAddProduct();
            },
        });
    },
};
export default addProduct;
