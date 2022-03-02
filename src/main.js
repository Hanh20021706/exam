import Navigo from "navigo";
import listProducts from "./admin";
import addProduct from "./admin/add";
import editProduct from "./admin/edit";
import homePage from "./home";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (content, id) => {
    document.querySelector("#app").innerHTML = await content.render(id);
    if (content.afterRender) await content.afterRender(id);
};
router.on({
    "/": () => {
        print(homePage);
    },
    "/listproducts": () => {
        print(listProducts);
    },
    "/add/product": () => {
        print(addProduct);
    },
    "/edit/product:id": ({ data }) => {
        print(editProduct, data.id);
    },
});

router.resolve();
