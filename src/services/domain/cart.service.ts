import { StorageService } from "../storage.service";
import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    // cria ou limpa carrinho na local storage
    createOrClearCart(): Cart {
        let cart : Cart = {items: []};                  // carrinho vazio
        this.storage.setLocalCart(cart);
        return cart;
    }

    // obtem carrinho
    getCart(): Cart {
        let cart: Cart = this.storage.getLocalCart();
        if (cart == null) {                             // carrinho nao existia
            cart = this.createOrClearCart();            // cria cart
        }
        return cart;
    }

    // adicionar produto ao carrinho
    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();                      // verifica se produto ja existe
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1) {                            // produto nao existe ainda
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setLocalCart(cart);                // atualiza carrinho na localStorage
        return cart;
    }


}