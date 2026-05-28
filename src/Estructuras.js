class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

export class PilaHistorial {
    constructor() {
        this.tope = null;
        this.tamaño = 0;
    }

    apilar(producto) {
        const nuevoNodo = new Nodo(producto);
        if (!this.tope) {
            this.tope = nuevoNodo;
        } else {
            nuevoNodo.siguiente = this.tope;
            this.tope = nuevoNodo;
        }
        this.tamaño++;
    }

    desapilar() {
        if (!this.tope) return null;
        const nodoRemovido = this.tope;
        this.tope = this.tope.siguiente;
        this.tamaño--;
        return nodoRemovido.valor;
    }

    verTope() {
        return this.tope ? this.tope.valor : null;
    }

    estaVacia() {
        return this.tamaño === 0;
    }
}