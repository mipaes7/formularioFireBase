const firebaseConfig = {
    apiKey: "AIzaSyBqdvju2oqSuul1FvukrqgcBszZjQF-640",
    authDomain: "demofirebase-bee01.firebaseapp.com",
    projectId: "demofirebase-bee01",
    storageBucket: "demofirebase-bee01.appspot.com",
    messagingSenderId: "393790115534",
    appId: "1:393790115534:web:14016324ce557897040a9f"
};

firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore

const form = document.getElementById('form');
const tarjetas = document.querySelector('.cards');
const showBtn = document.getElementById('show');
const removeUserBtn = document.getElementById('removeUser');
const deleteAllBtn = document.getElementById('clean');

//EVENTOS
form.addEventListener('submit', (ev) => {
    const nombre = form.inputNombre.value;
    const email = form.inputEmail.value;
    const mensaje = form.inputMensaje.value;
    const imagen = form.inputImagen.value;
    ev.preventDefault();
    createUser({
        nombre,
        email,
        mensaje,
        imagen
    });
    form.reset();
});

showBtn.addEventListener('click', ({ target }) => {
    readAll();
});

removeUserBtn.addEventListener('click', ({ target }) => {
    deleteUser();
});

deleteAllBtn.addEventListener('click', ({ target }) => {
    deleteAll();
});

//FUNCIONES
const createUser = (user) => {
    db.collection("users")
        .add(user)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            readAll();
        })
        .catch((error) => console.error("Error adding document: ", error));
};


const pintarCardInfo = (name, mail, msg, imgUrl, docId) => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');
    const nombre = document.createElement('p');
    const email = document.createElement('p');
    const mensaje = document.createElement('p');
    const imagen = document.createElement('img');
    let id = document.createElement('p');
    imagen.setAttribute('src', imgUrl);
    nombre.textContent = name;
    email.textContent = mail;
    mensaje.textContent = msg;
    id.innerHTML = docId;
    cardContainer.append(imagen, nombre, email, mensaje, id);
    tarjetas.append(cardContainer);
};

const readAll = () => {

    limpiarElemento(tarjetas);

    db.collection("users")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                pintarCardInfo(doc.data().nombre, doc.data().email, doc.data().msg, doc.data().imagen, doc.id)
            });

        })
        .catch(() => console.log('Error reading documents'));;
};

const deleteUser = () => {
    const id = prompt('Introduce el ID a borrar');
    db.collection('users').doc(id).delete().then(() => {
        alert(`Documento ${id} ha sido borrado`);
        limpiarElemento(tarjetas);
        readAll();
    })
        .catch(() => console.log('Error borrando documento'));
};

const deleteAll = () => {
    db.collection('users')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            doc.ref.delete();
        });
        alert(`La base de datos ha sido borrada`);
        limpiarElemento(tarjetas);
    })
    .catch(() => console.log('Error borrando documentos'));
};

const limpiarElemento = (elemento) => {
    elemento.innerHTML = '';
}