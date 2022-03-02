/* eslint-disable linebreak-style */
import { get, update } from "../api/products";

/* eslint-disable linebreak-style */
const editProduct = {
    async render(id) {
        const { data } = await get(id);
        return /* html */`
        <form id = "form_edit" method = "POST">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">name</label>
            <input type="text" class="form-control" id="name_product" name = "name_product" value ="${data.name}">
            
        </div>
        
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">img</label>
            <input type="file" class="form-control" id="img_product" name = "img_product">
            
        </div>
        
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">price</label>
            <input type="number" class="form-control" id="price_product" name = "price_product" value ="${data.price}">
            
        </div>
        
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">desc</label>
            <textarea class="form-control" id="desc_product"  rows="3">${data.desc}</textarea>
            
        </div>
        
       
        <button type="submit" class="btn btn-primary">Submit</button>
  </form>
        `;
    },
    afterRender(id) {
        const formEdit = document.querySelector("#form_edit");
        formEdit.addEventListener("submit", async (e) => {
            e.preventDefault();
            update({
                id,
                name: document.querySelector("#name_product").value,
                price: document.querySelector("#price_product").value,
                desc: document.querySelector("#desc_product").value,
                categoryId: 2,
            });
            document.location.href = "http://localhost:3000/listproducts";
        });
    },
};
export default editProduct;
