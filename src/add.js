import axios from "axios";
import { add } from "./api/products";
/* eslint-disable linebreak-style */
const addProduct = {
    async render() {
        return /* html */`
        <form id = "form_add" method = "POST">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" class="form-control" id="name_product" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">image</label>
                <input type="file" class="form-control" id="img_product">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Price</label>
                <input type="number" class="form-control" id="price_product">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Desc</label>
                <textarea class="form-control" id="desc_product" rows="3"></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
      </form>
        `;
    },
    afterRender() {
        const formAdd = document.querySelector("#form_add");
        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dkpulhfe7/image/upload";
        const CLOUDINARY_PRESET = "mobctept";
        formAdd.addEventListener("submit", async (e) => {
            e.preventDefault();
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
        });
    },
};
export default addProduct;
