import axios from "axios";
import { get, update } from "./api/products";

/* eslint-disable linebreak-style */
const editProduct = {
    async render(id) {
        const { data } = await get(id);
        return /* html */`
        <form id="form_edit" method="POST">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" class="form-control" id="name_product" value ="${data.name}" >
        
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">image</label>
                <input type="file" class="form-control" id="img_product"  >
                <img width="200px" src="${data.img}" alt="" id="img_privew">
        
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">price</label>
                <input type="number" class="form-control" id="price_product" value ="${data.price}">
        
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">desc</label>
                <textarea class="form-control" id="desc_product" rows="3">${data.desc}</textarea>
        
            
            <button type="submit" class="btn btn-primary">Submit</button>
  </form>
        `;
    },
    afterRender(id) {
        const formEdit = document.querySelector("#form_edit");
        const imgPrivew = document.querySelector("#img_privew");
        const ingProduct = document.querySelector("#img_product");
        let img_link = "";
        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dkpulhfe7/image/upload";
        const CLOUDINARY_PRESET = "mobctept";
        ingProduct.addEventListener("change", (e) => {
            imgPrivew.src = URL.createObjectURL(e.target.files[0]);
        });
        formEdit.addEventListener("submit", async (e) => {
            e.preventDefault();
            const file = ingProduct.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET);
                const { data } = await axios.post(CLOUDINARY_API, formData, {
                    headers: {
                        "Content-Type": "application/form-data",
                    },
                });
                img_link = data.url;
            }
            update({
                id,
                name: document.querySelector("#name_product").value,
                img: img_link || imgPrivew.src,
                price: document.querySelector("#price_product").value,
                desc: document.querySelector("#desc_product").value,
            });
        });
    },
};
export default editProduct;
