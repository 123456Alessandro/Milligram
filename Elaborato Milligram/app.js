// Logica JavaScript per la SPA Milligram CSS

// Componente per la vista Home
const Home = { 
    template: `
        <div>
            <h1>Milligram CSS SPA</h1>
            <p>Questa è una Single Page Application che approfondisce Milligram CSS.</p>
            <button @click="mostraDocumentazione" class="btn btn-info btn-lg mx-2">Mostra documentazione</button>
            <button @click="iniziaOra" class="btn btn-success btn-lg mx-2">Inizia ora</button>
            <button @click="contattaci" class="btn btn-warning btn-lg mx-2">Contattaci</button>
        </div>
    `,
    methods: {
        mostraDocumentazione() {
            window.open('https://milligram.io/', '_blank');
        },
        iniziaOra() {
            alert('Inizia ora con Milligram CSS');
        },
        contattaci() {
            alert('Contattaci per maggiori informazioni');
        }
    }
};

// Componente per la vista Approfondimenti
const Approfondimenti = { 
    template: `
        <div>
            <h1>Approfondimenti su Milligram CSS</h1>
            <p>Milligram CSS è una libreria leggera e minimalista per la creazione di interfacce utente.</p>
            <p>Caratteristiche principali:</p>
            <ul>
                <li>Basato su un sistema di griglia flessibile.</li>
                <li>Stile pulito e moderno.</li>
                <li>Facile da personalizzare.</li>
                <li>Contiene una serie di componenti predefiniti come pulsanti, form, tabelle, ecc.</li>
                <li>Progettato per essere mobile-first e responsive.</li>
            </ul>
            <p>Per ulteriori informazioni, visita il <a href="https://milligram.io/">sito ufficiale di Milligram CSS</a>.</p>
        </div>
    `
};

// Componente per la vista Dati JSON
const DatiJSON = { 
    data() {
        return {
            dati: null
        };
    },
    template: `
        <div>
            <h1>Dati JSON</h1>
            <p>Di seguito sono visualizzati dati JSON recuperati da un endpoint esterno.</p>
            <pre>{{ dati }}</pre>
        </div>
    `,
    mounted() {
        // Simulazione di caricamento dati JSON da un endpoint esterno
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(data => this.dati = data)
            .catch(error => console.error('Errore durante il caricamento dei dati JSON:', error));
    }
};

// Componente per la vista Gestione Dati Locali
const GestioneDatiLocali = { 
    data() {
        return {
            nuovoDato: '',
            datiLocali: JSON.parse(localStorage.getItem('datiLocali')) || []
        };
    },
    template: `
        <div>
            <h1>Gestione Dati Locali</h1>
            <input type="text" v-model="nuovoDato" placeholder="Inserisci un nuovo dato">
            <button @click="aggiungiDato">Aggiungi</button>
            <ul>
                <li v-for="(dato, index) in datiLocali" :key="index">
                    {{ dato }}
                    <button @click="modificaDato(index)">Modifica</button>
                    <button @click="eliminaDato(index)">Elimina</button>
                </li>
            </ul>
        </div>
    `,
    methods: {
        aggiungiDato() {
            if (this.nuovoDato.trim() !== '') {
                this.datiLocali.push(this.nuovoDato.trim());
                this.salvaDatiLocali();
                this.nuovoDato = '';
            }
        },
        modificaDato(index) {
            const nuovoValore = prompt('Modifica il valore:', this.datiLocali[index]);
            if (nuovoValore !== null) {
                this.datiLocali[index] = nuovoValore.trim();
                this.salvaDatiLocali();
            }
        },
        eliminaDato(index) {
            if (confirm('Sei sicuro di voler eliminare questo dato?')) {
                this.datiLocali.splice(index, 1);
                this.salvaDatiLocali();
            }
        },
        salvaDatiLocali() {
            localStorage.setItem('datiLocali', JSON.stringify(this.datiLocali));
            alert('Dati locali salvati con successo!');
        }
    }
};

// Definisci le rotte
const routes = [
    { path: '/', component: Home },
    { path: '/approfondimenti', component: Approfondimenti },
    { path: '/dati-json', component: DatiJSON },
    { path: '/gestione-dati-locali', component: GestioneDatiLocali }
];

// Crea il router
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Inizializza l'applicazione Vue
const app = Vue.createApp({});
app.use(router);
app.mount('#app');
