git init# TEENA THANMAY Patient Management System

Teena Thanmay Patient Management System

Educational multi-page application using HTML, CSS, JavaScript, Node.js, Express and MySQL.

## Setup
1. Run `database.sql` in MySQL Workbench.
2. Open this folder in terminal and run `npm install`.
3. Configure `db.js` with your MySQL host, username, password and database. Defaults: localhost, root, password `root`, database `patient_management_system`. Change this password if your MySQL root account uses a different password.
4. Run `npm start`.
5. Open http://localhost:3000.

## Pages
- Home dashboard with patient count
- Patient registration
- Patient management with search, edit and delete
- About/contact

## API
GET /api/stats
GET /api/patients?search=term
GET /api/patients/:id
POST /api/patients
PUT /api/patients/:id
DELETE /api/patients/:id

Photo links require internet access. This is a classroom demo, not a production medical records system. Do not enter real patient or sensitive medical data; production use needs authentication, access controls, encryption, audit logs, backups and privacy review.
