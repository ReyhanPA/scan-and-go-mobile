# **Tubes LaSTI K01 Kelompok 2**

## **A. Tentang TechNest**
**TechNest** merupakan sistem berbasis *website* yang menyediakan layanan untuk calon penghuni *dormitory* agar bisa melihat kamar yang tersedia beserta fasilitasnya dan melakukan pendaftaran langsung secara daring. Selain itu, **TechNest** menyediakan layanan untuk pemilik *Dormitory* untuk menambah, mengedit, dan menghapus kamar yang tersedia di dalam *dormitory*

## **B. Developer Terlibat**
| Nama | NIM |
| --- | ---- |
| Silvester Kresna W. P. P | 18221049 |
| Willy Frans Farel Sijabat | 18221087 |
| Pramaditya Fajri Migfar | 18221111 |
| Reyhan Putra Ananda | 18221161 |
| Nova Risti Rusmita | 10023256 |

## **C. Pedoman Penggunaan**

### **1. Penggunaan di Lokal Komputer**
- Buat sebuah folder di lokal komputer
- Copy code berikut `git clone https://github.com/fajrimgfr/K01_LaSTI_Kelompok-2.git`
- Buka command prompt di lokal komputer, lalu pindah *directory* ke folder yang telah dibuat sebelumnya dengan mengetikkan `cd {path folder yang dibuat sebelumnya}`
- Setelah berada di *directory* folder yang telah dibuat, paste code pada poin 2 di command prompt
- Pindah *directory* ke folder *development* dengan mengetikkan `cd K01_LaSTI_Kelompok-2` dan ketikkan lagi `cd view`
- *Install dependency* dengan mengetikkan `npm install`
- Jalankan *code* dengan mengetikkan `npm run dev`
- Buka browser pada `http://localhost:3000`

### **2. Catatan Tambahan**
Untuk penggunaan dan dokumentasi lengkap halaman-halaman yang bisa diakses pada *website* TechNest ini dapat dilihat pada dokumen yang dilampirkan secara bersamaan dengan pranala github ini

## **D. Desain API**
#### **1. GET /api/kamar**
  - message  : Berhasil menampilkan kamar
  - request  : -
  - response : noKamar, foto, harga, lantai, status, fasilitas, luas, posisi, idUser, namaUser
#### **2. GET /api/kamar/:id**
  - message  : Berhasil menampilkan kamar by id
  - request  : -
  - response : noKamar, foto, harga, lantai, status, fasilitas, luas, posisi, idUser, namaUser
#### **3. GET /api/user**
  - message  : Berhasil menampilkan user
  - request  : -
  - response : email, nama, phoneNumber, age, password, role
#### **4. GET /api/:email**
  - message  : Berhasil menampilkan user by email
  - request  : -
  - response : email, nama, phoneNumber, age, password, role
#### **5. PUT /api/kamar/:id**
  - message  : Berhasil mengupdate kamar by id
  - request  : noKamar, foto, harga, lantai, status, fasilitas, luas, posisi, idUser, namaUser
  - response : noKamar, foto, harga, lantai, status, fasilitas, luas, posisi, idUser, namaUser
#### **6. POST /api/kamar**
  - message  : Berhasil menambah kamar
  - request  : noKamar, foto, harga, lantai, status, fasilitas, luas, posisi, idUser, namaUser
  - response : noKamar, foto, harga, lantai, status, fasilitas, luas, posisi, idUser, namaUser
#### **7. POST /api/user**
  - message  : Berhasil menambah user
  - request  : email, nama, phoneNumber, age, password, role
  - response : email, nama, phoneNumber, age, password, role
#### **8. POST /api/:email**
  - message  : Berhasil menambah user by id
  - request  : email, nama, phoneNumber, age, password, role
  - response : email, nama, phoneNumber, age, password, role
#### **9. DELETE /api/kamar/:id**
  - message  : Berhasil menghapus kamar
  - request  : -
  - response : -