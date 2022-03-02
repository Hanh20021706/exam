/* eslint-disable linebreak-style */
import toastr from "toastr";
import { getAllCate, remove } from "../api/products";

/* eslint-disable linebreak-style */
const listProducts = {
    async render() {
        const { data } = await getAllCate();
        return /* html */`
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">img</th>
                    <th scope="col">price</th>
                    <th scope="col">desc</th>
                    <th scope="col">categories</th>
                </tr>
            </thead>
            <tbody>
                ${data.map((product) => `
                    <tr>
                   
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td> <img src="${product.img}" width="200px" alt=""></td>
                        <td>${product.price}</td>
                        <td>${product.desc}</td>
                        <td>${product.category.name}</td>
                        <td> <a href="/#/edit/product${product.id}" class="btn btn-warning">edit</a></td>
                        <td><button type="button" data-id= ${product.id} class="btn btn-danger btns">Danger</button></td>
                    </tr>
                    `).join("")}
            
                
            </tbody>
      </table>
      <a href="/#/add/product" class="btn btn-success">add product</a>
        `;
    },
    afterRender() {
        const buttons = document.querySelectorAll(".btns");
        buttons.forEach((btn) => {
            const { id } = btn.dataset;
            btn.addEventListener("click", () => {
                const confim = window.confirm("ban co chac chan xoa");
                if (confim) {
                    remove(id).then(() => {
                        toastr.success("ban da xoa thanh cong");
                    }).then(() => {
                        document.location.href = "http://localhost:3000/listproducts";
                    });
                }
            });
        });
    },
};
export default listProducts;
