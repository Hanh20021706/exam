import { getAllCate } from "./api/products";

/* eslint-disable linebreak-style */
const homePage = {
    async render() {
        const { data } = await getAllCate();
        return /* html */`
        <div class="row">
        ${data.map((item) => `
            <div class="col-md-4">
            <div class="card" style="width: 18rem;">
            <img src="${item.img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.category.name}</p>
              <p class="card-text">${item.price}</p>
              <p class="card-text">${item.desc}</p>
              
            </div>
          </div>
            </div>
            
            `).join("")}
               
        </div>
        `;
    },
};
export default homePage;
