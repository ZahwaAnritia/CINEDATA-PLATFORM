# CineData API - The Open Movie Metadata Hub

**CineData API** adalah platform Open API (SaaS Grade) yang menyediakan akses metadata film premium dengan spesialisasi pada genre **Dark Action, Thriller, Crime, dan Mystery**. Dibangun menggunakan arsitektur 3-Tier yang modern dan aman.

## Fitur Utama
- **Unified Red Dashboard**: Tema visual konsisten antara Admin dan Developer.
- **Admin Hub**: Manajemen katalog film (CRUD) lengkap dengan visual poster dan detail view.
- **Developer Console**: Manajemen multi-API Key, statistik penggunaan, dan analitik latensi.
- **Interactive Playground**: Uji coba endpoint API secara real-time langsung dari browser.
- **Telemetry System**: Pencatatan otomatis setiap aktivitas API (Logging) ke database.
- **Security**: Proteksi JWT untuk dashboard dan x-api-key untuk akses data publik.

## Tech Stack

### Backend
- **Node.js (Runtime v22)**  
  Runtime JavaScript untuk menjalankan server-side application dengan performa tinggi.
- **Express.js**  
  Web framework ringan dan fleksibel untuk membangun RESTful API.

### Database
- **MySQL 8.0**  
  Database relasional untuk penyimpanan data pengguna, metadata film, API key, dan telemetry.

### Frontend
- **HTML5**  
  Semantic markup untuk struktur halaman yang rapi dan mudah dipelihara.
- **Tailwind CSS**  
  Utility-first CSS framework untuk membangun UI yang responsif, modern, dan konsisten.
- **JavaScript (ES6+)**  
  Logika client-side, manipulasi DOM, dan komunikasi API menggunakan Fetch API.
- **SweetAlert2**  
  Library pop-up dan alert interaktif untuk meningkatkan user experience.
- **FontAwesome 6**  
  Library ikon profesional untuk memperkuat visual antarmuka.

### Authentication & Security
- **JWT (JSON Web Token)**  
  Digunakan untuk menjaga keamanan sesi login pada dashboard Admin dan Developer.
- **API Key System**  
  Mekanisme otorisasi untuk mengontrol akses data publik oleh aplikasi pihak ketiga.

## Screenshots

### Landing Page
![Landing Page](./sscinedata/home1.png)
![Landing Page](./sscinedata/home2.png)
![Landing Page](./sscinedata/doc.png)
![Landing Page](./sscinedata/doc2.png)
![Landing Page](./sscinedata/doc3.png)
![Landing Page](./sscinedata/doc4.png)

### Admin Hub (Management)
# ![Admin Hub](./sscinedata/loginadmin.png)
# ![Admin Hub](./sscinedata/logoutadmin.png)
# ![Admin Hub](./sscinedata/cataloghubadmin1%20(2).png)
# ![Admin Hub](./sscinedata/addmovieadmin1.png)
# ![Admin Hub](./sscinedata/deleteadmin1.png)
# ![Admin Hub](./sscinedata/detailadmin1.png)
# ![Admin Hub](./sscinedata/updateadmin1.png)
# ![Admin Hub](./sscinedata/globallogsadmin1.png)
# ![Admin Hub](./sscinedata/devmanageadmin1.png)


### Developer Console & Playground
# ![Dev Console](./sscinedata/regisdev.png)
# ![Dev Console](./sscinedata/logindev.png)
# ![Dev Console](./sscinedata/logoutdev.png)
# ![Dev Console](./sscinedata/dev1.png)
# ![Dev Console](./sscinedata/laygrounddev2.png)
# ![Dev Console](./sscinedata/schemadev3.png)
# ![Dev Console](./sscinedata/livecatalogdev4.png)
# ![Dev Console](./sscinedata/livecatalogdev5.png)
# ![Dev Console](./sscinedata/settingdev.png)
