/**
 * Firebase Realtime Database — çapraz cihaz skor tablosu
 *
 * 1. https://console.firebase.google.com → proje oluştur
 * 2. Realtime Database ekle (test modunda başlat, kuralları aşağıdaki gibi güncelle)
 * 3. Project settings → Web app → config değerlerini buraya kopyala
 * 4. Bu dosyayı firebase-config.js olarak kopyala
 *
 * Kurallar (Rules):
 * {
 *   "rules": {
 *     "leaderboard": {
 *       ".read": true,
 *       "$game": {
 *         "$user": {
 *           ".write": true,
 *           ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 99999999"
 *         }
 *       }
 *     },
 *     "activity": {
 *       ".read": true,
 *       "acelya": {
 *         "logins": { ".write": true },
 *         "pages": { ".write": true }
 *       }
 *     }
 *   }
 * }
 */
window.ACELYA_FIREBASE = {
  apiKey: "AIzaSyC1Xj-BF6Z8MVDGMFWu6hBQTakGIqB3JoY",
  authDomain: "acelya-nin-yeri.firebaseapp.com",
  databaseURL: "https://acelya-nin-yeri-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "acelya-nin-yeri",
  storageBucket: "acelya-nin-yeri.firebasestorage.app",
  messagingSenderId: "765708267720",
  appId: "1:765708267720:web:d4a46d8df68ab64fdb35fd",
  measurementId: "G-5TGFN7PZ4Z"
};
