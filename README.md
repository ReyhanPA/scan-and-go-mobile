# **Tubes RekSTI K01 Kelompok 10**

## **A. Tentang Scan and Go**
Scan and Go adalah sebuah sistem untuk automasi sistem parkir yang ada di lingkungan Institut Teknologi Bandung. Sistem ini berbasis aplikasi mobile, website, dan juga IoT. Cara kerjanya, pengguna yang masuk ke gerbang parkir harus melakukan scanning QR Code yang telah didefinisikan saat pengguna mendaftarkan akun terhadap IoT agar dapat membuka gerbang parkirnya.

## **B. Anggota Terlibat**
| NIM | Nama | Role |
| --- | --- | --- |
| 10023601 | Sri Nurlia | IoT Engineer |
| 18221051 | Muhammad Shulhan | Web Developer |
| 18221127 | Arifuddin Achmad Subagja | Iot Engineer |
| 18221161 | Reyhan Putra Ananda | Mobile Developer |
| 18221167 | Ananda Abdul Hafizh | Iot Engineer |

## **C. Pedoman Penggunaan**

### **1. Penggunaan APK**
Download APK pada link berikut ini [Aplikasi Mobile Scan and Go](https://expo.dev/artifacts/eas/ekvBYoB9ubn6UHxgGWDEVN.apk)

### **2. Penggunaan di Lokal Komputer**
- Buat sebuah folder di lokal komputer
- Copy code berikut
  ```sh
  git clone https://github.com/ReyhanPA/scan-and-go-mobile.git
  ```
- Buka command prompt di lokal komputer, lalu pindah *directory* ke folder yang telah dibuat sebelumnya dengan mengetikkan
  ```sh
  cd <path folder yang dibuat sebelumnya>
  ```
- Setelah berada di *directory* folder yang telah dibuat, paste code pada poin 2 di command prompt
- Pindah *directory* ke folder *development* dengan mengetikkan
  ```sh
  cd scan-and-go-mobile
  ```
- *Install dependency* dengan mengetikkan
  ```sh
  npm install
  ```
- Buka android studio atau emulator lainnya
- Build **development mobile* dengan menjalankan code berikut di terminal
  ```sh
  npm run build:devclient:android
  ```
- Jalankan *development mobile* dengan mengetikkan code berikut di terminal
  ```sh
  npx expo start
  ```
- *Development mobile* siap dijalankan

### **3. Catatan Tambahan**
Ada beberapa prerequisites yang harus di-setup sebelum menjalankan program di lokal komputer seperti poin 2C di atas, di antaranya:

- Install Node.js versi terbaru
- Install npm
  ```sh
  npm install npm@latest -g
  ```
- Install android studio atau emulator lainnya

Jika tidak hanya ingin mencoba aplikasinya, cukup download apk nya pada link yang tertera pada poin 1C

## **D. Desain API**
#### **1. GET /users**
  - message  : Berhasil menampilkan users
  - request  : -
  - response : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
#### **2. GET /users/:uid**
  - message  : Berhasil menampilkan users by uid
  - request  : -
  - response : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
#### **3. POST /users**
  - message  : Berhasil menambahkan users
  - request  : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
  - response : uid, nama, nim, plat, role, saldo, qrcode, email, created_at, updated_at
#### **4. PUT /users/:uid**
  - message  : Berhasil mengupdate users by uid
  - request  : nama, nim, plat, saldo
  - response : nama, nim, plat, saldo