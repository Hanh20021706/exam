/* eslint-disable linebreak-style */
import axios from "axios";
import $ from "jquery";
import validate from "jquery-validation";
import { getAll } from "../api/cate";
import { add } from "../api/products";
/* eslint-disable linebreak-style */
const addProduct = {
    async render() {
        const { data } = await getAll();
        return /* html */`
        <form id = "form_add" method = "POST">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">name</label>
                <input type="text" class="form-control" id="name_product" name = "name_product">
                
            </div>
            
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">img</label>
                <input type="file" class="form-control" id="img_product" name = "img_product">
                
            </div>
            
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">price</label>
                <input type="number" class="form-control" id="price_product" name = "price_product">
                
            </div>
            
            
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">desc</label>
                <textarea class="form-control" id="desc_product"  rows="3"></textarea>
                
            </div>
            <div class="mb-3">
                <select class="form-select" aria-label="Default select example" id = "cate_product"> 
                ${data.map((cate) => `
                     
                    <option value="${cate.id}" >${cate.name}</option>
                    
                    `).join("")}
                  
                </select>
                
            </div>
           
            <button type="submit" class="btn btn-primary">Submit</button>
      </form>
        `;
    },
    afterRender() {
        const formAdd = $("#form_add");
        const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dkpulhfe7/image/upload";
        const CLOUDINARY_PRESET = "votxzxvk";
        formAdd.validate({
            rules: {
                name_product: {
                    required: true,
                    minlength: 5,
                },
                price_product: {
                    required: true,
                    step: 2,
                },
            },
            messgaes: {
                name_product: {
                    required: "khong duoc de trong ",
                    minlength: "nhap nhieu hon 5 ky tu",
                },
                price_product: {
                    required: "khong duoc de trong ",
                    minlength: "nhap so duong",
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
                        categoryId: document.querySelector("#cate_product").value,
                    });
                    document.location.href = "http://localhost:3000/listproducts";
                }
                handleAddProduct();
            },
        });

        // formAdd.addEventListener("submit", async (e) => {
        //     e.preventDefault();
        //     const file = document.querySelector("#img_product").files[0];

        //     const formData = new FormData();
        //     formData.append("file", file);
        //     formData.append("upload_preset", CLOUDINARY_PRESET);
        //     const { data } = await axios.post(CLOUDINARY_API, formData, {
        //         headers: {
        //             "Content-Type": "application/form-data",
        //         },
        //     });
        //     add({
        //         name: document.querySelector("#name_product").value,
        //         img: data.url,
        //         price: document.querySelector("#price_product").value,
        //         desc: document.querySelector("#desc_product").value,
        //         categoryId: document.querySelector("#cate_product").value,
        //     });
        //     document.location.href = "http://localhost:3000/listproducts";
        // });
    },
};
export default addProduct;
