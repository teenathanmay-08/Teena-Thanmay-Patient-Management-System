CREATE DATABASE IF NOT EXISTS patient_management_system;
USE patient_management_system;
CREATE TABLE IF NOT EXISTS patients (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(100) NOT NULL,
 phoneno VARCHAR(15) NOT NULL,
 gender ENUM('Male','Female','Other') NOT NULL,
 age INT NOT NULL,
 problem TEXT NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO patients(name,email,phoneno,gender,age,problem)
SELECT 'Rahul Kumar','rahul.demo@example.com','9876543210','Male',25,'Fever'
WHERE NOT EXISTS (SELECT 1 FROM patients WHERE email='rahul.demo@example.com');
