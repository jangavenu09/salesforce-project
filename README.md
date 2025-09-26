# PulsePro - Hospital Appointment & Patient Management System

This repository documents the full development lifecycle of **PulsePro**, a Salesforce application designed to efficiently manage patient enrollment, doctor assignments, appointment scheduling, and treatment tracking within a healthcare organization. The solution leverages core Salesforce Admin, Automation, and Developer capabilities to create an efficient operational platform.

## 🎯 Project Overview & Objectives

Healthcare facilities often struggle with inefficient manual processes, including patient registration, managing appointment overlaps, maintaining reliable health documentation, and a lack of real-time administrative analytics.

The PulsePro system was built to solve these critical challenges using Salesforce CRM.

### Key Objectives:
* Facilitate **digital enrollment** for individuals seeking care.
* Allow patients to **reserve consultations** aligned with physicians' open time slots.
* Empower doctors to efficiently **examine agendas and document procedure specifics**.
* Preserve an **exhaustive, consolidated archive** of each patient's health documentation.
* Furnish administrative leaders with **analytical interfaces and summaries** to supervise comprehensive operations.

---

## 🏗️ Technical Implementation Summary

### 1. Data Model & Relationships (Phase 3)
The application uses a hybrid data model incorporating customized standard objects and a key custom junction object:

* **Patients:** The standard **Contact** object is customized to serve as the Patient record. Key custom fields include **Patient ID** (Auto Number), **Age** (Number), **Gender** (Picklist), **Preferred Doctor** (Lookup to User), and **Medical History** (Long Text Area).
* **Treatments/Appointments:** The standard **Case** object is used as the **Treatment Record**. Key custom fields include **Treatment Notes**, **Medicines Prescribed**, **Doctor Assigned** (Lookup to User), and **Follow Up Date**. The standard **Event** object is used for appointments.
* **Junction Object:** A custom object named **DoctorPatient** was created to act as a **Junction Object**. This object links Patients (Contacts) with Doctors (Users).

### 2. Process Automation (Phase 4 & 5)

The system relies on modern Salesforce automation tools for efficiency:

* **Record-Triggered Flow (Admin):** The **Doctor Assignment Flow** is triggered when a Case (Treatment/Appointment) record is created or updated and a Doctor is assigned. This flow automatically sends an email notification to the assigned Doctor and updates the Case Status to **"In Progress"**.
* **Validation Rule (Admin):** A validation rule was created on the Patient Age field to ensure that no negative values can be entered.
* **Apex Class (Developer):** The `PatientService` class centralizes SOQL queries, providing a reusable method (`getAllPatients`) to fetch patient records from the Contact object.
* **Apex Trigger (Developer):** A **`CaseTrigger`** (Before Insert/Update on Case) automatically populates the Case Subject. This action ensures consistency and reduces manual entry for the subject field.
* **Testing:** A dedicated test class, `CaseTriggerTest`, was created to ensure the trigger functions correctly.

### 3. User Interface (Phase 6)

* **Custom Application:** A custom Lightning App named **PulsePro** was created.
* **Navigation:** Navigation tabs added include Contacts (Patients), Cases (Treatments), Doctor Patients, Calendar, Tasks, Reports, and Dashboards.
* **Record Page Customization:** The Contact Record Page was customized to display patient details (Patient ID, Medical History, Preferred Doctor). The Case Record Page was customized to display treatment fields (Treatment Notes, Medicines Prescribed, Doctor Assigned, Follow-Up Date).
* **Custom Home Page:** A custom Home Page was built using the Lightning App Builder, featuring components like **Recent Patients** and **Today's Tasks/Events** to provide a quick overview.

### 4. Reporting & Security (Phase 9)

* **Reporting:** A **Summary Report** was created showing patients along with their associated cases. The report is grouped by **Preferred Doctor**.
* **Dashboards:** A standard dashboard, **"Hospital Appointments Dashboard,"** was created to display patient distribution by preferred doctor, using the Summary Report data.
* **Sharing Settings:** Organization-Wide Defaults (OWD) were configured to enforce role-based access.
* **Field-Level Security (FLS):** FLS was used to restrict access to individual fields. Sensitive fields like **Patient ID** and **Medical History** are visible **only to Doctors and Managers**.

🛠️ Data Management & Integration Status

Data Management: The Data Import Wizard is the primary tool for patient data import. A **Duplicate Rule** named `Prevent_Duplicate_Patients` was created on the Contact object to prevent the creation of duplicate patient records based on the **Patient ID** field.
Integration Status (Phase 7): No external integrations were implemented, as the project operates solely within the Salesforce environment. Features like Named Credentials, External Services, Platform Events, and Salesforce Connect were explicitly **omitted**.
Deployment Status: Deployment tools like Change Sets, ANT Migration Tool, and IDEs (VS Code/SFDX) were intentionally **not used**, as all development was performed in a single Developer Edition org.

---
📄 Handoff Documentation

Comprehensive documentation covering all project phases (1 to 10), including data structure, automation configuration, UI setup, and security model, has been prepared.
