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
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1) {  // produto nao existe ainda
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setLocalCart(cart);  // atualiza carrinho na localStorage
        return cart;
    }

    // remover produto do carrinho
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1) {  // encontrou produto
            cart.items.splice(position, 1);
        }
        this.storage.setLocalCart(cart);  // atualiza carrinho na localStorage
        return cart;
    }

    // incrementar qtde do produto no carrinho
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1) {  // encontrou produto
            cart.items[position].quantidade++;
        }
        this.storage.setLocalCart(cart);  // atualiza carrinho na localStorage
        return cart;
    }

    // decrementar qtde do produto no carrinho
    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1) {  // encontrou produto
            cart.items[position].quantidade--;
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setLocalCart(cart);  // atualiza carrinho na localStorage
        return cart;
    }

    // calcular valor total do carrinho
    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }

}