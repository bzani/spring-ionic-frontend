import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }
    
    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getLocalCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.localCart);
        if (str == null) {
            return null;
        }
        else {
            return JSON.parse(str);
        }
    }
    
    setLocalCart(obj : Cart) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localCart);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localCart, JSON.stringify(obj));
        }
    }
}