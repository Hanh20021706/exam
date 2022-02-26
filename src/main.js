import Navigo from "navigo";
import listProduct from ".";
import addProduct from "./add";
import editProduct from "./edit";

const router = new Navigo("/", { linksSelector: "a", hash: true });

const print = async (component, id) => {
    document.querySelector("#app").innerHTML = await component.render(id);
    if (component.afterRender) await component.afterRender(id);
};

router.on({
    "/": () => {
        print(listProduct);
    },
    "/add/product": () => {
        print(addProduct);
    },
    "/edit/product:id": ({ data }) => {
        print(editProduct, data.id);
    },
});

router.resolve();
