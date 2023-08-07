const firebaseConfig = {
    apiKey: "AIzaSyC0mNQEfcjRWqoapET7Q5YTxYKV7KC1vIw",
    authDomain: "lista-f5437.firebaseapp.com",
    projectId: "lista-f5437",
    storageBucket: "lista-f5437.appspot.com",
    messagingSenderId: "863407330412",
    appId: "1:863407330412:web:9e5b764dfc653280e0b449"
  };

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const lista = document.getElementById('lista');
const itemInput = document.getElementById('item');

// Agregar un producto a la lista de compras en Firestore
function addItem() {
  const itemText = itemInput.value.trim();

  if (itemText !== '') {
    db.collection('compras').add({
      producto: itemText
    });
  }
}

// Actualiza la lista de compras en tiempo real
db.collection('compras').onSnapshot(snapshot => {
  lista.innerHTML = ''; // Limpiar la lista antes de volver a mostrar los elementos

  snapshot.forEach(doc => {
    const item = doc.data().producto;
    const li = document.createElement('li');
    li.innerText = item;
    lista.appendChild(li);
  });
});
