import toastr from "toastr";
import { getAll, remove } from "./api/products";
import "toastr/build/toastr.min.css";

/* eslint-disable linebreak-style */
const listProducts = {
    async render() {
        const { data } = await getAll();
        return /* html */`
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">img</th>
                    <th scope="col">price</th>
                    <th scope="col">desc</th>
                </tr>
            </thead>
            <tbody>
            ${data.map((item) => `
                <tr>
                        
                     
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>   <img  width ="200px" src="${item.img}" alt=""></td>
                <td>${item.price}</td>
                <td>${item.desc}</td>
               
                <td>     <a href="/#/edit/product${item.id}" class="btn btn-warning">edit</a></td>
                <td><button type="button" data-id=${item.id} class="btn btn-danger btns">delete</button></td>
            </tr>
                `)}
                  
                   
            </tbody>
      </table>
      <a href="/#/add/product" class="btn btn-success">them san pham</a>
        `;
    },
    afterRender() {
        const buttons = document.querySelectorAll(".btns");
        buttons.forEach((btn) => {
            const { id } = btn.dataset;
            btn.addEventListener("click", () => {
                const confirm = window.confirm("ban co chac chan xoa");
                if (confirm) {
                    remove(id).then(() => {
                        toastr.success("ban da xoa thanh cong");
                    });
                }
            });
        });
    },
};
export default listProducts;
